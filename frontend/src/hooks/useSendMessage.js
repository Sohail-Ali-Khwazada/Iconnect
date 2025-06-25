import { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext";
import { encryptMessage } from "../utils/E2EE";
import toast from "react-hot-toast";


function useSendMessage() {
  const [loading,setLoading] = useState(false);
  const {authToken,messages,setMessages,selectedConversation,sharedKey} = useGlobalContext();
  

  const sendMessage = async(message) => {
    setLoading(true);
    try {
      const { ciphertext,iv } = await encryptMessage(message,sharedKey);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({message: ciphertext, iv}),
        credentials: 'include'
      })
      const data = await res.json();
      if(data.error) throw new Error(data.error);
      setMessages([...messages,data]);
    }catch(error) {
      toast.error(error.message);
      console.error(error.message);
    } finally{
      setLoading(false);
    }
  }
  return {sendMessage,loading};
}

export default useSendMessage
