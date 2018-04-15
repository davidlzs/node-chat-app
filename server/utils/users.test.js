const expect = require('expect');
const {Users} = require('./users')

describe('Users', () => {
  var users;

  beforeEach( () => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: 'John',
        room: 'DevOp'
      },
      {
        id: 2,
        name: 'Sherry',
        room: 'DevOp'
      },
      {
        id: 3,
        name: 'Mike',
        room: 'Development'
      }
    ]
  });

  it('should add user', () => {
    var users = new Users();
    var user = users.addUser(12, 'Jennifer', 'DevOp');
    expect(users.users).toEqual([user]);
  });

  it('should remove user', () =>{
    var removedUser = users.removeUser(1);
    expect(removedUser).toMatchObject({
      id: 1
    });
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () =>{
    var removedUser = users.removeUser(4);
    expect(users.users).toEqual([
      {
        id: 1,
        name: 'John',
        room: 'DevOp'
      },
      {
        id: 2,
        name: 'Sherry',
        room: 'DevOp'
      },
      {
        id: 3,
        name: 'Mike',
        room: 'Development'
      }
    ]);
  });


  it('should find the user', () =>{
    var user = users.getUser(2);
    expect(user).toMatchObject({
      id: 2,
      name: 'Sherry',
      room: 'DevOp'
    });
  });

  it('should not find the user', () =>{
    var user = users.getUser(4);
    expect(user).toBeUndefined();
  });

  it('should get the users for DevOp', () =>{
    var userList = users.getUserList('DevOp');
    expect(userList).toEqual(['John', 'Sherry']);
  });

  it('should get the users for Development', () =>{
    var userList = users.getUserList('Development');
    expect(userList).toEqual(['Mike']);
  });
});
