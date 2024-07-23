import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Login() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const {loading, login} = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username,password);
    navigate("/home");
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen p-4 bg-[#18191B]">
      <div className="md:w-1/3 border-2 border-[#6F4DF7] rounded-xl p-6">
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login <span className='text-blue-500'> iConnect</span>
        </h1>

        <form  onSubmit={handleSubmit}>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input 
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='johndoe' 
            className='w-full input input-bordered h-10' />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
            />
          </div>

          <div className="flex gap-2 items-center mt-2 mb-2">
            <p className='text-sm'>Don't have an account?</p>
            <Link className='text-sm hover:underline hover:text-blue-600' to='/'>
              Signup
            </Link>
          </div>

          <div className="mt-4">
            <button className='btn btn-block btn-sm mt-2 border border-slate-700 hover:bg-[#3E3F47]'
            disabled={loading}
            >{loading ? <span className="loading loading-spinner"></span>: "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
