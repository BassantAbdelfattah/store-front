import { ProductModel } from '../../models/product';

const productModel = new ProductModel()
let productId : number;
describe("Product Model", () => {
  it('should have an index method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(productModel.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productModel.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(productModel.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(productModel.delete).toBeDefined();
  });

  it('should have a searchByCategory method', () => {
    expect(productModel.searchByCategory).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await productModel.create({
      name: "dress",
      price: 300.00,
      category: "clothes"
    });
    productId = parseInt(result.id as unknown as string) as number;
    expect(result.name).toEqual("dress");
    expect(result.category).toEqual("clothes");
  });


  it('update method should update a product', async () => {
    const result = await productModel.update(productId,{
        name: "skirt",
        price: 300.00,
        category: "clothes"
    });
    expect(result.category).toEqual("clothes");
    expect(result.name).toEqual("skirt");
  });


  it('index method should return a list of products', async () => {
    const result = await productModel.index();
    expect(result[1].category).toEqual("clothes");
    expect(result[1].name).toEqual("skirt");
  });

  it('show method should return the correct product', async () => {
    const result = await productModel.show(productId);
    expect(result.category).toEqual("clothes");
    expect(result.name).toEqual("skirt");
  });

  it('searchByCategory method should return the correct product', async () => {
    const result = await productModel.searchByCategory("clothes");
    expect(result.category).toEqual("clothes");

  });

  it('delete method should remove the product', async () => {
   await productModel.delete(productId);
    const result = await productModel.show(productId);

    expect(result).toBeFalsy();
});


});


 
