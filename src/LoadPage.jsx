import React from 'react';
import { Link } from 'react-router-dom';

function LoadPage() {
  return (
    <div>
      <nav className='bg-gray-800 text-white p-4'>
        <div className='flex justify-between items-center'>
          <div className="logo">
            <h2 className='font-bold text-xl'>Election Management</h2>
          </div>
          <div>
            <ul className='flex flex-row gap-3'>
              <li>
                <Link to="/admin_login" className='cursor-pointer hover:font-bold'>
                  Admin 
                </Link>
              </li>
              <li>
                <Link to="/voter_registration" className='cursor-pointer hover:font-bold'>
                  Voter Register
                </Link>
              </li>
              <li>
                <Link to="/" className='cursor-pointer hover:font-bold'>
                  Voter Login
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  }
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default LoadPage;
