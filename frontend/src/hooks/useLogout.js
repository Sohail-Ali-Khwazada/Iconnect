import { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext";



function useLogout() {
  const [loading,setLoading] = useState(false);
  const {setAuthUser,setAuthToken,setSelectedConversation} = useGlobalContext();


  const logout = async() => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/logout`, {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        credentials: 'include'
      })
      const data = await res.json();
      if(data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      localStorage.removeItem("jwt");
      setAuthUser(null);
      setAuthToken(null);
      setSelectedConversation(null);
    } catch(error) {
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }
  return {loading,logout};
}

export default useLogout
