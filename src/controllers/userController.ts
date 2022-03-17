import {Request, Response} from "express"
import {User,UserModel} from "../models/user"
import createToken from '../utilities/createToken';

const userModel = new UserModel()

const getAllUsers = async (_req: Request, res: Response): Promise<boolean | undefined> => {
  try {
    const users: User[] = await userModel.index();

   res.send({
        status: 200,
        data: { users },
        message: 'users retrieved successfully'
    })
    return true;

  } catch (e) {
    res.send({
        status: 500,
        message: e
    });
    return false;
  }
}

const createUser = async (req: Request, res: Response): Promise<boolean | undefined>=> {
  try {

    const user: User = await userModel.create(req.body)
   const token : String= createToken(user);
   res.send({
    status: 200,
    data: { ...user,token },
    message: 'user added successfully'
})
return true;
  } catch (e) {
    res.send({
        status: 500,
        message: e
    })
    return false;
  }
}

const showUser = async (req: Request, res: Response): Promise<boolean | undefined> => {
  try {
    const id = req.params.id as unknown as number 
    const user: User = await userModel.show(id)
    res.json({
        status: 200,
        data: { user},
        message: 'user retrieved successfully'
    });
    return true;
  } catch (e) {
      console.log(e);
    res.json({
        status: 500,
        message: e
    });
    return false;
  }
}

const updateUser = async (req: Request, res: Response): Promise<boolean | undefined>  => {
  try {
    const id = req.params.id as unknown as number 
    const user: User = await userModel.update(id,req.body)

    res.json({
        status: 200,
        data: { user},
        message: 'user updated successfully'
    });
    return true;
  } catch (e) {
      console.log(e);
    res.json({
        status: 500,
        message: e
    });
    return false;
  }
}

const deleteUser = async (req: Request, res: Response): Promise<boolean | undefined>  => {
   try {
    const id = req.params.id as unknown as number

    await userModel.delete(id)
    res.json({
        status: 200,
        data: { id},
        message: 'user deleted successfully'
    });
    return true;

  } catch (e) {
    res.json({
        status: 500,
        message: e
    });
    return false;
  }
}

const authenticate = async (req: Request, res: Response) => {
  try {

    const email = req.body.email as unknown as string
    const password = req.body.password as unknown as string
    const user: User | null = await userModel.authenticate(email, password)

    if (user == null) {

        res.json({
            status: 401,
            message: 'wrong password'
        });

      return false
    }

    const token : String= createToken(user);
    res.json({
     status: 200,
     data: { token },
     message: 'user authenticated successfully'
   });
   return true;

  } catch (e) {
    res.json({
        status: 500,
        message: e
    });
    return false;
  }
}

export default {
    getAllUsers,
    createUser,
    updateUser,
    showUser,
    deleteUser,
    authenticate
}
