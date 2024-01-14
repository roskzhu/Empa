import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between px-7 py-3 text-lg bg-transparent fixed top-0 bg-white"> 
    <div className="flex">
      <Link to="/"> 
        <h1 className="text-2xl gradient-text font-extrabold ">empa</h1>
      </Link> 
      <span className="pt-1 font-medium text-black/80">
        <span className="px-6">↔</span> 
        Decoding Emotions
      </span>
      </div>
      <div className="flex font-medium text-black/80">
      <Link to="https://github.com/roskzhu/Empa">
        <h1 className="mx-6 pt-3 hover:border-b-2 border-blue-600 hover:text-blue-600">Github</h1>
      </Link>

      <div className="border-[0.5px] mt-3 h-8 border-black/25"></div>
        
      <Link to="https://devpost.com/software/empa">
        <h1 className="mx-6 pt-3 hover:border-b-2 border-blue-600 hover:text-blue-600">Devpost</h1>
      </Link>

      <ul className="flex p-3 px-8 rounded-full text-white bg-blue-600 font-semibold hover-effect">
        <Link to="/main">
          <li className="">Try Now</li>
        </Link>
        {/* Add more navigation items as needed */}
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;
