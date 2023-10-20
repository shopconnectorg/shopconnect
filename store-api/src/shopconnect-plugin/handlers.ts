import { StatusCodes } from 'http-status-codes';
import { IReq, IRes } from '../routes/types/express/requests';

async function getAllPromotions(req: IReq, res: IRes) {
  const response = await fetch(
    'http://localhost:8000/stores/asd/promotions/'
  );

  const promotions = await response.json();

  return res.status(StatusCodes.OK).json(promotions);
};

async function applyPromotion(req: IReq, res: IRes) {
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
  applyPromotion
} as const;
