const socket = io();

const chatForm = document.querySelector('#chat-form')

socket.on('message', message => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    let chatMessages = document.querySelector('.chat-messages');
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;

})

// Submitting message

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const msg = e.target.elements.msg.value
    // Emitting message to server
    socket.emit('chatMessage', msg)
    e.target.elements.msg.value = ""
    e.target.elements.msg.focus();
})