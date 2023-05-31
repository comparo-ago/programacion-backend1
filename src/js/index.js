const socketClient = io();

const form = document.getElementById('formSockets');
const messageContainer = document.getElementById('messages');
const errorDiv = document.getElementById('error');
let userName = null;

socketClient.on('userConect', () =>{
    if(!userName){
        Swal.fire({
            title: '¡Welcome to chat!',
            text: 'Insert your username here',
            input: 'text',
            inputValidator: (value)=>{
                if(!value){
                    return 'Your username is required'
                }
            }
        }).then((input)=>{
            userName = input.value;
        });
    };
});

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const message = document.getElementById('message').value
    if(!message){
        let error = ''
        error += `<h2>Enter your message</h2>`
        errorDiv.innerHTML = error
        setTimeout(() => {
            error = '';
            errorDiv.innerHTML = error
        }, 2000);
    }else{
        const data = {userName, message}
        socketClient.emit('newMessage', data)
    };
});

const deleteEmit = (msgId) =>{
    socketClient.emit('deleteMsg', msgId)
};

socketClient.on('arrayMsg', (array) =>{
    let messages = '';
    if(array.length > 0){
        array.forEach(p => {
            messages += `
            <div class="card-body">
                <div class="d-flex flex-row align-items-center justify-content-start mb-4">
                <h4 class="p-2">${p.userName}</h4>
                    <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                        <p class="small mb-0">${p.msg}</p>
                    </div>
                    <button id="deleteButton" class="btn btn-unstyled" onclick="deleteEmit('${p._id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
            `;
            messageContainer.innerHTML = messages;
        });
    } else{
        messages += 
        `<p class="text-center">no messages</p>`
        messageContainer.innerHTML = messages;
    };
});