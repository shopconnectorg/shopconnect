import { StatusCodes } from 'http-status-codes';
import { IReq, IRes } from '../routes/types/express/requests';

async function getAllPromotions(req: IReq, res: IRes) {
  const response = await fetch(
    `${process.env.SHOPCONNECT_API_URL}/stores/asd/promotions/?did=test`
  );

  const promotions = await response.json();

  return res.status(StatusCodes.OK).json(promotions);
};

async function applyPromotion(req: IReq, res: IRes) {
  console.log(req);
};

export default {
  getAllPromotions,
  applyPromotion
} as const;
