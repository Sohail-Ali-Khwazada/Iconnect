import Messages from "./Messages";
import Messageinput from "./Messageinput";
import { TiMessages } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSocketContext } from "../../context/SocketContext";



function MessageDisplay() {
  const {selectedConversation, setSelectedConversation} = useGlobalContext();
  const {socket} = useSocketContext();
  const [typingStatus, setTypingStatus] = useState(false);



  useEffect(()=> {
  socket?.on("typing", ({ from }) => {
    if (from === selectedConversation?._id) {
      setTypingStatus(true);
      console.log("hello");
    }
  });

  socket?.on("stopTyping", ({ from }) => {
    if (from === selectedConversation?._id) {

      setTypingStatus(false);
      console.log("hello off");
    }
  });

    return ()=> {
      socket?.off("typing");
      socket?.off("stopTyping");
      // setSelectedConversation(null);
    }
  },[selectedConversation]);

  return (
    <div className={`md:flex md:flex-col md:w-3/4 border border-black w-screen ${!selectedConversation && "hidden"}`}>
      {!selectedConversation ? <NoChatSelected /> :<><div className="bg-[#444C51] px-4 py-4 mb-2 flex items-center relative">
        <span className="label-text w-7 rounded-full">          
            <img
              alt="Profile photo"
              src={selectedConversation.profilePic} />
          </span>
        <span className="font-bold ml-2">{selectedConversation.fullName}</span>
        <span className="font-bold ml-2">{typingStatus && "Typing..."}</span>
        <IoMdArrowRoundBack className="absolute right-3 w-8 h-5 cursor-pointer" onClick={()=> setSelectedConversation(null)}/>
      </div>
        <Messages />
        <Messageinput />
      </>
      }
    </div>
  )
}

function NoChatSelected() {
  const {authUser} = useGlobalContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-2 text-gray-200">
        <p>Welcome 👋 {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center"/>
      </div>
    </div>
  );
}

export default MessageDisplay;


