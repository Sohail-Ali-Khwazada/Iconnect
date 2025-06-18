import { useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "../../context/SocketContext";
import { useGlobalContext } from "../../context/GlobalContext";


function Messageinput() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);
  const {loading,sendMessage} = useSendMessage();
  const {socket} = useSocketContext();
  const {authUser,selectedConversation} = useGlobalContext();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!message) return;
    setIsTyping(false);
    //send the stopping event
    socket.emit("stopTyping",{
        from : authUser._id,
        to : selectedConversation._id,
    });

    await sendMessage(message);
    setMessage("");
  }

  const handleTyping = async(e) => {
    setMessage(e.target.value);
    
    if(!isTyping) {
      setIsTyping(true);
      //send the event
      socket.emit("typing",{
        from : authUser._id,
        to : selectedConversation._id,
      });
    }
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(()=> {
      setIsTyping(false);
      //send the stopping event
      socket.emit("stopTyping",{
        from : authUser._id,
        to : selectedConversation._id,
      });
    },1000);
  }

  return (
  <form className="px-4 py-2" onSubmit={handleSubmit}>
    <div className="w-full relative">
      <input 
      type="text" 
      value={message}
      onChange={handleTyping}
      className="border text-sm rounded-lg p-3 input-accent w-full input-bordered outline-none"
      placeholder="Send a message"
      />
      <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3 hover:text-[#57A7B0]">
        {loading ? <div className="loading loading-spinner"></div> : <IoMdSend />}
      </button>
    </div>
  </form>
  )
}

export default Messageinput

