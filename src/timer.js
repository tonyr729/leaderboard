import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');

function subscribeToChange(cb, change) {
  socket.on('change', changeAfter => cb(null, changeAfter));
  socket.emit('subscribeToChange', change);
}

export { subscribeToChange };