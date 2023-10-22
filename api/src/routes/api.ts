import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import PromotionRoutes from './PromotionRoutes';
import IdentityRoutes from './IdentityRoutes';

const apiRouter = Router(),
  validate = jetValidator();

const storeRouter = Router();
const identityRouter = Router();

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
 * /stores/{storeId}/promotions:
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
 * /stores/{storeId}/{promotionId}/issue:
 *   post:
 *     description: Issue Polygon ID credential for purchase
 *     parameters:
 *       - name: storeId
 *         in: path
 *         type: string
 *         description: Store identifier
 *         required: true
 *     responses:
 *       200:
 *         description: 200 status code indicates successful verification
 */
storeRouter.post(
  Paths.Stores.Issue.Post,
  validate(
    ['storeId', 'string', 'params'],
  ),
  PromotionRoutes.issueCredential,
);

/**
 * @swagger
 * /stores/{storeId}/{promotionId}/verify:
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
  Paths.Stores.Verify.Post,
  validate(
    ['storeId', 'string', 'params'],
    ['promotionId', 'string', 'params'],
  ),
  PromotionRoutes.verifyProof
);

identityRouter.post(
  Paths.Identity.ConfirmCredentials.Post,
  validate(
    ['credentialId', 'string', 'params'],
  ),
  IdentityRoutes.confirmCredential,
);

apiRouter.use('/stores', storeRouter);
apiRouter.use('/identity', identityRouter);

export default apiRouter;
