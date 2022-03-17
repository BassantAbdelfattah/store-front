import Client from '../database';


export type Order = {
    id?: number | undefined;
    status: string;
    user_id: number;
}
 export class OrderModel {

    async index(): Promise<Order[]> {
        try {
          const conn = await Client.connect()
          const sql = "SELECT o.id AS id, u.firstName, u.email, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('Id', p.id, 'name', p.name,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id GROUP BY o.id, u.firstName,u.email, o.status, o.user_id";

    
          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get orders. Error: ${err}`)
        }
      }


      async create(o: Order): Promise<Order> {
        try {
          const conn = await Client.connect()
          const sql ='INSERT INTO orders (status,user_id) values ($1, $2) RETURNING *';
          const result = await conn.query(sql, [o.status,o.user_id])
          const order = result.rows[0]

          conn.release()
    
          return order
        } catch(err) {
          throw new Error(`unable create order,${err}`)
        } 
      }

      async update(id: number,o: Order): Promise<Order> {
        try {
          const conn = await Client.connect();
          const sql ='UPDATE orders SET status=$1, user_id=$2 WHERE id=$3 RETURNING *';
          const result = await conn.query(sql, [o.status,o.user_id,id]);
          const order = result.rows[0]
          conn.release()
          return order
        } catch (err) {
          throw new Error(`Could not update order, ${err}`);
        }
      }

      async show(id: number): Promise<Order> {
        try {
        const sql = 
        "SELECT o.id AS id, u.firstName,u.email, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('Id', p.id, 'name', p.name,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.id = $1 GROUP BY o.id, u.firstName,u.email, o.status, o.user_id";

        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
      }

      async delete(id: number): Promise<Order> {
        try {
          const conn = await Client.connect()
          const orderProductsSql = "DELETE FROM order_products WHERE order_id=($1)"
          await conn.query(orderProductsSql, [id])
         const sql = 'DELETE FROM orders WHERE id=($1)'
         const result = await conn.query(sql, [id])

     
  
      const order = result.rows[0]
  
      conn.release()
  
      return order
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }
    
    async getCurrentOrderByUser(user_id: number): Promise<Order> {
        try {
          const sql =
            "SELECT o.id AS id, u.firstName,u.email, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('Id', p.id, 'name', p.name,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.user_id = $1 AND o.status = 'active' GROUP BY o.id, u.firstName,u.email, o.status, o.user_id";
    
          const conn = await Client.connect();
          const result = await conn.query(sql, [user_id]);
    
          conn.release();
          return result.rows[0] ;
        } catch (err) {
          throw new Error(`Could not find order for userId ${user_id}. Error: ${err}`);
        
      }
    }
    
    async getCompleteOrderByUser(user_id: number): Promise<Order> {
      try {
        const sql =
          "SELECT o.id AS id, u.firstName,u.email, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('Id', p.id, 'name', p.name,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.user_id = $1 AND o.status = 'complete' GROUP BY o.id, u.firstName,u.email, o.status, o.user_id";
  
        const conn = await Client.connect();
        const result = await conn.query(sql, [user_id]);
  
        conn.release();
        return result.rows[0] ;
      } catch (err) {
        throw new Error(`Could not find order for userId ${user_id}. Error: ${err}`);
      
    }
  } 

}
