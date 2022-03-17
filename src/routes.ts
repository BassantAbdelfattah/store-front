import express from 'express';
import { checkAuthentication } from './middlewares/checkAuthentication';

import userRouter from './routes/user';
import productRouter from './routes/product';
import orderRouter from './routes/order';


const routes = express.Router();

routes.use(userRouter);
routes.use(productRouter);
routes.use(checkAuthentication,orderRouter);

export default routes;