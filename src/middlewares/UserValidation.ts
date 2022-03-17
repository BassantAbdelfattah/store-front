import {Request, Response,NextFunction} from "express"

export const UserValidation = async (
    req: Request, res: Response,next: NextFunction
  ):  Promise<boolean | void> => {
    const email = req.body.email as unknown as string
    const firstName = req.body.firstName as unknown as string
    const lastName = req.body.lastName as unknown as string
    const password = req.body.password as unknown as string

    if ( !email || !firstName|| !lastName||  !password ) {
        res.json({status:400,
            message: "Please Provide email, firstName, lastName and password" }); 
            return false;
    }else{
        next();
    }
  };