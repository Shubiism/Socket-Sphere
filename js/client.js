const socket = io('https://socket-sphere-backend-production.up.railway.app');

const form = document.getElementById('send-container');
const msgInp = document.getElementById('msgInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio("Ring.mp3");
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}
const name = prompt("Enter your name to join: ");
socket.emit('new-user-joined', name);
socket.on('user-joined', name => {
    append(`${name} joined the chat.`, 'right')
})
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left')
})
socket.on('left', name => {
    append(`${name} left the chat.`, 'right')
})
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInp.value = ''
})