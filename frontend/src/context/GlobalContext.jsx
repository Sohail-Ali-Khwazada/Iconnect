import { createContext,useContext,useState } from "react";


export const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
}

export const GlobalContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
  const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("jwt")) || null);
  
  const [selectedConversation,setSelectedConversation] = useState(null);
  const [messages,setMessages] = useState([]);
  
  return <GlobalContext.Provider value={{authUser,setAuthUser,authToken,setAuthToken,selectedConversation,setSelectedConversation,messages,setMessages}}>
    {children}
    </GlobalContext.Provider>;
}