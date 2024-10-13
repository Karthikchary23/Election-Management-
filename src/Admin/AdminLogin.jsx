import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post('http://localhost:5000/admin_login', data)
      .then(response => {
        console.log(response.data);
        localStorage.setItem('isAdminLoggedIn', 'true'); // Set the login state
        navigate('/adminhomepage'); 
      })
      .catch(error => {
        console.error('There was an error logging in', error);
        alert('Invalid email or password');
      });
  };

  return (
    <div className="min-h-screen flex  justify-center 
        absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]
">
      <div className=" p-8 rounded-lg shadow-lg max-w-md w-full text-black border-white border-2">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-white" htmlFor="Admin_mail">Email</label>
            <input
              {...register('email_admin', {
                required: 'Email is required',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Email is not valid'
                }
              })}
              placeholder="Email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.Admin_mail && <div className="text-red-700">{errors.Admin_mail.message}</div>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white" htmlFor="Admin_password">Password</label>
            <input
              {...register('admin_password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must contain at least 8 characters'
                }
              })}
              placeholder="Password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.Admin_password && <div className="text-red-700">{errors.Admin_password.message}</div>}
          </div>
          <button type="submit" className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
