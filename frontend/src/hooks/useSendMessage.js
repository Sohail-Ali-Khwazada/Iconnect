import { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext";

function useSendMessage() {
  const [loading,setLoading] = useState(false);
  const {authToken,messages,setMessages,selectedConversation} = useGlobalContext();

  const sendMessage = async(message) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({message}),
        credentials: 'include'
      })
      const data = await res.json();
      if(data.error) throw new Error(data.error);
      setMessages([...messages,data]);
    }catch(error) {
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }
  return {sendMessage,loading};
}

export default useSendMessage
