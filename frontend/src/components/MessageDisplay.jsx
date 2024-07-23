import Messages from "./Messages";
import Messageinput from "./Messageinput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { IoMdArrowRoundBack } from "react-icons/io";




function MessageDisplay() {
  const {selectedConversation, setSelectedConversation} = useConversation();

  useEffect(()=> {

    return ()=> setSelectedConversation(null);
  },[]);

  return (
    <div className={`md:flex md:flex-col md:w-3/4 border border-black w-screen ${!selectedConversation && "hidden"}`}>
      {!selectedConversation ? <NoChatSelected /> :<><div className="bg-[#444C51] px-4 py-2 mb-2 flex items-center relative">
        <span className="label-text">To: </span>
        <span className="font-bold">{selectedConversation.fullName}</span>
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
  const {authUser} = useAuthContext();
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


