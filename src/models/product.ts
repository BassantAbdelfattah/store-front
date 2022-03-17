import Client from '../database';


export type Product = {
    id?: number | undefined;
    name: string;
    price: number;
    category: string;
}
 export class ProductModel {

    async index(): Promise<Product[]> {
        try {
          const conn = await Client.connect()
          const sql = 'SELECT * FROM products'
    
          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get products. Error: ${err}`)
        }
      }


      async create(p: Product): Promise<Product> {
        try {
          const conn = await Client.connect()
          const sql ='INSERT INTO products (name, price, category) values ($1, $2, $3) RETURNING *';
       
    
          const result = await conn.query(sql, [p.name,p.price,p.category])
    
          conn.release()
    
          return result.rows[0]
        } catch(err) {
          throw new Error(`unable create product (${p.name}): ${err}`)
        } 
      }

      async update(id: number,p: Product): Promise<Product> {
        try {
          const conn = await Client.connect();
          const sql ='UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING *';
          const result = await conn.query(sql, [p.name,p.price,p.category,id]);
          conn.release()
          return result.rows[0]
        } catch (err) {
          throw new Error(`Could not update product: ${p.name}, ${err}`);
        }
      }

      async show(id: number): Promise<Product> {
        try {
        const sql = 'SELECT * FROM products WHERE id=$1'
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
      }

      async delete(id: number): Promise<Product> {
        try {
      const sql = 'DELETE FROM products WHERE id=($1)'
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
  
      conn.release()
  
      return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }     

    async searchByCategory(cat: string): Promise<Product> {
      try {
      const sql = 'SELECT * FROM products WHERE category=$1'
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [cat])
  
    conn.release()
  
      return result.rows[0]
      } catch (err) {
          throw new Error(`Could not find product By category ${cat}. Error: ${err}`)
      }
    }
  
}
