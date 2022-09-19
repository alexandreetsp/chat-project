import {React, useState, useEffect} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';


function Chat({Socket, Username, Room}) {
    
    const [currentmensage, setcurrentmensagem] = useState("");
    const [messagechat, setmessagechat] = useState([""])

    const sendmessage = async () => {
       if(currentmensage !== ""){
        const datamessage = {
            room: Room,
            Autor: Username,
            message: currentmensage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getHours(),
        };
        await Socket.emit("send_message", datamessage);
        setmessagechat((list) => [...list, datamessage]);
        setcurrentmensagem('');
       };
       
    };

    useEffect(() => {
        return function cleanup(){
            Socket.on("receive_message", (data)=>{
                setmessagechat((list)=>{
                 return [...list, data]
                });
            });
        }
    }, [Socket]);

    return (
        <div className='container'>
        <div className='chat-window'>
        <div className='chat-header'>
            <p>LIVE CHAT</p>
        </div>
        <div className='room-header'>
            <p>Nome Da Sala:   {Room}</p>
        </div>
    <ScrollToBottom className='message-container'>
        <div className='chat-body'>
        <div className='middle'>
            {messagechat.map((men)=>{
            //retorna o objeto somente se ele não estiver vazio
            if(men !== ""){
             return <div  className='message' id = {Username === men.Autor ? 'you' : 'other'}> 
             <div>
             <div className="message-content">
                    <p>{men.message}</p>     
            </div>
            <div className='message-meta'>
                <p id='time'>{men.Autor}</p>
                <p id='author'>{men.time}</p>
               </div>
            </div>    
            </div>
            } else {
                return ("");
            }}
            )}
            
            </div>
        </div>
        </ScrollToBottom>
        <div className='chat-footer'>
            <input value={currentmensage} type="text" placeholder="..hey" 
            onChange = {(event) => {
             setcurrentmensagem(event.target.value);
            }}/>
             <button onClick={sendmessage}>SEND</button>
           
        </div>
        </div>
        </div>
    );
};

export default Chat;
