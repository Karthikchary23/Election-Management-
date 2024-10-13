import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Admin_add() {
  // Call useForm inside the component
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // Define onSubmit function
  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/addadmindata", data)
      .then((response) => {
        console.log(response.data);
        reset();
        toast.success('Admin added successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          }); // Success alert
        // Clear the form fields after submitting
      })
      .catch((error) => {
        if (error.response && error.response.status === 600) {
          toast.warning('Admin already exist1', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            }); // Show alert if user exists
         } else {
          toast.warning('Admin already exist', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            }); // General error alert
        }
      });
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
    <div className=" text-white min-h-screen flex  justify-center absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className=" border-white border-[2px] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Admin</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-100"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("Admin_mail", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid",
                },
              })}
              placeholder="Email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            />
            {errors.email && (
              <div className="text-red-700">{errors.email.message}</div>
            )}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-100"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("Admin_password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must contain at least 8 characters",
                },
              })}
              placeholder="Password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            />
            {errors.password && <div className="text-red-700">{errors.password.message}</div>}
          </div>
          <button
            type="submit"
            className="w-full   text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Admin_add;
