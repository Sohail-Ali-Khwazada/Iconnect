import { createContext,useContext,useEffect,useState } from "react";
import { loadPrivateKey } from "../db/keyStore";


export const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
}

export const GlobalContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
  const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("jwt")) || null);
  const [privateKey, setPrivateKey] = useState(null);
  const [sharedKey, setsharedKey] = useState(null);
  const [selectedConversation,setSelectedConversation] = useState(null);
  const [messages,setMessages] = useState([]);

useEffect(() => {
  const fetchPrivateKey = async () => {
    if (authUser) {
      const key = await loadPrivateKey(authUser.username);
      setPrivateKey(key);
    }
  };

  fetchPrivateKey();
}, [authUser]);
  
  return <GlobalContext.Provider value={{authUser,setAuthUser,authToken,setAuthToken,privateKey,sharedKey,setsharedKey,selectedConversation,setSelectedConversation,messages,setMessages}}>
    {children}
    </GlobalContext.Provider>;
}