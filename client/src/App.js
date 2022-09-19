import './App.css';
import io from 'socket.io-client'
import {useState} from "react"
import './App'
import Chat from './Chat'

const socket = io.connect('https://projectchatserver1234.herokuapp.com')

function App() {

  const [username, setusername] = useState("");
  const [room, setroom] = useState("")
  const [showchat, setchat] = useState(false)

  const joinRoom = () => {
    if(username !== "" && room !== ""){
       socket.emit("join_room", room);
       setchat(true)
    }
  }; 
  
  
  return (
    <div className="container">
    {!showchat ? (
    <div  className='joinChatContainer'>
    <div className='chat-header'>
    <h3>Join A Chat</h3>
    </div>
    <div className='inputContainer'>
    <input className='inputN' type="text" placeholder="...Name" onChange = {(event) => {
      setusername(event.target.value);
      }}/>

    <input className='inputR' type="text" placeholder="...Room" onChange = {(event) => {
      setroom(event.target.value);
      }}/>
  
    <button className='joinButton' onClick={joinRoom}>Join a room</button>
    </div>
    </div>
    ) : (
    <Chat 
    Socket={socket} 
    Username ={username}
    Room = {room}/>
    )}
    </div>
  );
};

export default App;