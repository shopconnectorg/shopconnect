/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';
import { StatusCodes } from 'http-status-codes';

import BaseRouter from '@src/routes/api';
import Paths from '@src/constants/Paths';

import EnvVars from '@src/constants/EnvVars';

import { NodeEnvs } from '@src/constants/misc';
import { RouteError } from '@src/other/classes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


// **** Variables **** //

const app = express();


// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.CookieProps.Secret));

const isDev = EnvVars.NodeEnv === NodeEnvs.Dev.valueOf();
const isProduction = EnvVars.NodeEnv === NodeEnvs.Production.valueOf();
const isTest = EnvVars.NodeEnv !== NodeEnvs.Test.valueOf();

// Show routes called in console during development
if (isDev) {
  app.use(morgan('dev'));
}

// Security
if (isProduction) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (isTest) {
    logger.err(err, true);
  }
  let status = StatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

if (isDev) {
  // Swagger API documentation
  const options = {
    failOnErrors: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'ShopConnect API',
        version: '0.0.1',
      },
    },
    apis: ['./src/routes/*.ts']
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default app;
