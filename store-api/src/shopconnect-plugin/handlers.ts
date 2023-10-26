import { StatusCodes } from 'http-status-codes';
import { IReq, IRes } from '../routes/types/express/requests';

async function getAllPromotions(req: IReq, res: IRes) {
  const { did } = req.query;

  const response = await fetch(
    `${process.env.SHOPCONNECT_API_URL}/stores/${process.env.SHOPCONNECT_STORE_ID}/promotions?did=${did}`
  );

  const promotions = await response.json();

  return res.status(StatusCodes.OK).json(promotions);
};

async function applyPromotion(req: IReq, res: IRes) {
  const { promotionId } = req.params;
  const response = await fetch(
    `${process.env.SHOPCONNECT_API_URL}/stores/asd/${promotionId}/verify`, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const promotions = await response.json();
  return res.status(response.status).json(promotions);
};

async function confirmPurchase(req: IReq, res: IRes) {
  const { did } = req.query;
  const response = await fetch(
    `${process.env.SHOPCONNECT_API_URL}/stores/${process.env.SHOPCONNECT_STORE_ID}/issue?did=${did}`, {
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
