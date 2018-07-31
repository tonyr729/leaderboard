import openSocket from 'socket.io-client';
const socket = openSocket('https://leaderboard-byob.herokuapp.com/');

function subscribeToChange(callbackFunction, change) {
  socket.on('change', changeAfter => callbackFunction(null, changeAfter));
  socket.emit('subscribeToChange', change);
}

export { subscribeToChange };