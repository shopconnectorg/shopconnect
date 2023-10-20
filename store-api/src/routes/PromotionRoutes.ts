import { StatusCodes } from 'http-status-codes';
import { IReq, IRes } from './types/express/requests';

async function getAllPromotions(req: IReq, res: IRes) {
  return res.status(StatusCodes.OK).json([
    {
      name: 'promotion1'
    },
    {
      name: 'promotion2'
    }
  ]);
};

async function verifyProof(req: IReq, res: IRes) {
  return res.status(StatusCodes.OK).json([
    {
      name: 'promotion1'
    },
    {
      name: 'promotion2'
    }
  ]);
};

export default {
  getAllPromotions,
  verifyProof
} as const;
