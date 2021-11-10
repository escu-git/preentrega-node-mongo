const chatSocket = io();
let userName = null;
const userNameTag = document.getElementById('userName');
const userContainer = document.getElementById('userContainer');
const email = document.getElementById('inputUser');
const setUserBtn = document.getElementById('setUser');
const chatBox = document.getElementById('chatBox');
const sendMessageBtn = document.getElementById('sendMessage');
const chatArea = document.getElementById('chatArea');
const userInfoArea = document.getElementById('userInfoArea');
const firstName = document.getElementById('firstName');
const surname = document.getElementById('surname');
const age = document.getElementById('age');
const alias = document.getElementById('alias');
const avatar = document.getElementById('avatar');

email.onkeydown=(event)=>pressEnterToSend(event, setUserName);
setUserBtn.onclick=()=>setUserName();
chatBox.onkeydown=(event)=>pressEnterToSend(event , sendMessage)
sendMessageBtn.onclick=()=>sendMessage();

chatSocket.on('showMessage', data=>{
    const chat = data.map((x)=>{
    let side = x.userId == chatSocket.id ? 'myMsg' : 'otherMsg';
   return( `
    <div class='messageBox ${side}'>
        <div class='messageInfo'>
            <span class='date'>${x.date}</span>
            <span class='userTag'>${x.user.surname}, ${x.user.name}:</span>
        </div>
        <div class='messageText'>
            <span>${x.msg}</span>
        </div>
    </div>
    `)}
    ).join(' ')

    chatArea.innerHTML=chat;
    chatArea.scrollTop = chatArea.scrollHeight;
})
const data = [alias, age, surname, firstName, email, avatar];

function setUserName(){
    if(data.includes("")){
        alert('faltan datos');
        return
    }else{
        userNameTag.classList.add('userName')
        userName=email.value;
        userContainer.style.cssText='transition:1.5s; height:0px'
        setTimeout(()=>{
            userNameTag.innerHTML=`Welcome to chat: ${userName}`
            userContainer.remove(userInfoArea)
        },1500)
    }
}

function sendMessage(){
    if(userName == null){
        sendMessage.onclick= alert('Set your username to send messages')
        return
    }
    else{
        if(chatBox.value == ""){
            alert('No message');
            return
        }
        else{
            const messageInfo = {msg:chatBox.value, email:email.value,name:firstName.value, surname:surname.value, alias:alias.value, age:age.value, avatar:avatar.value}
            chatSocket.emit('newMessage', messageInfo);
            chatBox.value="";
        }
    }
};

function pressEnterToSend(event, fn){
    if(event.keyCode == 13){
        fn()
    }else{
        return
    }
}





