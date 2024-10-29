
import axios from 'axios'
import React, { useState } from 'react'
import { FaFacebookF, FaGithub, FaLock, FaTwitter } from 'react-icons/fa6'

import { GrGoogle } from 'react-icons/gr'
import { MdOutlineMailOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const Navigate = useNavigate()
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

      const submit = async()=>{
  

  try {
  const { email, password } = formData;
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {email, password }); // Adjust API endpoint if needed
  if(response.status ==200){
    localStorage.setItem("token",response.data.data.token);
    Navigate('/')
  }else{
  setMessage(response.data.message) 
  }
} catch (error) {
    
  setMessage(error.response.data.message);
  }


}

  return (
    <div className='flex justify-center overflow-hidden h-screen'>
    <div className='h-full'>

      <div className= 'hidden xl:block  relative right-10 bottom-[20%] w-[50vw]  bg-gradient-to-r from-amber-500 to-orange-600  h-[150vh] rounded-e-[50%] '>
        <span className='text-3xl relative top-[27rem] font-bold left-30 text-white'>Welcome back to  Calendar App !</span>
      </div>
    </div>
    <div className='grid justify-center  xl:w-[50vw] items-center '>
      
      <div className=' justify-items-center grid items-center'>
      <img src="/avatar.jpg" width="100" height="100" alt='user icon'/>
      <span className='m-2 mb-4 text-gray-500 text-base'>Login below to get started</span>
<form className='grid justify-between justify-items-center' onSubmit={(e)=>{e.preventDefault(); submit()}}>
 <div  className='relative'>
  <MdOutlineMailOutline className='top-3 left-3 absolute text-xl text-orange-500'/>
 
  <input name='email' required onChange={handleChange} type='email' className=' p-3 pl-12 bg-gray-200 mb-4  w-64 text-sm rounded-3xl '  placeholder="Email Address"></input>
  </div>
 <div className='relative'> <FaLock className='top-3 left-3 absolute text-xl text-orange-500' />
  <input required name='password' type='Password' onChange={handleChange}  className='bg-gray-200 p-3 pl-12 mb-4  w-64 text-sm  rounded-3xl'             placeholder="Password"></input>
  </div>
  {message!=""?(<>{message}</>):(<>{message}</>)}
<button className='mt-5 px-16 py-3 bg-gradient-to-r from-amber-500  to-orange-600 hover:from-orange-600 hover:to-amber-500 rounded-3xl  text-white'>Login</button>
</form>

<p className="mt-4  text-center text-gray-500 leading-7">
<a href="#" className="text-orange-500">
Forgot password </a>
<br></br>
 New user? <a href="/reg" className="text-orange-500">Register</a>
          </p>
          <div className='fixed bottom-3'>
          <p className='text-center text-gray-500 mb-3'>
Or Sign Up Using
</p>

<div className='flex w-[15rem] justify-evenly' onClick={()=>setMessage("currenlty this function is not available")}>
<button className='bg-orange-500 text-white rounded-full  w-10 h-10 justify-center items-center flex'>
<GrGoogle  />
</button>
<button className='bg-orange-500 text-white rounded-full  w-10 h-10 justify-center items-center flex'>
<FaTwitter/>
</button>
<button className='bg-orange-500 text-white rounded-full  w-10 h-10 justify-center items-center flex'>
<FaGithub/>
</button>

<button className='bg-orange-500 text-white rounded-full  w-10 h-10 justify-center items-center flex'>
<FaFacebookF />
</button>
</div>

</div>
    </div>
    </div>
    </div>
  )
}

export default Login