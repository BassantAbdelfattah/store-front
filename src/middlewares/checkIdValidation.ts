
import {Request, Response,NextFunction} from "express"

export const checkIdValidation = async (
    req: Request, res: Response,next: NextFunction
  ):  Promise<boolean | void> => {
    const id = req.params.id as unknown as number

    if (!id) {
        res.json({status:400,
            message: " Invalid url, Please Provide id" }); 
            return false;
    }else{
        next();
    }
  };



