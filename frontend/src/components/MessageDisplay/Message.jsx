import { useGlobalContext } from '../../context/GlobalContext';


function Message({ message }) {
  const { authUser,selectedConversation } = useGlobalContext();

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-[#6D3DF2]" : "";
  const name = fromMe ? authUser.username : selectedConversation?.username;

  const padZero = (number)=> {
    return number.toString().padStart(2, "0");
  }

  const extractTime = (dateString) => {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  }

  const time = extractTime(message.createdAt);

  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Profile photo"
              src={profilePic} />
          </div>
        </div>
        <div className="chat-header">
          {name}
        </div>
        <div className={`chat-bubble ${bubbleBgColor}`}>{message.message}</div>
        <div className="chat-footer opacity-50">{time}</div>
      </div>
    </>
  )
}

export default Message
