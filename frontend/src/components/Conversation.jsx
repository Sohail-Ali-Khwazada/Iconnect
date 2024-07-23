import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation"


function Conversation({conversation}) {
  const {selectedConversation,setSelectedConversation} = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id) ? "online" : "";
  
  return (
    <>
    <div className={`conversation-wrapper flex w-full h-16 relative gap-4 flex-shrink-0  items-center rounded px-6 py-1 cursor-pointer hover:bg-[#4B4D58]
    ${isSelected ? "bg-[#4B4D58]" : ""}`}
    onClick={() => setSelectedConversation(conversation)}
    >

      <div className={`avatar ${isOnline}`}>
        <div className="w-10 rounded-full">
          <img src={conversation.profilePic} />
        </div>
      </div>

      <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
          </div>
      </div>
    </div>
    <div className="divider my-0 py-0 h-1" />
    </>
    
  )
}

export default Conversation
