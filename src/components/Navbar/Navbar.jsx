// components/Navbar.js
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar ">
      <Link href='/'><div className="navbarLeft cursor-pointer">⚖️ CIVAI</div></Link>
      
      <div className="navbarCenter">
        <a href="/rights">Rights</a>
        <a href="/duties">Duties</a>
        <a href="#hot-news z-50">Recent Cases</a>
      </div>
      <div className="flex gap-6"> 
        <a href="#signin" className='w-24 h-10 bg-[rgba(95,94,94,0.742)] backdrop-blur-3xl  font-bold flex justify-center items-center rounded-xl hover:scale-105 z-30 shadow-lg shadow-gray-900'>SignIn</a>
        <a href="#signup" className='w-24 h-10 bg-[rgba(95,94,94,0.742)] flex font-bold justify-center items-center rounded-xl cursor-pointer hover:scale-105 z-30 shadow-lg shadow-gray-900'>SignUp</a>
      </div>
    </nav>
  );
}
