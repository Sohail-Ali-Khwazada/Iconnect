import useToken from "../zustand/useToken";
import MessageDisplay from "./MessageDisplay"
import Sidebar from "./Sidebar"


function Home() {
  const {authToken} = useToken();
  // console.log(authToken);
  return (
    <div className="main-wrapper flex w-screen h-screen overflow-hidden bg-[#1F2023]">
        <Sidebar />
        <MessageDisplay />
    </div>
  )
}

export default Home;





