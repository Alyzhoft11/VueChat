import React from 'react';
import { Link } from '@reach/router';

function Navbar() {
  return (
    <div>
      <div className="flex items-center justify-between bg-red-900 p-4">
        <Link to="/">
          <div className="text-gray-100 text-2xl">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </Link>
        <button className="text-gray-100 text-2xl mr-2 outline-none hover:text-gray-300 ">Login</button>
      </div>
    </div>
  );
}

export default Navbar;
