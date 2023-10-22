import once from 'lodash/once';
import { proving } from "@iden3/js-jwz";
import { auth, resolver } from "@iden3/js-iden3-auth";
import {
  BjjProvider,
  CredentialStorage,
  CredentialWallet,
  defaultEthConnectionConfig,
  EthStateStorage,
  ICredentialWallet,
  IDataStorage,
  Identity,
  IdentityStorage,
  IdentityWallet,
  IIdentityWallet,
  InMemoryDataSource,
  InMemoryMerkleTreeStorage,
  InMemoryPrivateKeyStore,
  KMS,
  KmsKeyType,
  Profile,
  W3CCredential,
  EthConnectionConfig,
  CircuitData,
  IStateStorage,
  ProofService,
  ICircuitStorage,
  CredentialStatusType,
  CredentialStatusResolverRegistry,
  IssuerResolver,
  RHSResolver,
  OnChainResolver,
  AuthDataPrepareFunc,
  StateVerificationFunc,
  DataPrepareHandlerFunc,
  VerificationHandlerFunc,
  IPackageManager,
  VerificationParams,
  ProvingParams,
  ZKPPacker,
  PlainPacker,
  PackageManager,
  AgentResolver,
  FSCircuitStorage,
  core,
} from "@0xpolygonid/js-sdk";
import EnvVars from '../constants/EnvVars';
// import { DataStorage, KeysStore, MerkleTreeStorage } from './storage';
import './hack';

Object.assign(defaultEthConnectionConfig, {
  contractAddress: EnvVars.PolygonId.polygon.contract,
  url: EnvVars.PolygonId.polygon.rpcUrl,
});

export async function createIdentity(identityWallet: IIdentityWallet, seed?) {
  const { did, credential } = await identityWallet.createIdentity({
    method: core.DidMethod.PolygonId,
    blockchain: core.Blockchain.Polygon,
    networkId: core.NetworkId.Mumbai,
    revocationOpts: {
      type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
      id: EnvVars.PolygonId.rhsUrl,
    },
    seed,
  });
  return {
    did,
    credential,
  };
}

export function initDataStorage(): IDataStorage {
  const dataStorage = {
    credential: new CredentialStorage(new InMemoryDataSource<W3CCredential>()),
    identity: new IdentityStorage(
      new InMemoryDataSource<Identity>(),
      new InMemoryDataSource<Profile>()
    ),
    mt: new InMemoryMerkleTreeStorage(40),
    states: new EthStateStorage(defaultEthConnectionConfig),
  };
  return dataStorage;
}

export async function initIdentityWallet(
  dataStorage: IDataStorage,
  credentialWallet: ICredentialWallet
): Promise<IIdentityWallet> {
  const memoryKeyStore = new InMemoryPrivateKeyStore();
  const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore);
  const kms = new KMS();
  kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);
  return new IdentityWallet(kms, dataStorage, credentialWallet);
}

export async function initDataStorageAndWallets() {
  const dataStorage = initDataStorage();
  const credentialWallet = await initCredentialWallet(dataStorage);
  const identityWallet = await initIdentityWallet(
    dataStorage,
    credentialWallet
  );
  return {
    dataStorage,
    credentialWallet,
    identityWallet,
  };
}

export async function initCredentialWallet(
  dataStorage: IDataStorage
): Promise<CredentialWallet> {
  const resolvers = new CredentialStatusResolverRegistry();
  resolvers.register(
    CredentialStatusType.SparseMerkleTreeProof,
    new IssuerResolver()
  );
  resolvers.register(
    CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
    new RHSResolver(dataStorage.states)
  );
  resolvers.register(
    CredentialStatusType.Iden3OnchainSparseMerkleTreeProof2023,
    new OnChainResolver([defaultEthConnectionConfig])
  );
  resolvers.register(
    CredentialStatusType.Iden3commRevocationStatusV1,
    new AgentResolver()
  );
  return new CredentialWallet(dataStorage, resolvers);
}

export async function initCircuitStorage(): Promise<ICircuitStorage> {
  return new FSCircuitStorage({ dirname: EnvVars.PolygonId.circuitsPath });
}
export async function initProofService(
  identityWallet: IIdentityWallet,
  credentialWallet: ICredentialWallet,
  stateStorage: IStateStorage,
  circuitStorage: ICircuitStorage
): Promise<ProofService> {
  return new ProofService(
    identityWallet,
    credentialWallet,
    circuitStorage,
    stateStorage,
    { ipfsGatewayURL: EnvVars.PolygonId.ipfsUrl }
  );
}

export async function initPackageManager(
  circuitData: CircuitData,
  prepareFn: AuthDataPrepareFunc,
  stateVerificationFn: StateVerificationFunc
): Promise<IPackageManager> {
  const authInputsHandler = new DataPrepareHandlerFunc(prepareFn);
  const verificationFn = new VerificationHandlerFunc(stateVerificationFn);
  const mapKey =
    proving.provingMethodGroth16AuthV2Instance.methodAlg.toString();
  const verificationParamMap: Map<string, VerificationParams> = new Map([
    [
      mapKey,
      {
        key: circuitData.verificationKey!,
        verificationFn,
      },
    ],
  ]);
  const provingParamMap: Map<string, ProvingParams> = new Map();
  provingParamMap.set(mapKey, {
    dataPreparer: authInputsHandler,
    provingKey: circuitData.provingKey!,
    wasm: circuitData.wasm!,
  });
  const mgr: IPackageManager = new PackageManager();
  const packer = new ZKPPacker(provingParamMap, verificationParamMap);
  const plainPacker = new PlainPacker();
  mgr.registerPackers([packer, plainPacker]);
  return mgr;
}

export async function initIssuer() {
  const { dataStorage, credentialWallet, identityWallet } =
  await initDataStorageAndWallets();
  const circuitStorage = await initCircuitStorage();
  const proofService = await initProofService(
    identityWallet,
    credentialWallet,
    dataStorage.states,
    circuitStorage
    );
  const issuer = await createIdentity(identityWallet);
  return { dataStorage, credentialWallet, identityWallet, circuitStorage, proofService, issuer };
}

export const initIssuerOnce = once(async function() {
  const { dataStorage, credentialWallet, identityWallet, proofService, issuer } = await initIssuer();
  return { dataStorage, credentialWallet,identityWallet, proofService, issuer };
});

export async function initVerifier() {
  const resolvers: resolver.Resolvers = {
    ['polygon:mumbai']: new resolver.EthStateResolver(EnvVars.PolygonId.polygon.rpcUrl, EnvVars.PolygonId.polygon.contract),
    ['zkevm:test']: new resolver.EthStateResolver(EnvVars.PolygonId.zkEvm.rpcUrl, EnvVars.PolygonId.zkEvm.contract),
    ['scroll:sepolia']: new resolver.EthStateResolver(EnvVars.PolygonId.scroll.rpcUrl, EnvVars.PolygonId.scroll.contract),
    ['mantle:test']: new resolver.EthStateResolver(EnvVars.PolygonId.mantle.rpcUrl, EnvVars.PolygonId.mantle.contract),
  };
  return auth.Verifier.newVerifier({
    stateResolver: resolvers,
    circuitsDir: EnvVars.PolygonId.circuitsPath,
    ipfsGatewayURL: EnvVars.PolygonId.ipfsUrl,
  });
}