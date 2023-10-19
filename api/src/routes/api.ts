import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import PromotionRoutes from './PromotionRoutes';


const apiRouter = Router(),
  validate = jetValidator();

const storeRouter = Router();

  /**
   * @swagger
   * definitions:
   *   Promotion:
   *     properties:
   *       type:
   *         type: string
   *       title:
   *         type: string
   *       description:
   *         type: string
   */

/**
 * @swagger
 * /v1/stores/{storeId}/promotions/:
 *   get:
 *     description: Get all promotions for a given store
 *     parameters:
 *       - name: storeId
 *         in: path
 *         type: string
 *         description: Store identifier
 *         required: true
 *     responses:
 *       200:
 *         description: Array of promotion details
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/definitions/Promotion'
 */
storeRouter.get(
  Paths.Stores.Promotions.Get,
  validate(['storeId', 'string', 'params']),
  PromotionRoutes.getAllPromotions,
);

/**
 * @swagger
 * /v1/stores/{storeId}/promotions/{promotionId}:
 *   post:
 *     description: Verify Polygon ID proof for promotion eligibility
 *     parameters:
 *       - name: storeId
 *         in: path
 *         type: string
 *         description: Store identifier
 *         required: true
 *       - name: promotionId
 *         in: path
 *         type: string
 *         description: Promotion identifier
 *         required: true
 *     responses:
 *       200:
 *         description: 200 status code indicates successful verification
 */
storeRouter.post(
  Paths.Stores.Promotions.VerifyProof,
  validate(['storeId', 'string', 'params'], ['promotionId', 'string', 'params']),
  PromotionRoutes.verifyProof
);

apiRouter.use('/stores', storeRouter);

export default apiRouter;
