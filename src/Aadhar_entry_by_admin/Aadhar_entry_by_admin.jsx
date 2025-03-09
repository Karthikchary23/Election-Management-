import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Aadhar_entry_by_admin() {
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
    .post("http://localhost:5000/aadharbyadmin", data)
    .then((response) => {
      console.log(response.data);
      reset(); // Clear the form fields after submitting
      toast.success("Aadhar Number added Successfully", {
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
      toast.warn("Aadhar Number Already exist", {
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

    <div className=" text-white min-h-screen flex items-center justify-center absolute inset-0 -z-10 h-full w-full  px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="border-white border-2 p-8 rounded-lg shadow-lg max-w-md w-full text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
            Aadhar Entry
        </h2>
        <div className=" h-1 opacity-10"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-white"
              htmlFor="aadhar_number"
            >
              Aadhar Number
            </label>
            <input
              {...register("aadhar_number", {
                required: "Aadhar number is required",
                minLength: {
                  value: 12,
                  message: "Aadhar number must be 12 digits",
                },
                maxLength: {
                  value: 12,
                  message: "Aadhar number must be 12 digits",
                }
              })}
              placeholder="************"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.aadhar_number && <div className="text-red-700">{errors.aadhar_number.message}</div>}
          </div>
          <button
            type="submit"
            className="w-full py-2text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    
    </>
  );
}

export default Aadhar_entry_by_admin;