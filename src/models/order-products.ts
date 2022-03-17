import Client from '../database';


export type orderProduct = {
    id?: number | undefined;
    quantity: number;
    product_id: number;
}


 export class orderProductModel {

    async index(): Promise<orderProduct[]> {
        try {
          const conn = await Client.connect()
          const sql = 'SELECT p.*, u.email,u.firstName,u.lastName, op.* , o.* FROM orders o INNER JOIN users u ON o.user_id = u.id INNER JOIN order_products op ON o.id = op.order_id INNER JOIN products p ON op.product_id = p.id '

          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get orderProduct. Error: ${err}`)
        }
      }


      async create(o: orderProduct, order_id: number): Promise<orderProduct> {
        try {
          const conn = await Client.connect()
          const sql ='INSERT INTO order_products (quantity,order_id,product_id) values ($1, $2,$3) RETURNING *';
          const {rows} = await conn.query(sql, [o.quantity,order_id,o.product_id])
              
          conn.release()
          return rows[0]
        } catch(err) {
          throw new Error(`unable create orderProduct,${err}`)
        } 
      }

      async update(id: number,o: orderProduct,order_id: number): Promise<orderProduct> {
        try {
          const conn = await Client.connect();
          const sql ='UPDATE order_products SET quantity=$1, order_id=$2, product_id=$3 WHERE id=$4 RETURNING *';
          const {rows} = await conn.query(sql, [o.quantity,order_id,o.product_id,id]);
          conn.release()
          return rows[0]
        } catch (err) {
          throw new Error(`Could not update orderProduct, ${err}`);
        }
      }

      async updateOrder(id: number,o: orderProduct): Promise<orderProduct> {
        try {
          const conn = await Client.connect();
          const sql ='UPDATE order_products SET quantity=$1, product_id=$2 WHERE order_id=$3 RETURNING *';
          const result = await conn.query(sql, [o.quantity,o.product_id,id]);
           const order = result.rows[0]
          conn.release()
          return order
        } catch (err) {
          throw new Error(`Could not update order, ${err}`);
        }
      }

      async show(order_id: number, product_id : number): Promise<orderProduct> {
        try {
        const sql = 'SELECT op.*, p.*, o.* FROM order_products AS op JOIN products AS p ON p.id=op.product_id JOIN orders o ON o.id = op.order_id WHERE op.order_id=$1 AND op.product_id=$2';
        
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [order_id,product_id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find orderProduct . Error: ${err}`)
        }
      }

      async delete(id: number): Promise<orderProduct> {
        try {
      const sql = 'DELETE FROM order_products WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
  
      const order = result.rows[0]
  
      conn.release()
  
      return order
        } catch (err) {
            throw new Error(`Could not delete orderProduct ${id}. Error: ${err}`)
        }
    }     
  
}
