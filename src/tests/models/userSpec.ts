import { UserModel} from '../../models/user';

const userModel = new UserModel()
let userId : number
describe("User Model", () => {
  it('should have an index method', () => {
    expect(userModel.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(userModel.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(userModel.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(userModel.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(userModel.delete).toBeDefined();
  });
  it('should have a authenticate method', () => {
    expect(userModel.authenticate).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await userModel.create({
      email: 'bassant@gmail.com',
      firstname: 'Bassant',
      lastname: 'Ahmed',
      password: '123456789'
    });
    userId = parseInt(result.id as unknown as string) as number;

    expect(result.email).toEqual("bassant@gmail.com");

  });


  it('update method should update a user', async () => {
    const result = await userModel.update(userId,{
      email: 'bassant2@gmail.com',
      firstname: 'Bassant',
      lastname: 'Ahmed',
      password: '123456789'
    });

    expect(result.email).toEqual("bassant2@gmail.com");

  });

  it('Authenticate method should return null when credentials are wrong', async () => {
    const result = await userModel.authenticate('bassant2@gmail.com', '123456');

    expect(result).toEqual(null);
    
  });


  it('index method should return a list of users', async () => {
    const result = await userModel.index();
   
      expect(result[1].id).toEqual(userId);
  });

  it('show method should return the correct user', async () => {
    const result = await userModel.show(userId);
    expect(result.email).toEqual("bassant2@gmail.com");

  });



  it('delete method should remove the user', async () => {
   await userModel.delete(userId);
    const result = await userModel.show(userId);
    expect(result).toBeFalsy();
});


});


 
