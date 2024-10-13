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
                  className="cursor-pointer hover:font-bold"
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
