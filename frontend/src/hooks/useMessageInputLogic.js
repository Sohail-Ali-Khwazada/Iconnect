import { useState, useRef } from "react";
import useSendMessage from "./useSendMessage";
import { useSocketContext } from "../context/SocketContext";
import { useGlobalContext } from "../context/GlobalContext";

const useMessageInputLogic = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);
  const { loading, sendMessage } = useSendMessage();
  const { socket } = useSocketContext();
  const { authUser, selectedConversation } = useGlobalContext();

  const handleTypingChange = (e) => {
    setMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", {
        from: authUser._id,
        to: selectedConversation._id,
      });
    }

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("stopTyping", {
        from: authUser._id,
        to: selectedConversation._id,
      });
    }, 1000);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    setIsTyping(false);
    socket.emit("stopTyping", {
      from: authUser._id,
      to: selectedConversation._id,
    });

    await sendMessage(message);
    setMessage("");
  };

  return {
    message,
    loading,
    handleTypingChange,
    handleSubmit,
  };
};

export default useMessageInputLogic;
