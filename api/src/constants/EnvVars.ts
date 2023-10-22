/**
 * Environments variables declared here.
 */
import path from "path";
/* eslint-disable node/no-process-env */

export default {
  NodeEnv: (process.env.NODE_ENV ?? ''),
  Host: (process.env.HOST ?? 'localhost'),
  Port: (process.env.PORT ?? 0),
  RootUrl: process.env.ROOT_URL,
  CookieProps: {
    Key: 'ExpressGeneratorTs',
    Secret: (process.env.COOKIE_SECRET ?? ''),
    // Casing to match express cookie options
    Options: {
      httpOnly: true,
      signed: true,
      path: (process.env.COOKIE_PATH ?? ''),
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: (process.env.COOKIE_DOMAIN ?? ''),
      secure: (process.env.SECURE_COOKIE === 'true'),
    },
  },
  Jwt: {
    Secret: (process.env.JWT_SECRET ??  ''),
    Exp: (process.env.COOKIE_EXP ?? ''), // exp at the same time as the cookie
  },
  PolygonId: {
    rhsUrl: process.env.RHS_URL,
    ipfsUrl: process.env.IPFS_URL,
    circuitsPath: path.join(__dirname, '../..', process.env.CIRCUITS_PATH),
    Schema: {
      url: process.env.PURCHASE_SCHEMA_URL,
      type: process.env.PURCHASE_SCHEMA_TYPE,
    },
    Issuer: {
      url: process.env.POLYGONID_ISSUER_URL,
      auth: process.env.POLYGONID_ISSUER_AUTH,
    },
    Chain: {
      Polygon: process.env.POLYGON_RPC_URL && {
        rpcUrl: process.env.POLYGON_RPC_URL,
        contract: process.env.POLYGON_CONTRACT_ADDRESS,
      },
      ZkEvm: process.env.ZKEVM_RPC_URL && {
        rpcUrl: process.env.ZKEVM_RPC_URL,
        contract: process.env.ZKEVM_CONTRACT_ADDRESS,
      },
      Scroll: process.env.SCROLL_RPC_URL && {
        rpcUrl: process.env.SCROLL_RPC_URL,
        contract: process.env.SCROLL_CONTRACT_ADDRESS,
      },
      Mantle: process.env.MANTLE_RPC_URL && {
        rpcUrl: process.env.MANTLE_RPC_URL,
        contract: process.env.MANTLE_CONTRACT_ADDRESS,
      }
    },
  },
} as const;
