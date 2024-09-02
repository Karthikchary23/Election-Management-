import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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
        alert("Added admin successful!"); // Success alert
        // Clear the form fields after submitting
      })
      .catch((error) => {
        if (error.response && error.response.status === 600) {
          alert("Admin already exists!"); // Show alert if user exists
         } else {
          console.error("There was an error registering the voter!", error);
          alert("Server error, please try again later."); // General error alert
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Admin</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-red-700"
            />
            {errors.email && (
              <div className="text-red-700">{errors.email.message}</div>
            )}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.password && <div className="text-red-700">{errors.password.message}</div>}
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

export default Admin_add;
