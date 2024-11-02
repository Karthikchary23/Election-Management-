import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Voter_Login() {
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      // Check if the email exists
      const findMailResponse = await axios.post("http://localhost:5000/findmail", { email });
      console.log("Mail found");

      // Send OTP if email is found
      const sendOtpResponse = await axios.post("http://localhost:5000/send-otp", { email });

      toast.success("OTP sent", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setOtpSent(true); // Set OTP sent status
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Mail not found", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        console.error("Error sending OTP:", error.response || error.message);
        toast.error("Failed to send OTP", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  

  const onSubmit = async (data) => {
    // Check if OTP is already verified
    if (!verified) {
      // Verify OTP first
      try {
        const verifyOtpResponse = await axios.post("http://localhost:5000/verify-otp", { email, otp });
        
        setVerified(true); // Set OTP as verified
  
      } catch (error) {
        toast.error("Invalid OTP", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        return; // Stop the login process if OTP verification fails
      }
    }
  
    // Proceed with login after OTP is verified
    try {
      const response = await axios.post("http://localhost:5000/voterslogin", data);
      localStorage.setItem('voterName', response.data.voter.name);
      localStorage.setItem('aadhar', response.data.voter.aadhar_number);
  
      reset();
      navigate("/voterhomepage"); // Redirect to the homepage
    } catch (error) {
      console.error('There was an error logging in', error);
      toast.error('Invalid email, Aadhar number, or password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <div className="lg:px-8 absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className="flex min-h-full flex-1 flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="/pika.jpg"
              src="https://ih1.redbubble.net/image.4967388858.9480/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
              className="mx-auto h-20 w-auto rounded-full"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setValue("email", e.target.value);
                    }}
                    placeholder="Email"
                    className="block w-full px-3 py-2 rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email_voter && (
                    <div className="text-red-700">{errors.email_voter.message}</div>
                  )}
                </div>
              </div>

              {/* Aadhar and Password inputs omitted for brevity */}
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
                <label className="block mb-2 text-sm font-medium text-white" htmlFor="otp">
                  OTP
                </label>
                <div className="flex gap-3">
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    placeholder="Enter OTP"
                    className="w-64 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-32 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Send OTP
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
