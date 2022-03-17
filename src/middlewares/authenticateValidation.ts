import {Request, Response,NextFunction} from "express"

export const authenticateValidation = async (
    req: Request, res: Response,next: NextFunction
  ):  Promise<boolean | void> => {
    const email = req.body.email as unknown as string
    const password = req.body.password as unknown as string

    if ( !email || !password ) {
        res.json({status:400,
            message: "Please Provide email and password" }); 
            return false;
    }else{
        next();
    }
  };