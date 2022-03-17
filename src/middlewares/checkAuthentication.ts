
  import { Request, Response, NextFunction } from 'express';
  import jwt from "jsonwebtoken"

  export const checkAuthentication = (req: Request, res: Response, next: NextFunction): boolean | void  => {
  const token = req.headers.authorization as unknown as string;
  if (!token) {
    res.json({status:401,
      message: "Unauthorized, bad request" 
    });
    return false;
  }

  try{
    const Secret = process.env.TOKEN_SECRET as unknown as string;

    if(jwt.verify(token, Secret) ){
      next();

    }else{
      res.json({status:401,
        message: "Invalid token" 
      });
      return false;
    }

  }catch(e){
    res.json({status:500,
      message: e 
    });
    return false;
  }
};

