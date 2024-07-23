import useGetConversations from "../hooks/useGetConversations"
import Conversation from "./Conversation"


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

export default Conversations
