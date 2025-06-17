import { useGlobalContext } from "../context/GlobalContext";
import Conversations from "./Conversations";
import Logout from "./Logout";
import Search from "./Search";

function Sidebar() {
  const {selectedConversation} = useGlobalContext();
  return (
    <div className={`md:w-1/4  border-r border-slate-500 p-4 md:flex md:flex-col w-full h-full ${selectedConversation ? "hidden" : ""}`}>
      <Search />
      <Conversations />
      <Logout />
    </div>
  )
}

export default Sidebar




