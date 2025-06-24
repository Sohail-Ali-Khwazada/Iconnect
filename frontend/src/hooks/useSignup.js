import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/GlobalContext";




function useSignup() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser,setAuthToken } = useGlobalContext();


  const signup = async ({ fullName, username, password, confirmPassword, gender, publicKey }) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender, publicKey});

    if (!success) return false;
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/signup`,{
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender,publicKey }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      const { token, ...userdata } = data;
      localStorage.setItem("chat-user", JSON.stringify(userdata));
      localStorage.setItem("jwt", JSON.stringify(token));
      setAuthUser(userdata);
      setAuthToken(token);
      return true;

    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { loading, signup };

}

export default useSignup

function handleInputErrors({ fullName, username, password, confirmPassword, gender, publicKey }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the fields")
    return false;
  }
  if (password != confirmPassword) {
    toast.error("Password do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  if (!publicKey || publicKey.length == 0) {
    // toast.error("Error generating unique identifier");
    return false;
  }

  return true;
}
