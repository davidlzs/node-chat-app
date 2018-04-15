const expect = require('expect');

const {isRealString} = require('./validation')

describe('isRealString', () =>{
  it('should reject non-string values', () => {
    var actual = isRealString(123);
    expect(actual).toBe(false);
  });
  it('should reject string with only spaces', () => {
    var actual = isRealString('   ');
    expect(actual).toBe(false);
  });
  it('should allow string non-space characters', () => {
    var actual = isRealString('123');
    expect(actual).toBe(true);
  });
});
