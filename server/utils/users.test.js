const expect = require('expect');
const {Users} = require('./users')

describe('addUser', () => {
  it('should add user', () =>{
    var users = new Users();
    var user = users.addUser(12, 'Jennifer', 'DevOp');
    expect(users.users).toEqual([user]);
  });
});
