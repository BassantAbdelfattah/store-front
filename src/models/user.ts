import bcrypt from 'bcrypt';
import Client from '../database';
import hashPassword from '../utilities/hashPassword';


export type User = {
    id?: number | undefined;
    email: string;
    firstname: string;
    lastname: string;
    password?: string;
}

 export class UserModel {

    async index(): Promise<User[]> {
        try {
          const conn = await Client.connect()
          const sql = 'SELECT id,email, firstName, lastName FROM users'
    
          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get users. Error: ${err}`)
        }
      }


      async create(u: User): Promise<User> {
        try {
          const conn = await Client.connect()
          const sql ='INSERT INTO users (email, firstName, lastName, password) values ($1, $2, $3, $4) RETURNING id, email, firstName, lastName';
          const hash = hashPassword(u.password as string);
       
          const result = await conn.query(sql, [u.email,u.firstname,u.lastname, hash])
          const user = result.rows[0]
    
          conn.release()
    
          return user
        } catch(err) {
          throw new Error(`unable create user (${u.firstname} ${u.lastname}): ${err}`)
        } 
      }

      async update(id: number,u: User): Promise<User> {
        try {
          const conn = await Client.connect();
          const sql ='UPDATE users SET email=$1, firstName=$2, lastName=$3, password=$4 WHERE id=$5 RETURNING id, email, firstName, lastName';
          const hash = hashPassword(u.password as string);
          const result = await conn.query(sql, [u.email,u.firstname,u.lastname,hash,id]);
          const user = result.rows[0]
          conn.release()
          return user
        } catch (err) {
          throw new Error(`Could not update user: ${u.firstname} ${u.lastname}, ${err}`);
        }
      }

      async show(id: number): Promise<User> {
        try {
        const sql = 'SELECT id,email, firstName, lastName FROM users WHERE id=$1'
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
      }

      async delete(id: number): Promise<User> {
        try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      const user = result.rows[0]
  
      conn.release()
  
      return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }
  
      async authenticate(email: string, password: string): Promise<User | null> {

        try {
        const conn = await Client.connect()
        const sql = 'SELECT password FROM users WHERE email=($1)'
    
        const result = await conn.query(sql, [email])
    
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
    
          if (bcrypt.compareSync(password+process.env.BCRYPT_PASSWORD, user.password)) {
            return user
          }
        }
    
        return null
      }
     catch (err) {
        throw new Error(`Could not authenticate user: ${email}, ${err}`);
      }
    }
  
}
