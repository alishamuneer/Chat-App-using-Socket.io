import { useEffect,useState } from 'react';
import io from "socket.io-client";


import Home from './components/Home';


function App() {
  const [socket, setSocket] = useState(null)
  const isConnected = localStorage.getItem('isConnected')|| false
  useEffect(()=>{
    setSocket(io.connect("http://localhost:3001"))

    console.log("Trying to change isConencted and Socket Object", isConnected)
    localStorage.setItem("isConnected",true)
  },[isConnected])
  return (
    <div>
      <Home socket={socket}/>
    </div>
  );
}

export default App;
