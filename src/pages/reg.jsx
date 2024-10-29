import React, { useState } from 'react'

import { MdOutlineMailOutline } from 'react-icons/md';
import { FaFacebookF, FaGithub, FaLock, FaTwitter } from 'react-icons/fa6';
import { FaUserAlt } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Reg = () => {
  const Navigate = useNavigate()
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

      const submit = async()=>{
  
if(formData.repeatPassword == formData.password){
  try {
  const { Name, email, password } = formData;
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { Name, email, password }); // Adjust API endpoint if needed
 if(response.status==200){
  Navigate('/login')
}else{

  setMessage(response.data.message) 
}
} catch (error) {
 
  setMessage(error.response.data.message);
  
    
  }

}else{
  setMessage("repeatpassword password not match password")
}


      }
  return (      
    <div className='flex justify-center overflow-hidden h-screen'>
    <div className='h-full'>

      <div className= 'hidden xl:block  relative right-10 bottom-[20%] w-[50vw]  bg-gradient-to-r from-amber-500 to-orange-600  h-[150vh] rounded-e-[50%] '>
        <span className='text-3xl relative top-[27rem] font-bold left-22 text-white'>Welcome to  Calendar App !!</span>
      </div>
    </div>
    <div className='grid justify-center  xl:w-[50vw] items-center  '>
      
      <div className=' justify-items-center grid  items-center'>
      <img src="/avatar.jpg" width="100" height="100" alt='user icon'/>
      <span className='m-2 mb-4 text-gray-500 text-base'>Register below to get started</span>
<form className='grid justify-between justify-items-center'  onSubmit={(e)=>{e.preventDefault(); submit()}}>
<div  className='relative'>
  <FaUserAlt  className='top-3 left-3 absolute text-xl text-orange-500'/>
 
  <input type='text' required  name='Name' onChange={handleChange} className=' p-3 pl-12 bg-gray-200 mb-4  w-64 text-sm rounded-3xl '  placeholder="Name"></input>
  </div>
 <div  className='relative'>
  <MdOutlineMailOutline className='top-3 left-3 absolute text-xl text-orange-500'/>
 
  <input type='email' required name='email' onChange={handleChange}  className=' p-3 pl-12 bg-gray-200 mb-4  w-64 text-sm rounded-3xl '  placeholder="Email Address"></input>
  </div>
 <div className='relative'> <FaLock className='top-3 left-3 absolute text-xl text-orange-500' />
  <input type='Password' required name="password"  onChange={handleChange} className='bg-gray-200 p-3 pl-12 mb-4  w-64 text-sm  rounded-3xl'             placeholder="Password"></input>
  </div>
  <div className='relative'> <FaLock className='top-3 left-3 absolute text-xl text-orange-500' />
  <input type='text' required name='repeatPassword' onChange={handleChange}  className='bg-gray-200 p-3 pl-12 mb-4  w-64 text-sm  rounded-3xl'             placeholder="Repeat Password"></input>
  </div>
  {message!=""?(<>{message}</>):(<>{message}</>)}
<button  className='mt-1 mb-1 px-16 py-3 bg-gradient-to-r from-amber-500  to-orange-600 hover:from-orange-600 hover:to-amber-500 rounded-3xl  text-white'>Register</button>

</form>
<p className="  mb-20 mt-1 text-center text-gray-500 leading-7">
Already have an account ? <a href="/login" className="text-orange-500"> Login here</a>
          </p>
<div className='fixed bottom-3 '>
          <p className='text-center text-gray-500 mb-3'>
Or Sign Up Using
</p>

<div className='flex w-[15rem] justify-evenly' onClick={()=>{setMessage("currenlty this function is not available")}}>
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

export default Reg      