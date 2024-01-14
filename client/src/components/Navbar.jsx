import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between px-12 py-7 text-2xl bg-transparent fixed top-0 bg-white"> 
    <div className="flex">
      <Link to="/"> 
        <h1 className="text-4xl gradient-text font-extrabold ">empa</h1>
      </Link> 
      <span className=" pt-2 font-medium text-black/80">
        <span className="px-6">↔</span> 
        Decoding Emotions
      </span>
      </div>
      <div className="flex font-medium text-black/70">
        <span className="pt-4 px-8">
      Github Devpost
      </span>
      <ul className="flex p-4 px-8 rounded-full text-white bg-blue-700 font-semibold">
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
