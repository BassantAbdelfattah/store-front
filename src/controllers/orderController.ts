import {Application, Request, Response} from "express"
import {Order,OrderModel} from "../models/order"
import {orderProduct,orderProductModel} from "../models/order-products"

const orderModel = new OrderModel()
const OrderProductModel = new orderProductModel()

export const getAllorders = async (_req: Request, res: Response): Promise<boolean | undefined> => {
  try {
    const orders: Order[] = await orderModel.index();


   res.send({
        status: 200,
        data: { orders },
        message: 'orders retrieved successfully'
    })
    return true;

  } catch (e) {
      console.log(e);
    res.send({
        status: 500,
        message: e
    });
    return false;
  }
}

export const createOrder = async (req: Request, res: Response): Promise<boolean | undefined>=> {
  try {
     const orderData: Order = {
         user_id: req.body.user_id as unknown as number,
         status : req.body.status as unknown as string
     };

    const order: Order = await orderModel.create(orderData)
    const order_id = order.id as unknown as number;
    const order_products = req.body.products as unknown as orderProduct[];
    const products = [];
    for (const order_product of order_products) {
        products.push(await OrderProductModel.create(order_product,order_id));
    }


   res.send({
    status: 200,
    data: { ...order,
        products: products
    },
    message: 'order added successfully'
})
return true;
  } catch (e) {
      console.log(e);
    res.send({
        status: 500,
        message: e
    })
    return false;
  }
}

export const showOrder = async (req: Request, res: Response): Promise<boolean | undefined> => {
  try {
    const id = req.params.id as unknown as number 
    const order: Order = await orderModel.show(id)
    res.json({
        status: 200,
        data: { order},
        message: 'order retrieved successfully'
    });
    return true;
  } catch (e) {
      console.log(e);
    res.json({
        status: 500,
        message: e
    });
    return false;
  }
}

export const updateOrder = async (req: Request, res: Response): Promise<boolean | undefined>  => {
  try {
    const id = req.params.id as unknown as number 
    const order: Order = await orderModel.update(id,req.body)
    const order_products = req.body.products as unknown as orderProduct[];
    const products = [];
    for (const order_product of order_products) {
        products.push(await OrderProductModel.updateOrder(id,order_product));
    }
    console.log(products);
    res.json({
        status: 200,
        data: { ...order,
            products: products},
        message: 'order updated successfully'
    });
    return true;
  } catch (e) {
      console.log(e);
    res.json({
        status: 500,
        message: e
    });
    return false;
  }
}

export const deleteOrder = async (req: Request, res: Response): Promise<boolean | undefined>  => {
   try {
    const id = req.params.id as unknown as number

    await orderModel.delete(id)
    res.json({
        status: 200,
        data: { id},
        message: 'order deleted successfully'
    });
    return true;

  } catch (e) {
    res.json({
        status: 500,
        message: e
    });
    return false;
  }
}


export const getCurrentOrderByUser = async (req: Request, res: Response): Promise<boolean | undefined> => {
  try {
    const id = req.params.id as unknown as number 
    const order: Order = await orderModel.getCurrentOrderByUser(id)
    res.json({
        status: 200,
        data: { order},
        message: 'current orders retrieved successfully'
    });
    return true;
  } catch (e) {
      console.log(e);
    res.json({
        status: 500,
        message: e
    });
    return false;
  }
}

export const getCompeletedOrderByUser = async (req: Request, res: Response): Promise<boolean | undefined> => {
  try {
    const id = req.params.id as unknown as number 
    const order: Order = await orderModel.getCompleteOrderByUser(id)
    res.json({
        status: 200,
        data: { order},
        message: 'compeleted orders retrieved successfully'
    });
    return true;
  } catch (e) {
      console.log(e);
    res.json({
        status: 500,
        message: e
    });
    return false;
  }
}



