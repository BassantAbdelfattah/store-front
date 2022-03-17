import supertest from "supertest";

import app from '../../server';
import {User} from "../../models/user";

const request = supertest(app)
const userData: User = {
  email: 'test@gmail.com',
  firstname: 'test',
  lastname: 'test',
  password: '123456789'
}

let token: string = "" ;
describe("User Controller", ()=> {

  it("should create new user", async () =>{
    const res = await   request
    .post("/api/users")
    .set('Content-type', 'application/json')
    .send(userData)

      expect(res.status).toBe(200);
    
  })

  it("should get all users", async () =>{
    const res = await  request
    .get("/api/users")
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
  })

  it("should get specific user", async () => {
    const res = await  request
    .get('/api/users/1')
    .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
  })


  it("should update new user", async () =>{
    const res = await   request
    .put("/api/users")
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
      id: 1,
      email: 'test1@gmail.com',
      firstname: 'test',
      lastname: 'test',
      password: '123456789'
    })
    expect(res.status).toBe(200);
    
  })

  it('should authenticate user to get token', async () => {
    const res = await request
      .post('/api/users/auth')
      .set('Content-type', 'application/json')
      .send({
        email: 'test1@gmail.com',
        password: '123456789'
      });
    expect(res.status).toBe(200);
   
  })

  it("should delete specific user", async () => {
    const res = await  request
    .delete('/api/users/1')
    .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
  })


})