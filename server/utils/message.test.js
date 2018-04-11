var expect = require('expect');
var {generateMessage, generateLocationMessage}=require('./message')

describe('generateMessage', () => {
    it('should generate the correct mesasge object', () => {
      var from = 'Jennifer';
      var text = 'Hello from the world';

      var message = generateMessage(from, text);

      expect(typeof(message.createdAt)).toBe('number');
      expect(message).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location message object', () => {
    var from = 'John';
    var latitude = 26.01;
    var longitude = 122.19;

    var locationMessage = generateLocationMessage(from, latitude, longitude);

    expect(locationMessage).toMatchObject({url: 'https://www.google.com/maps?q=26.01,122.19'});
  });
});
