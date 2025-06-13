import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import useToken from "../zustand/useToken";



function useGetConversations() {
  const [loading,setLoading] = useState();
  const [conversations,setConversations] = useState([]);


  const {authToken} = useToken();
  

  useEffect(() => {
    
    const getConversations = async() => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          }
        });
        const data = await res.json();
        if(data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch(error) {
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
    }
    getConversations();
  },[]);
  return {loading,conversations};
};

export default useGetConversations;
