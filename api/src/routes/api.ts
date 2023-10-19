import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import User from '@src/models/User';
import UserRoutes from './UserRoutes';
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

// ** Add UserRouter ** //

const userRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.isUser]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.isUser]),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

apiRouter.use('/stores', storeRouter);

export default apiRouter;
