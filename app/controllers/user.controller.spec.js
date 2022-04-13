import { UserController } from "../controllers/user.controller";

const users = [
  {
    login: "Ivan",
    password: "qwerty",
    age: 20
  },
];

const mockRequest = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  req.query = jest.fn().mockReturnValue(req);
  
  return req;
};

const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  
  return res;
};

describe("UserController", () => {
  let userMockController;
  let userMockService = {};

  beforeEach(() => {
    userMockController = new UserController(userMockService);
  });

  it("Should find user and returns 200 status", async () => {
    userMockService.filter = jest.fn().mockImplementation(() => Promise.resolve([users[0]]));

    const req = mockRequest();
    req.query.q = 'iva';
    req.query.limit = 10;
    const res = mockResponse();

    await userMockController.searchUser(req, res);
    expect(res.send).toHaveBeenCalledWith([users[0]]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(userMockService.filter).toHaveBeenCalled();
    expect(userMockService.filter).toHaveBeenCalledWith(
      req.query.q,
      req.query.limit
    );
  });

  it("Should not find user and returns 404 status", async () => {
    userMockService.filter = jest
      .fn()
      .mockImplementation(() => Promise.resolve([]));

      const req = mockRequest();
      req.query.q = "x32gfc6";
      req.query.limit = 10;
      const res = mockResponse();

      await userMockController.searchUser(req, res);
      expect(res.send).toHaveBeenCalledWith("User not found");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(userMockService.filter).toHaveBeenCalled();
      expect(userMockService.filter).toHaveBeenCalledWith(
        req.query.q,
        req.query.limit
      );
  });

  it('Should create user and return user data', async () => {
    const newUser = {
      login: "Shao Kahn",
      password: "bg542a",
      age: 1024,
    };

    const req = mockRequest();
    req.body = { ...newUser };
    const res = mockResponse();
    
    userMockService.createUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(newUser));

    await userMockController.createUser(req, res);
    expect(userMockService.createUser).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      login: newUser.login,
      password: newUser.password,
      age: newUser.age,
    }));
  });

  it('Should get all users', async () => {
    userMockService.getAll = jest
      .fn()
      .mockImplementation(() => Promise.resolve([]));

    const req = mockRequest();
    const res = mockResponse();
    
    await userMockController.getAllUsers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('Should get user by user id', async () => {
    const req = mockRequest();
    req.params.id = 1;
    const res = mockResponse();

    userMockService.getUserById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(users[0]));

    await userMockController.getUserById(req, res);
      
    expect(userMockService.getUserById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users[0]);
  });
});
