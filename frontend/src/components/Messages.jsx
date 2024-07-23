import { useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetMessages"
import Message from "./Message"
import MessageSkeleton from "./MessageSkeleton";
import useListenMessages from "../hooks/useListenMessages";


function Messages() {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  console.log(messages);
  useEffect(()=>{
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
    },100)
  },[messages])
  return (
    <div className="overflow-y-auto px-4 h-[83%] ">
      {loading && (
        <>
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </>
      )}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">Send a message to start the conversation</p>
      )}

      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
        <Message message={message} />
        </div>
      ))}
    </div>
  )
}

export default Messages


