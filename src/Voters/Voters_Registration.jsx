import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const[verified,setVerified]=useState(false)

  
  const handleSendOtp = async () => {
    
    if (!email) {
      // setMessage("Please enter an email address");
      return  toast.warn("Please enter an email address", {
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

    const emailPattern = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
    if (!emailPattern.test(email)) {
      // setMessage("Please enter a valid email address");
     
      return   toast.warn("Please enter a valid email address", {
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

    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        email,
      });
      // setMessage(response.data.message);
      toast.success(response.data.message, {
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

      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error.response || error.message);
      // setMessage("Failed to send OTP");
      
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
  };
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp,
      });
      // setMessage(response.data.message);

      toast.success(response.data.message, {
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
      setVerified(true)
    } catch (error) {
      // setMessage("Invalid OTP");
      toast.warn("Invalid OTP", {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/register", data)
      .then((response) => {
        // console.log(response.data);
        reset(); // Clear the form fields after submitting
        toast.success("Registration successfully completed", {
          position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.warn("Email or aadhar or mobile number already exist", {
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
        } else if (error.response && error.response.status === 502) {
          toast.error("Aadhar not found", {
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
          toast.error("Server issue", {
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
      });
  };
  const handleFormSubmit = (data) => {
    console.log(verified)
    if (verified) {
      onSubmit(data);
    } else {
      alert("Please verify the OTP");
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

      <div className="flex items-center justify-center inset-0 -z-10 h-full w-full px-5 py-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className="border-white border-2 p-8 rounded-lg shadow-lg max-w-md w-full text-black ">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Voter Registration
          </h2>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="name"
              >
                Name
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Name must contain at least 5 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Name can contain up to 20 characters only",
                  },
                })}
                placeholder="Name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.name && (
                <div className="text-red-700">{errors.name.message}</div>
              )}
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
                onChange={(e) => {
                  setEmail(e.target.value); // Update state
                  // Also notify react-hook-form about the value change
                  setValue("email", e.target.value);
                }}
                value={email} // Make sure to control the value of the input
                placeholder="Email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.email && (
                <div className="text-red-700">{errors.email.message}</div>
              )}
            </div>
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-32 mt-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Get OTP
            </button>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                placeholder="Phone"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.phone && (
                <div className="text-red-700">{errors.phone.message}</div>
              )}
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="address"
              >
                Mandal
              </label>
              <input
                {...register("address", { required: "Address is required" })}
                placeholder="Mandal"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.address && (
                <div className="text-red-700">{errors.address.message}</div>
              )}
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="aadhar_number"
              >
                Aadhar number
              </label>
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
                className="w-full px-5 py-2 border border-gray-300 rounded-md "
              />
              {errors.aadhar_number && (
                <div className="text-red-700">
                  {errors.aadhar_number.message}
                </div>
              )}
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must contain at least 8 characters",
                  },
                })}
                placeholder="Password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.password && (
                <div className="text-red-700">{errors.password.message}</div>
              )}
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="Confirm Password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.confirmPassword && (
                <div className="text-red-700">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <div>
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="otp"
              >
                OTP
              </label>
              <div className="flex gap-3 ">
                <div>
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-32 mt-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Verify OTP
                </button>
              </div>
            </div>

            <button
              type="submit"
              
              className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Register
            </button>
          </form>
          {message && (
            <div className="mt-4 text-center text-red-500">{message}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
