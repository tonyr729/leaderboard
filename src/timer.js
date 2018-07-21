import openSocket from 'socket.io-client';
const socket = openSocket('https://leaderboard-byob.herokuapp.com/');

function subscribeToChange(cb, change) {
  socket.on('change', changeAfter => cb(null, changeAfter));
  socket.emit('subscribeToChange', change);
}

export { subscribeToChange };