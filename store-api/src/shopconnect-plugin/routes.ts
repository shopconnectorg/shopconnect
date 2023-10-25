import { Router } from 'express';
import jetValidator from 'jet-validator';

import handlers from './handlers';
import Paths from './Paths';

const validate = jetValidator();
const scpluginRouter = Router();

export function registerPluginRoutes(apiRouter: Router) {
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
   * /shopconnect-plugin/promotions:
   *   get:
   *     description: Get all available promotions
   *     responses:
   *       200:
   *         description: Array of promotion details
   *         schema:
   *           type: array
   *           items:
   *             type: object
   *             $ref: '#/definitions/Promotion'
   */
  scpluginRouter.get(
    Paths.ShopConnect.Promotions.Get,
    handlers.getAllPromotions
  );

  /**
   * @swagger
   * /shopconnect-plugin/promotions/{promotionId}/apply:
   *   post:
   *     description: Apply a ShopConnect promotion
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
  scpluginRouter.post(
    Paths.ShopConnect.Promotions.ApplyPromotion,
    validate(['promotionId', 'string', 'params']),
    handlers.applyPromotion
  );

  scpluginRouter.post(
    Paths.ShopConnect.Purchases.Post,
    validate(['did', 'string', 'query']),
    handlers.confirmPurchase,
  );

  apiRouter.use('/shopconnect-plugin', scpluginRouter);
}
