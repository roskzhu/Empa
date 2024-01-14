import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between px-12 py-4 text-2xl bg-transparent fixed top-0 bg-white">
      <Link to="/">
        <h1 className="text-4xl font-semibold gradient-text">empa</h1>
      </Link>
      <ul className="flex p-3 px-8 rounded-full text-black font-regular">
        <Link to="/main">
          <li className="">Try Now</li>
        </Link>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
