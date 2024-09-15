import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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
        alert("Position admin successful!");// Clear the form fields after submitting
      })
      .catch((error) => {
        if (error.response && error.response.status === 600) {
          alert("Position already exists!");}
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Position</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
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
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPosition;
