import useConversation from "../zustand/useConversation";
import Conversations from "./Conversations";
import Logout from "./Logout";
import Search from "./Search";

function Sidebar() {
  const {selectedConversation} = useConversation();
  return (
    <div className={`md:w-1/4  border-r border-slate-500 p-4 md:flex md:flex-col w-full h-full ${selectedConversation ? "hidden" : ""}`}>
      <Search />
      <Conversations />
      <Logout />
    </div>
  )
}

export default Sidebar

// import Conversations from "./Conversations";
// import Logout from "./Logout";
// import Search from "./Search";

// function Sidebar() {
//   return (
//     <div className="flex flex-col h-full">
//       <Search />
//       <Conversations />
//       <Logout />
//     </div>
//   );
// }

// export default Sidebar;


