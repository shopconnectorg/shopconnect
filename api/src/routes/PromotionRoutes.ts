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
import EnvVars from '../constants/EnvVars';
import { IReq, IRes } from './types/express/requests';
import promotions from '../data/promotions.json';

async function getAllPromotions(req: IReq, res: IRes) {
  return res.status(StatusCodes.OK).json(promotions);
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

async function verifyProof(req: IReq, res: IRes) {
  // const { Chain } = EnvVars.PolygonId;
  // const resolvers: resolver.Resolvers = {
  //   ['polygon:mumbai']: new resolver.EthStateResolver(Chain.Polygon.rpcUrl, Chain.Polygon.contract),
  //   ['zkevm:test']: new resolver.EthStateResolver(Chain.ZkEvm.rpcUrl, Chain.ZkEvm.contract),
  //   ['scroll:sepolia']: new resolver.EthStateResolver(Chain.Scroll.rpcUrl, Chain.Scroll.contract),
  //   ['mantle:test']: new resolver.EthStateResolver(Chain.Mantle.rpcUrl, Chain.Mantle.contract),
  // };
  // const verifier = await auth.Verifier.newVerifier({
  //   stateResolver: resolvers,
  //   circuitsDir: EnvVars.PolygonId.circuitsPath,
  //   ipfsGatewayURL: EnvVars.PolygonId.ipfsUrl,
  // });
  // //TODO: Get this from request body
  // // const token = 'eyJhbGciOiJncm90aDE2IiwiY2lyY3VpdElkIjoiYXV0aFYyIiwiY3JpdCI6WyJjaXJjdWl0SWQiXSwidHlwIjoiYXBwbGljYXRpb24vaWRlbjMtemtwLWpzb24ifQ.eyJpZCI6Ijk0ZGZmYzc5LWYyMjQtNDUwNi1iNzk3LWNiZmMzODNlMzJjNyIsInR5cCI6ImFwcGxpY2F0aW9uL2lkZW4zLXprcC1qc29uIiwidHlwZSI6Imh0dHBzOi8vaWRlbjMtY29tbXVuaWNhdGlvbi5pby9hdXRob3JpemF0aW9uLzEuMC9yZXNwb25zZSIsInRoaWQiOiI3NDVhMzIwZi1hN2EyLTQ5NTItYWEyNy1iNjRiZTg4MDBkNDEiLCJib2R5Ijp7InNjb3BlIjpbXX0sImZyb20iOiJkaWQ6cG9seWdvbmlkOnBvbHlnb246bXVtYmFpOjJxTVpMdjZad0JGb3dtdFNMRmt1Z3hra2Z4VUF6cThTNnQxS3BqRFVYTiIsInRvIjoiZGlkOnBvbHlnb25pZDpwb2x5Z29uOm11bWJhaToycUxoTkxWbW9RUzdwUXRwTWVLSERxa1RjRU5CWlVqMW5rWmlSTlBHZ1YifQ.eyJwcm9vZiI6eyJwaV9hIjpbIjQzMzE4NDk1MjY2MjY1MDc4MTgzNzA3MjAxNzMxOTYxODQ4MTk2ODEyNDQzNTU3MDAwNjIzMTU1MjEzMTIwNjI3NjYxODk1MzM3OTAiLCI0MjkwNDYxOTA5MTMzMDAzMzExMTgyMTE2NjE5NjE5NjY4NDgzNzQzMzE0Nzg0NjA0NTEyMTEzMDkzNzM4MTAwMzIxMTkyMDg0NjQzIiwiMSJdLCJwaV9iIjpbWyI5NDAyMDY4MzY1NDE4Mzc3Mjg1MTYwODMzNDI5MzA2NzY4ODg1MTY3MzMxODA2NzAyMDkzMzI3MzE4NjAwOTM3NjE3OTI0ODA2Mzk0IiwiNTA4MjMxOTk1NDk2MjMyMzI2Mjg1NDA4ODM4MTgzOTgzNzc4NjY0MjEyODIyMjY5NzAyODI1ODU0NDc2NDk3NjMzNDg1ODI5Mzk4MCJdLFsiMjA0NjU1NTUzNjQ2ODc4MTY3NjEyNzc3MDY1NzgwMTE4MDMwNzcxNzc1NjgyMzk1NDM0NTI0MDUxMjUyMjE0ODg0ODQ4NzczMDEyMjEiLCIxNjk3OTA1NzcyNDM3MjA3NzQ0MzkyMzc1MjUzNzk0NTMxNzM1MDY0MzUwNTE0OTAxMjMxMTYyNjU2NDU5NjE0Njk0NDY2MjM2MTkzMCJdLFsiMSIsIjAiXV0sInBpX2MiOlsiNTYzMzgzODY1NjQ4ODcyMjEyMTk1ODg4MjIyMjMzNzMyOTg2NzI0NDExMTI3MjkxMjU0MTcxODkwMTMzNDMwNjU0Nzk5MzMyMjQxNCIsIjE2NjM0MTI5MTU4NTYyMzQ0MTI3MzI0NjU2ODkzMzQ4Nzg5OTcyOTU2OTU3MTUwMzg4MzY4NzQ5MzA2ODA4NDc1ODA4ODYxMjQ3NzI1IiwiMSJdLCJwcm90b2NvbCI6Imdyb3RoMTYiLCJjdXJ2ZSI6ImJuMTI4In0sInB1Yl9zaWduYWxzIjpbIjIyOTgzMTM2MzkyOTkzNTI5Njk0NDY3MjkxODIwNjcxMjk3NjkyMDUzMzI0MTQyODE4MTMwNTk0NjEwNDM1ODA2MjEyOTE5ODEwIiwiMjAwODg3MzE3NTY2NjYwMDcyNzk3NTA1MzY2MjA5NjYxOTg1NzAxODM5MDY3NjE2NTA5MTkxNjU2OTUyNTk1NjA3MjYyNzAwNTc3OSIsIjIxMTY0NzEzMjY4NDEzNzQ2NTA5ODM0MzE0NjQ4ODI0MzM0NTI5NjY5ODQzMjQ3NDg4NDE5NDQwNTA2MTEzNzAwOTk2MzYxMTE1OTc3Il19';
  // // //TODO: Get this from request body
  // // const { issuer } = await initIssuerOnce();
  // const authRequest = auth.createAuthorizationRequest(
  //   'Sample reason',
  //   verifierDID,
  //   //FIXME: This is not actually needed, but would be better to provide real API endpoint URL
  //   'https://example.com',
  // );
  // //TODO: Make up this
  // authRequest.id = 'xxx';
  // //TODO: Make up this
  // authRequest.thid = 'xxx';
  // authRequest.body.scope = [{
  //   circuitId: "credentialAtomicQuerySigV2",
  //   //FIXME:
  //   id: 1,
  //   query: {
  //     allowedIssuers: ["*"],
  //     context: "ipfs://QmVg3yP7pKe8n3kiCneGN4x2GFkJHoRjvo25uwUUhAsJvq",
  //     credentialSubject: {
  //       "item.kind": {
  //         $eq: "coffee"
  //       }
  //     },
  //     skipClaimRevocationCheck: true,
  //     type: "ShopPurchase",
  //   },
  // }];
  // // Now, the magic begins 🪄
  // const result = await verifier.fullVerify(token, authRequest, {
  //   acceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minutes
  // });
  // //TODO: Maybe return some meaningful result?
  // return res.status(StatusCodes.OK).json({
  //   message: "OK",
  // });
};

export default {
  getAllPromotions,
  issueCredential,
  verifyProof
} as const;
