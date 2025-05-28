// components/Navbar.js
import Link from 'next/link';
import './Navbar.css';
import { useContext } from 'react';

import { useRouter } from "next/navigation";
import { storeContext } from '../../app/(auth)/AuthContext';


export default function Navbar() {
  const router = useRouter();
  const {authorization,setAuthorization,successMsg} = useContext(storeContext);

  const handleLogout = ()=>{
    localStorage.removeItem("auth");
    setAuthorization(false);
    router.push("/sign-up");  
    return successMsg("Logout Successful")
  }
  return (
    <nav className="navbar2 bg-transparent bg-gradient-to-br from-black via-zinc-800 to-black text-white overflow-hidden">
      <Link href='/'><div className="navbarLeft cursor-pointer">⚖️ CIVAI</div></Link>
      
      <div className="navbarCenter">
        <Link href="/rights">Rights</Link>
        <Link href="/duties">Duties</Link>
        <a href="#hot-news z-50">Recent Cases</a>
      </div>
     {!authorization && <div className="flex gap-6 overflow-hidden"> 
        <Link href="/sign-up" className='w-24 h-10 bg-[rgba(95,94,94,0.742)] backdrop-blur-3xl  font-bold flex justify-center items-center rounded-xl hover:scale-105 z-30 shadow-lg shadow-gray-900'>SignUp</Link>
        <Link href="/login" className='w-24 h-10 bg-[rgba(95,94,94,0.742)] flex font-bold justify-center items-center rounded-xl cursor-pointer hover:scale-105 z-30 shadow-lg shadow-gray-900'>LogIn</Link>
      </div>}
     {authorization  &&  <button onClick={handleLogout}  className='w-24 h-10 bg-[rgba(95,94,94,0.742)] backdrop-blur-3xl  font-bold flex justify-center items-center rounded-xl hover:scale-105 z-30 shadow-lg shadow-gray-900'>Logout</button>}
    </nav>
  );
}
