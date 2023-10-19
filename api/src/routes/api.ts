import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import StoreRoutes from './StoreRoutes';


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
 * /v1/stores/{storeId}/promotions:
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
  StoreRoutes.getAllPromotions,
);

apiRouter.use('/stores', storeRouter);

export default apiRouter;
