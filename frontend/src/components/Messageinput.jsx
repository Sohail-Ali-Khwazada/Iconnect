import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../hooks/useSendMessage";


function Messageinput() {
  const [message, setMessage] = useState("");
  const {loading,sendMessage} = useSendMessage();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  }

  return (
  <form className="px-4 py-2" onSubmit={handleSubmit}>
    <div className="w-full relative">
      <input 
      type="text" 
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="border text-sm rounded-lg p-3 input-accent w-full input-bordered outline-none"
      placeholder="Send a message"
      />
      <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3 hover:text-[#57A7B0]">
        {loading ? <div className="loading loading-spinner"></div> : <IoMdSend />}
      </button>
    </div>
  </form>
  )
}

export default Messageinput

