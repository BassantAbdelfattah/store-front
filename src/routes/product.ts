import { Router } from 'express';
import {getAllProducts,
        createProduct,
        showProduct,
        updateProduct,
        deleteProduct,
        searchByCategory} from '../controllers/productController';
import { checkIdValidation } from '../middlewares/checkIdValidation';
import { ProductValidation } from '../middlewares/ProductValidation';
import  { checkAuthentication } from '../middlewares/checkAuthentication';

const productRouter = Router();
productRouter.get('/products',  getAllProducts);
productRouter.post('/products',[checkAuthentication,ProductValidation],createProduct);
productRouter.get('/products/:id', checkIdValidation,  showProduct);
productRouter.put('/products/:id', [checkAuthentication,checkIdValidation,ProductValidation],  updateProduct);
productRouter.delete('/products/:id', [checkAuthentication,checkIdValidation],  deleteProduct);
productRouter.get('/products/category/:cat', checkAuthentication,  searchByCategory);

export default productRouter;