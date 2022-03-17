import { Router } from 'express';
import userController from '../controllers/userController';
import { checkIdValidation } from '../middlewares/checkIdValidation';
import { authenticateValidation } from '../middlewares/authenticateValidation';
import { UserValidation } from '../middlewares/UserValidation';
import  { checkAuthentication } from '../middlewares/checkAuthentication';

const userRouter = Router();
userRouter.get('/users', checkAuthentication,  userController.getAllUsers);
userRouter.post('/users',UserValidation,userController.createUser);
userRouter.get('/users/:id', [checkAuthentication,checkIdValidation],  userController.showUser);
userRouter.put('/users/:id', [checkAuthentication,checkIdValidation,UserValidation],  userController.updateUser);
userRouter.delete('/users/:id', [checkAuthentication,checkIdValidation],  userController.deleteUser);
userRouter.post("/users/auth", authenticateValidation,  userController.authenticate );

export default userRouter;