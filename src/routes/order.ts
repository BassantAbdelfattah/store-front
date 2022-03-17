import { Router } from 'express';
import {getAllorders,
        createOrder,
        showOrder,
        updateOrder,
        deleteOrder,getCurrentOrderByUser
       ,getCompeletedOrderByUser} from '../controllers/orderController';
import { checkIdValidation } from '../middlewares/checkIdValidation';
import { OrderValidation } from '../middlewares/OrderValidation';

const orderRouter = Router();
orderRouter.get('/orders',  getAllorders);
orderRouter.post('/orders',OrderValidation,createOrder);
orderRouter.get('/orders/:id', checkIdValidation,  showOrder);
orderRouter.put('/orders/:id', [checkIdValidation,OrderValidation],  updateOrder);
orderRouter.delete('/orders/:id', checkIdValidation,  deleteOrder);
orderRouter.get('/orders/current/users/:id', checkIdValidation,  getCurrentOrderByUser);
orderRouter.get('/orders/complete/users/:id', checkIdValidation,  getCompeletedOrderByUser);

export default orderRouter;