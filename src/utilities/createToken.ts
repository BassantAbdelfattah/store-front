

import jwt from "jsonwebtoken"
import {User} from "../models/user"
const Secret = process.env.TOKEN_SECRET as unknown as string;
const createToken = (user: User) : String => {
    return jwt.sign({user}, Secret)

};

export default createToken;