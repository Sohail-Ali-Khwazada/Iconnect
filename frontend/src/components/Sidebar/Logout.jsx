import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";


function Logout() {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto">
      {loading ? <span className="loading loading-spinner"></span> : <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout} />}
    </div>
  )
}

export default Logout
