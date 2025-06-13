import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import useToken from "../zustand/useToken";


function useGetMessages() {
 
  const [loading,setLoading] = useState(false);
  const {messages,setMessages,selectedConversation}= useConversation();
  const {authToken} = useToken();

  useEffect(() => {
    const getMessages = async() => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/messages/${selectedConversation._id}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          }
        });
        const data = await res.json();
        if(data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    if(selectedConversation?._id) getMessages();
  },[selectedConversation?._id])
  return {messages,loading};
}

export default useGetMessages
