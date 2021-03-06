var socket = io();

function scrollToBottom() {
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);
  jQuery('#chat_room').html('Users in room: <br/>' + params.room);
  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No err');
    }
  });
});
socket.on('disconnect', function () {

});

socket.on('updateUserList', (users) => {
  var ol = jQuery('<ol></ol>');
  users.forEach(user => {
    ol.append(jQuery('<li></li>').text(user));
  })
  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
  // var formattedTime = moment(message.createdAt).format("h:mm a");
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,
    { text: message.text,
      from: message.from,
      createdAt: formattedTime
    });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My Location</a>');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,
    { url: message.url,
      from: message.from,
      createdAt: formattedTime
    });

  jQuery('#messages').append(html);
  scrollToBottom();
});

var messageTextBox = jQuery('[name=message]');
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your borwser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    console.log(position);
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fecth location');
  })
});
