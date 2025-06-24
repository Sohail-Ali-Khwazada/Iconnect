import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import useGenerateKeys from "../hooks/useGenerateKeys";
import { savePrivateKey } from "../db/keyStore";



function Signup() {

  const [inputs,setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const {loading,signup} = useSignup();
  const { generateKeyPair } = useGenerateKeys();
  const navigate = useNavigate();
 



  const handleSubmit = async(e) => {
    e.preventDefault();
    const {privateKeyBase64, publicKeyBase64 } = await generateKeyPair();
    const success = await signup({...inputs,publicKeyBase64});
    if(success) {
      savePrivateKey(inputs.username,privateKeyBase64);
      navigate("/home");
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen p-4 bg-[#18191B]">
      <div className="md:w-1/3 border-2 border-[#6F4DF7] rounded-xl p-6">
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'> iConnect</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input 
            type='text'
            value={inputs.fullName}
            placeholder='John Doe' 
            className='w-full input input-bordered  h-10' 
            onChange={(e) => setInputs({...inputs,fullName: e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input 
            type='text'
            value={inputs.username} 
            placeholder='johndoe' 
            className='w-full input input-bordered h-10'
            onChange={(e) => setInputs({...inputs, username: e.target.value})} 
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              value={inputs.password}
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              value={inputs.confirmPassword}
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              onChange={(e) => setInputs({...inputs,confirmPassword: e.target.value})}
            />
          </div>

          <div className="Gender_box flex gap-2">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text mx-3">Male</span>
                <input 
                type="checkbox" 
                checked={inputs.gender === "male"}
                className="checkbox" 
                onChange={() => setInputs({...inputs,gender: "male"})}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text mx-3">Female</span>
                <input 
                type="checkbox" 
                checked={inputs.gender === "female"}
                className="checkbox" 
                onChange={() => setInputs({...inputs,gender: "female"})}
                />
              </label>
            </div>
          </div>

          <div className="flex gap-2 items-center mt-2 mb-2">
            <p className='text-sm'>Already have an account?</p>
            <Link className='text-sm hover:underline hover:text-blue-600' to='/login'>
              Signin
            </Link>
          </div>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700 hover:bg-[#3E3F47]'
            disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span>: "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Signup







