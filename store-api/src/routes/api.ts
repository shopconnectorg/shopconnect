import { Router } from 'express';

import { registerPluginRoutes } from '../shopconnect-plugin/routes';


const apiRouter = Router();

registerPluginRoutes(apiRouter);

export default apiRouter;
