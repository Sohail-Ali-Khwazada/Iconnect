import MessageDisplay from "../components/MessageDisplay"
import Sidebar from "../components/Sidebar"


function Home() {

  return (
    <div className="main-wrapper flex w-screen h-screen overflow-hidden bg-[#1F2023]">
        <Sidebar />
        <MessageDisplay />
    </div>
  )
}

export default Home;





