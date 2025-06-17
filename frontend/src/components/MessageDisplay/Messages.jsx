import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages"
import Message from "./Message"
import useListenMessages from "../../hooks/useListenMessages";


function Messages() {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();


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


function MessageSkeleton() {
  return (
    <>
      <div className='flex gap-3 items-center'>
        <div className='skeleton w-10 h-10 rounded-full shrink-0 border border-gray-700'></div>
        <div className='flex flex-col gap-1'>
          <div className='skeleton h-4 w-40 border border-gray-700'></div>
          <div className='skeleton h-4 w-40 border border-gray-700'></div>
        </div>
      </div>
      <div className='flex gap-3 items-center justify-end'>
        <div className='flex flex-col gap-1'>
          <div className='skeleton h-4 w-40 border border-gray-700'></div>
        </div>
        <div className='skeleton w-10 h-10 rounded-full shrink-0 border border-gray-700'></div>
      </div>
    </>
  );
};


export default Messages


