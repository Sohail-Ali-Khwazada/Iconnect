import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

import useToken from "../zustand/useToken";



function useLogin() {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const {setAuthToken} = useToken();

  const login = async(username,password) => {
    const success = handleInputErrors(username,password);

    if(!success) return false;
    setLoading(true);

    try{
      const res = await fetch("https://my-chat-app-6xac.onrender.com/api/auth/login",{
        method: "Post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({username,password}),
        credentials: 'include'
      });
      // const res = await fetch("http://localhost:5000/api/auth/login",{
      //   method: "Post",
      //   headers: {"Content-Type" : "application/json"},
      //   body: JSON.stringify({username,password}),
      //   credentials: 'include'
      // });
      const data = await res.json();
      if(data.error) {
        throw new Error(data.error);
      }
      const { token, ...userdata } = data;
      localStorage.setItem("chat-user", JSON.stringify(userdata));
      setAuthUser(userdata);
      setAuthToken(token);

      return true;

    } catch(error){
      toast.error(error.message);
      return false;
    }finally{
      setLoading(false);
    }
  }

  return{loading,login};

}

export default useLogin;

function handleInputErrors(username,password) {
  if(!username || !password) {
    toast.error("Please fill in all the fields")
    return false;
  }

  if(password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
