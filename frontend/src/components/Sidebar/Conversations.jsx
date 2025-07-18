import useGetConversations from "../../hooks/useGetConversations";
import { useSocketContext } from "../../context/SocketContext";
import { useGlobalContext } from "../../context/GlobalContext";
import { generateSharedKey } from "../../utils/E2EE";


function Conversations() {
  const {loading,conversations} = useGetConversations();
  return (
    <div className="h-[84.5vh] flex flex-col overflow-y-auto">

      {conversations.map((conversation) => 
        <Conversation key={conversation._id} conversation={conversation}/>
      )}

    {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

function Conversation({conversation}) {
  const {selectedConversation,setSelectedConversation,setsharedKey,privateKey} = useGlobalContext();
  const isSelected = selectedConversation?._id === conversation._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id) ? "online" : "";

  const handleSelection = async() => {
    setSelectedConversation(conversation);
    const { sharedKey } = await generateSharedKey(privateKey,conversation.publicKey);
    setsharedKey(sharedKey);
  }
  
  return (
    <>
    <div className={`conversation-wrapper flex w-full h-16 relative gap-4 flex-shrink-0  items-center rounded px-6 py-1 cursor-pointer hover:bg-[#4B4D58]
    ${isSelected ? "bg-[#4B4D58]" : ""}`}
    onClick={handleSelection}
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

export default Conversations;
