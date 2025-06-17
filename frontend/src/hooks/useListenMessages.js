import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import { useGlobalContext } from "../context/GlobalContext";


function useListenMessages() {
  const {socket} = useSocketContext();
  const {messages,setMessages} = useGlobalContext();

  useEffect(() => {
    socket?.on("newMessage",(newMessage)=> {
      setMessages([...messages,newMessage]);
    })
    return () => socket?.off("newMessage");
  },[socket,setMessages,messages]);
}

export default useListenMessages
