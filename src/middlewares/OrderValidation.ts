import {Request, Response,NextFunction} from "express"
import {orderProduct} from "../models/order-products"

export const OrderValidation = async (
    req: Request, res: Response,next: NextFunction
  ):  Promise<boolean | void> => {
    const status = req.body.status as unknown as boolean
    const user_id = req.body.user_id as unknown as number
    const products = req.body.products as unknown as orderProduct[];


    if ( !status || ! user_id || ! products ) {
        res.json({status:400,
                  message: "Please Provide status, user_id and products" 
                 }); 
                  return false;
    }else{
        next();
    }
  };