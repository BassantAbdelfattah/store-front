import supertest from "supertest";
import { Product,ProductModel } from "../../models/product";
import { User,UserModel} from "../../models/user";

import app from '../../server';

const request = supertest(app)


let token: string = "" ;
const userModel = new UserModel()
const productModel = new ProductModel()
describe("Order Controller", ()=> {

    beforeAll(async () => {

        const user: User = await userModel.create({
            email: 'admin123@gmail.com',
            firstname: 'admin123',
            lastname: 'admin123'
            });
             const product: Product =   await productModel.create({name: "dress",
                                    price: 300.00,
                                    category: "clothes"
                                   });
    
       });
       afterAll(async () => {
        await productModel.delete(1);
        await userModel.delete(1);
    
      });

  it("should create new order", async () =>{
    const res = await   request
    .post("/api/orders")
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
        "products":[{
            "product_id": 1,
            "quantity" : 2
        }],
        "user_id": 1,
        "status": "complete"
    }
    )

      expect(res.status).toBe(200);
    
  })

  it("should get all orders", async () =>{
    const res = await  request
    .get("/api/orders")
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
  })

  it("should get specific order", async () => {
    const res = await  request
    .get('/api/orders/1')
    .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
  })

 

  it("should update new order", async () =>{
    const res = await   request
    .put("/api/orders")
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
        "products":[{
            "product_id": 1,
            "quantity" : 3
        }],
        "user_id": 1,
        "status": "active"
    })
    expect(res.status).toBe(200);
    
  })


  it("should delete specific order", async () => {
    const res = await  request
    .delete('/api/orders/1')
    .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
  })


})