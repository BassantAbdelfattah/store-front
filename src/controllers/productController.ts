import { Request, Response} from "express"
import {Product,ProductModel} from "../models/product"

const productModel = new ProductModel()

export const getAllProducts = async (_req: Request, res: Response): Promise<boolean | undefined> => {
  try {
    const products: Product[] = await productModel.index();

   res.send({
        status: 200,
        data: { products },
        message: 'products retrieved successfully'
    })
    return true;

  } catch (e) {
    res.send({
        status: 500,
        message: e
    });
    return false;
  }
}

export const createProduct = async (req: Request, res: Response): Promise<boolean | undefined>=> {
  try {

    const product: Product = await productModel.create(req.body)
   res.send({
    status: 200,
    data: { product },
    message: 'product added successfully'
})
return true;
  } catch (e) {
    res.send({
        status: 500,
        message: e
    })
    return false;
  }
}

export const showProduct = async (req: Request, res: Response): Promise<boolean | undefined> => {
  try {
    const id = req.params.id as unknown as number 
    const product: Product = await productModel.show(id)
    res.json({
        status: 200,
        data: { product},
        message: 'product retrieved successfully'
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

export const updateProduct = async (req: Request, res: Response): Promise<boolean | undefined>  => {
  try {
    const id = req.params.id as unknown as number 
    const product: Product = await productModel.update(id,req.body)

    res.json({
        status: 200,
        data: { product},
        message: 'product updated successfully'
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

export const deleteProduct = async (req: Request, res: Response): Promise<boolean | undefined>  => {
   try {
    const id = req.params.id as unknown as number

    await productModel.delete(id)
    res.json({
        status: 200,
        data: { id},
        message: 'product deleted successfully'
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



export const searchByCategory = async (req: Request, res: Response): Promise<boolean | undefined> => {
  try {
    const cat = req.params.cat as unknown as string 
    const product: Product = await productModel.searchByCategory(cat)
    res.json({
        status: 200,
        data: { product},
        message: 'product retrieved successfully'
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
