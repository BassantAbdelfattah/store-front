
import Client from '../database';
import hashPassword from '../utilities/hashPassword';

export class UserModel {

 async create() {
    try {
      const conn = await Client.connect()
      const sql ='INSERT INTO users (email, firstName, lastName, password) values ($1, $2, $3, $4) RETURNING id, email, firstName, lastName';
      const hash = hashPassword("123456" as string);
      const result = await conn.query(sql, ["admin@admin.com","admin","admin", hash])
      const user = result.rows[0]
      conn.release();
      console.log(user);
    //   return user
    } catch(err) {
      throw new Error(`unable create user  ${err}`)
    } 
  }

  
}
const userModel = new UserModel();
userModel.create();