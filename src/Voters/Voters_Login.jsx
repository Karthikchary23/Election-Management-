import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Voter_Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    axios.post("http://localhost:5000/voterslogin", data)
      .then((response) => {
        localStorage.setItem('voterName', response.data.voter.name);
        // localStorage.setItem('votedState', response.data.voter.votedCandidates);
        localStorage.setItem('aadhar', response.data.voter.aadhar_number);




       
        reset();
        navigate("/voterhomepage");
      })
      .catch(error => {
        console.error('There was an error logging in', error);
        alert('Invalid email, Aadhar number, or password');
      });
  };

  return (
    
    <div className=" lg:px-8 absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className=" flex min-h-full flex-1 flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="/pika.jpg"
          src="https://ih1.redbubble.net/image.4967388858.9480/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
          className="mx-auto h-20 w-auto rounded-full"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white ">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                {...register("email_voter", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
                placeholder="Email"
                className="block w-full  px-3 py-2 rounded-md border-0  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email_voter && (
                <div className="text-red-700">
                  {errors.email_voter.message}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="aadhar_number"
              className="block text-sm font-medium leading-6 text-white"
            >
              Aadhar Number
            </label>
            <div className="mt-2">
              <input
                {...register("aadhar_number", {
                  required: "Aadhar number is required",
                  pattern: {
                    value: /^[0-9]{12}$/,
                    message: "Aadhar number must be 12 digits",
                  },
                })}
                placeholder="Aadhar number"
                type="text"
                className="block w-full rounded-md border-0 px-3 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.aadhar_number && (
                <div className="text-red-700">
                  {errors.aadhar_number.message}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Password"
                type="password"
                className="block w-full rounded-md border-0 px-3 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && (
                <div className="text-red-700">{errors.password.message}</div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}