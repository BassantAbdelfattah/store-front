import { OrderModel } from '../../models/order';
import { ProductModel, Product } from '../../models/product';
import { UserModel, User } from '../../models/user';
import { orderProductModel } from '../../models/order-products';

const orderModel = new OrderModel()
const userModel = new UserModel()
const productModel = new ProductModel()
const  OrderProductModel  = new orderProductModel()
let productId : number, userId : number , orderId : number;

describe("Order Model", () => {
  it('should have an index method', () => {
    expect(orderModel.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderModel.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderModel.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(orderModel.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(orderModel.delete).toBeDefined();
  });

  it('should have a getCompleteOrderByUser method', () => {
    expect(orderModel.getCompleteOrderByUser).toBeDefined();
  });

  it('should have a getCurrentOrderByUser method', () => {
    expect(orderModel.getCurrentOrderByUser).toBeDefined();
  });

  beforeAll(async () => {

    const user: User = await userModel.create({
        email: 'admin@gmail.com',
        firstname: 'admin',
        lastname: 'admin'
        });
        userId = parseInt(user.id as unknown as string) as number;

         const product: Product =   await productModel.create({name: "dress",
                                price: 300.00,
                                category: "clothes"
                               });
      productId = parseInt(product.id as unknown as string) as number;

   });
   afterAll(async () => {
    await productModel.delete(1);
    await userModel.delete(1);

  });
  it('create method should add a order', async () => {
    const result = await orderModel.create({
      status : 'active',
      user_id : userId
    });
    orderId = parseInt(result.id as unknown as string) as number;

    expect(result.id).toEqual(orderId);

    });

  it('create method should add a orderproduct', async () => {
    const result = await OrderProductModel.create({
        quantity : 2,
        product_id: productId
    },1);
    expect(result.id).toEqual(orderId);

    });
  

  it('update method should update a order', async () => {
    const result = await orderModel.update(orderId,{
        status : 'complete',
        user_id : userId
    });
    expect(result.status).toEqual('complete');

  });


  it('index method should return a list of orders', async () => {
    const result = await orderModel.index();
    expect(result[0].id).toEqual(orderId);
    expect(result[0].status).toEqual('complete');


  });

  it('show method should return the correct order', async () => {
    const result = await orderModel.show(orderId);
    expect(result.id).toEqual(orderId);
    expect(result.status).toEqual('complete');
  });

  it('getCurrentOrderByUser method should return the correct product', async () => {
    const result = await orderModel.getCurrentOrderByUser(userId);
    expect(result).toBeFalsy();

  });
  it('getCompleteOrderByUser method should return the correct product', async () => {
    const result = await orderModel.getCompleteOrderByUser(userId);
    expect(result.id).toEqual(orderId);
    expect(result.status).toEqual('complete');
  });


  it('delete method should remove the order', async () => {
    await orderModel.delete(orderId);
    const result = await orderModel.show(orderId);

    expect(result).toBeFalsy();
});

});

