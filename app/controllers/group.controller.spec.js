import { GroupController } from "./group.controller";

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

describe('GroupController', () => {
    let groupMockController;
    let groupMockService = {};

    beforeEach(() => {
      groupMockController = new GroupController(groupMockService);
    });

    it('Should get group by group id', async () => {
        const group = {
          id: 1,
          name: "admin",
          permissions: ["WRITE", "DELETE", "READ"],
        };
        
        groupMockService.getById = jest
          .fn()
          .mockImplementation(() => Promise.resolve([group]));

        const req = mockRequest();
        req.params.id = 1;
        const res = mockResponse();

        await groupMockController.getById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              id: group.id,
              name: group.name,
              permissions: group.permissions,
            }),
          ])
        );
        expect(groupMockService.getById).toHaveBeenCalledWith(1);
    });

    it('Should create new group', async () => {
        const group = {
            id: 1,
            name: "admin",
            permissions: ["WRITE", "DELETE", "READ"],
        };

        groupMockService.create = jest
          .fn()
          .mockImplementation(() => Promise.resolve(group));

        const req = mockRequest();
        req.params.id = 1;
        const res = mockResponse();

        await groupMockController.create(req, res);
        expect(groupMockService.create).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            name: group.name,
            permissions: group.permissions,
            id: 1
        }));
    });

    it('Should add users to group', async () => {
        const req = mockRequest();
        const res = mockResponse();
        const data = {
          groupId: "bbda14f0-7a24-41c0-9991-931252bad9fc",
          userIds: [
            "919473bf-6a40-43a7-a606-d77668201765",
            "ff20f2dd-48f5-413e-bbbf-b79e8d2add5f",
          ],
          responseDto: [
            {
              id: 1,
              groupId: "bbda14f0-7a24-41c0-9991-931252bad9fc",
              userId: "919473bf-6a40-43a7-a606-d77668201765",
            },
            {
              id: 2,
              groupId: "bbda14f0-7a24-41c0-9991-931252bad9fc",
              userId: "ff20f2dd-48f5-413e-bbbf-b79e8d2add5f",
            },
          ],
        };
        groupMockService.addUsersToGroup = jest
          .fn()
          .mockImplementation(() => Promise.resolve(data.responseDto));

        req.groupId = data.groupId;
        req.userIds = data.userIds;
        await groupMockController.addUsersToGroup(req, res);

        expect(groupMockService.addUsersToGroup).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(data.responseDto);
    })
});
