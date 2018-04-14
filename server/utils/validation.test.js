const expect = require('expect');

const {isRealSring} = require('./validation')

describe('isRealString', () =>{
  it('should reject non-string values', () => {
    var actual = isRealSring(123);
    expect(actual).toBe(false);
  });
  it('should reject string with only spaces', () => {
    var actual = isRealSring('   ');
    expect(actual).toBe(false);
  });
  it('should allow string non-space characters', () => {
    var actual = isRealSring('123');
    expect(actual).toBe(true);
  });
});
