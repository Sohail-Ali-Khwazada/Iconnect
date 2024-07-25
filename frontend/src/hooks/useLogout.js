import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import useToken from "../zustand/useToken";
// import { useNavigate } from "react-router-dom";


function useLogout() {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const {setAuthToken} = useToken();
  // const navigate = useNavigate();

  const logout = async() => {
    setLoading(true);
    try {
      // const res = await fetch("http://localhost:5000/api/auth/logout", {
      const res = await fetch("https://my-chat-app-6xac.onrender.com/api/auth/logout", {
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
      // navigate("/login");
    } catch(error) {
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }
  return {loading,logout};
}

export default useLogout
