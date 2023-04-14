import './style.scss';

console.log('starting up!');

const mainDiv = document.querySelector('#main');
let num = 1;

function updateMainText() {
  mainDiv.textContent = `You've been on this page for ${num} seconds.`;
  num += 1;
}

setInterval(updateMainText, 1000);
