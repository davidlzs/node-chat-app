var expect = require('expect');
var {generateMessage}=require('./message')

describe('generateMessage', () => {
    it('should generate the correct mesasge object', () => {
      var from = 'Jennifer';
      var text = 'Hello from the world';

      var message = generateMessage(from, text);

      expect(typeof(message.createdAt)).toBe('number');
      expect(message).toMatchObject({from, text});
    });
});
