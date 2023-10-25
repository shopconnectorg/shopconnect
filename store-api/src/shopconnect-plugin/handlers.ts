import { StatusCodes } from 'http-status-codes';
import { IReq, IRes } from '../routes/types/express/requests';

async function getAllPromotions(req: IReq, res: IRes) {
  const { did } = req.query;

  const response = await fetch(
    `${process.env.SHOPCONNECT_API_URL}/stores/asd/promotions?did={did}`
  );

  const promotions = await response.json();

  return res.status(StatusCodes.OK).json(promotions);
};

async function applyPromotion(req: IReq, res: IRes) {
  console.log(req);
};

async function confirmPurchase(req: IReq, res: IRes) {
  const { did } = req.query;
  const response = await fetch(
    `${process.env.SHOPCONNECT_API_URL}/stores/asd/issue?did=${did}`, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const promotions = await response.json();
  return res.status(response.status).json(promotions);
}

export default {
  getAllPromotions,
  applyPromotion,
  confirmPurchase,
} as const;
