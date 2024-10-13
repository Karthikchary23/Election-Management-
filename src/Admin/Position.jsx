import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPosition = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/position", { position: data.position })
      .then((response) => {
        console.log("Response:", response.data);
        reset(); 
        // alert("Position admin successful!");// Clear the form fields after submitting
        toast.success("Position added successfully", {
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
        if (error.response && error.response.status === 600) {
          toast.warn("Position already exist", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });}
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
    <div className="min-h-screen flex items-center justify-center absolute inset-0 -z-10 h-full w-full  px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="border-white border-[2px] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-white ">Position</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block mb-2  font-medium text-gray-100 text-lg"
              htmlFor="position"
            >
              Position
            </label>
            <input
              {...register("position", {
                required: "Field is required",
              })}
              placeholder="Position"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.position && <div className="text-red-500 text-sm">{errors.position.message}</div>}
          </div>
          <button
            type="submit"
            className="w-full  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddPosition;