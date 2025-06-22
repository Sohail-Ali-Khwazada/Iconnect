import { useEffect, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext";
import { useSocketContext } from "../context/SocketContext";


function useListenTyping() {
    const { selectedConversation } = useGlobalContext();
    const { socket } = useSocketContext();
    const [typingStatus, setTypingStatus] = useState(false);

  useEffect(() => {
    socket?.on("typing", ({ from }) => {
      if (from === selectedConversation?._id) {
        setTypingStatus(true);
      }
    });

    socket?.on("stopTyping", ({ from }) => {
      if (from === selectedConversation?._id) {
        setTypingStatus(false);
      }
    });

    return () => {
      socket?.off("typing");
      socket?.off("stopTyping");
    };
  }, [selectedConversation]);

  return {typingStatus};
}

export default useListenTyping;
