import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";


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
    })
    .catch((error) => {
      console.error("There was an error registering the voter!", error);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
            Aadhar Entry
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="aadhar_number"
            >
              Aadhar Number
            </label>
            <input
              {...register("aadhar_number", {
                required: "Aadhar number is required",
                maxLength: {
                  value: 12,
                  message: "Aadhar number must be 12 digits",
                }
              })}
              placeholder="************"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.aadhar_number && <div>{errors.aadhar_number.message}</div>}
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Aadhar_entry_by_admin;
