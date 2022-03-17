import {Request, Response,NextFunction} from "express"

export const ProductValidation = async (
    req: Request, res: Response,next: NextFunction
  ):  Promise<boolean | void> => {
    const name = req.body.name as unknown as string
    const price = req.body.price as unknown as number
   

    if ( !name || ! price ) {
        res.json({status:400,
            message: "Please Provide name and price" }); 
            return false;
    }else{
        next();
    }
  };