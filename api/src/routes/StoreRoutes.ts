import { StatusCodes } from 'http-status-codes';
import { IReq, IRes } from './types/express/misc';

async function getAllPromotions(req: IReq, res: IRes) {
  console.log(req.params);
  const storeData = { store: 'pepe' }
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
  getAllPromotions
} as const;
