import supertest from "supertest";

import app from '../../server';
import {Product} from "../../models/product";

const request = supertest(app)
const productData: Product = {
    name: "skirt",
    price: 300.00,
    category: "clothes"
}

let token: string = "" ;
describe("Product Controller", ()=> {

  it("should create new product", async () =>{
    const res = await   request
    .post("/api/products")
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send(productData)

      expect(res.status).toBe(200);
    
  })

  it("should get all products", async () =>{
    const res = await  request
    .get("/api/products")
    expect(res.status).toBe(200);
  })

  it("should get specific product", async () => {
    const res = await  request
    .get('/api/products/1')
      expect(res.status).toBe(200)
  })

  it("should get specific product by category", async () => {
    const res = await  request
    .get('/api/products/category/clothes')
    .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
  })

  it("should update new product", async () =>{
    const res = await   request
    .put("/api/products")
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
      id: 1,
      name: "dress",
      price: 300.00,
      category: "clothes"
    })
    expect(res.status).toBe(200);
    
  })


  it("should delete specific product", async () => {
    const res = await  request
    .delete('/api/products/1')
    .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
  })


})