import { StatusCodes } from 'http-status-codes';
import { auth, resolver } from "@iden3/js-iden3-auth";
import {
  EthStateStorage,
  CredentialRequest,
  CredentialStatusType,
  JSONObject,
  AuthorizationRequestMessage,
  core
} from '@0xpolygonid/js-sdk';
import { v4 as uuid } from 'uuid';
import EnvVars from '../constants/EnvVars';
import { IReq, IRes } from './types/express/requests';
import promotions from '../data/promotions.json';

async function getAllPromotions(req: IReq, res: IRes) {
  const { storeId } = req.params;
  // const { did } = req.query;
  return res.status(StatusCodes.OK).json(promotions.map(({ verificationQuery, ...promotion }, index) => {
    const id = uuid();
    const authRequest = auth.createAuthorizationRequest(
      promotion.title,
      "", // did as string,
      `${EnvVars.RootUrl}/stores/${storeId}/${promotion.id}/verify`,
    );
    authRequest.id = id;
    authRequest.thid = id;
    authRequest.body.scope = [{
      circuitId: "credentialAtomicQuerySigV2",
      id: Date.now() - index,
      query: {
        allowedIssuers: ["*"],
        context: EnvVars.PolygonId.Schema.contextUrl,
        credentialSubject: verificationQuery,
      },
    }];
    return { ...promotion, authRequest };
  }));
};

async function issueCredential(req: IReq<JSONObject>, res: IRes) {
  const { userDID, purchase } = req.body;
  const requestBody = {
    credentialSchema: EnvVars.PolygonId.Schema.url,
    type: EnvVars.PolygonId.Schema.type,
    credentialSubject: {
      id: userDID,
      ...(purchase as Object),
    },
    revocationOpts: {
      type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
      id: EnvVars.PolygonId.rhsUrl,
    },
    signatureProof: true,
    mtProof: false,
  };
  const createCredentialResponse = await fetch(`${EnvVars.PolygonId.Issuer.url}/v1/credentials`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Authorization': EnvVars.PolygonId.Issuer.auth
    },
  });
  if (createCredentialResponse.status >= 200 && createCredentialResponse.status < 300) {
    const { id: credentialId } = await createCredentialResponse.json();
    const getCredentialResponse = await fetch(`${EnvVars.PolygonId.Issuer.url}/v1/credentials/${credentialId}/qrcode`, {
      headers: {
        'Authorization': EnvVars.PolygonId.Issuer.auth
      },
    });
    if (getCredentialResponse.status >= 200 && getCredentialResponse.status < 300) {
      const credentialData = await getCredentialResponse.json();
      return res.status(StatusCodes.OK).json(credentialData);
    } else {
      const { message } = await getCredentialResponse.json();
      res.status(getCredentialResponse.status).json({ message });
    }
  } else {
    const { message } = await createCredentialResponse.json();
    res.status(createCredentialResponse.status).json({ message });
  }
}

async function verifyProof(req: IReq<JSONObject>, res: IRes) {
  const { Chain } = EnvVars.PolygonId;
  const resolvers: resolver.Resolvers = {
    ['polygon:mumbai']: new resolver.EthStateResolver(Chain.Polygon.rpcUrl, Chain.Polygon.contract),
    ['zkevm:test']: new resolver.EthStateResolver(Chain.ZkEvm.rpcUrl, Chain.ZkEvm.contract),
    ['scroll:sepolia']: new resolver.EthStateResolver(Chain.Scroll.rpcUrl, Chain.Scroll.contract),
    ['mantle:test']: new resolver.EthStateResolver(Chain.Mantle.rpcUrl, Chain.Mantle.contract),
  };
  const verifier = await auth.Verifier.newVerifier({
    stateResolver: resolvers,
    circuitsDir: EnvVars.PolygonId.circuitsPath,
    ipfsGatewayURL: EnvVars.PolygonId.ipfsUrl,
  });
  //TODO: Get this from request body
  const { authRequest, authResponse } = req.body;
  ;
  // Now, the magic begins 🪄
  // @ts-ignore
  const result = await verifier.fullVerify(authResponse.token, authRequest, {
    acceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minutes
  });
  console.log(result);
  //TODO: Maybe return some meaningful result?
  return res.status(StatusCodes.OK).json({
    message: "OK",
  });
};

export default {
  getAllPromotions,
  issueCredential,
  verifyProof
} as const;
