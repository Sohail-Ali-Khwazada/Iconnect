import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import useToken from "../zustand/useToken";
import { useAuthContext } from "../context/AuthContext";


function useGetConversations() {
  const [loading,setLoading] = useState();
  const [conversations,setConversations] = useState([]);

  const {authToken} = useToken();
  const {authUser} = useAuthContext();

  useEffect(() => {
    const getConversations = async() => {
      setLoading(true);
      try {

        // const res = await fetch("http://localhost:5000/api/users", {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Authorization": `Bearer ${authToken}`
        //   }
        // });
        const res = await fetch("https://my-chat-app-6xac.onrender.com/api/users", {
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
  },[authUser]);
  return {loading,conversations};
};

export default useGetConversations;
