import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
     const [formData,setformData]=useState({});
     const [error,setError]=useState(false)
     const [loading,setLoading]=useState(false)
     const handlechange=(e:any)=>{
      setformData({...formData,[e.target.id]:e.target.value})
     }
      const navigate=useNavigate();
     const handleSubmit = async (e: any) => {
      e.preventDefault();
     try{
      setLoading(true)
      setError(false)
       const res = await fetch('/api/auth/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
       });
      console.log(formData,"data for logged in")
       const data = await res.json();
       console.log(data,"dsf")
        setLoading(false);
        if(data.success===false){
          setError(true);
          return;
        }       
        navigate('/');
     }catch(err){
      setLoading(false);
      setError(true);
     }
    };
    
      
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Log In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handlechange} />
        <input type="password" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handlechange}/>
      <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Log In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Dont Have an account</p>
        <Link to='/signup'>
        <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-500'>{error && "Something went wrong..!"}</p>
    </div>
  )
}

export default Login