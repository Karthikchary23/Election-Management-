import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegistrationForm = () => {
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
        console.log(response.data);
        reset(); // Clear the form fields after submitting
        alert("Registration successful!"); // Success alert
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("User already exists!"); // Show alert if user exists
        } 
        else if(error.response && error.response.status === 502)
        {
          alert("Aadhar Not found");

        }
        else {
          console.error("There was an error registering the voter!", error);
          alert("Server error, please try again later."); // General error alert
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Voter Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
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
                alert
              })}
              placeholder="Name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.name && <div className="text-red-700">{errors.name.message}</div>}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
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
              placeholder="Email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-red-700"
            />
            {errors.email && <div className="text-red-700">{errors.email.message}</div>}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
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
            {errors.phone && <div className="text-red-700">{errors.phone.message}</div>}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="address"
            >
              Address
            </label>
            <input
              {...register("address", {
                required: "Address is required",
              })}
              placeholder="Address"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.address && <div className="text-red-700">{errors.address.message}</div>}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
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
            {errors.aadhar_number && <div className="text-red-700">{errors.aadhar_number.message}</div>}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
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
            {errors.password && <div className="text-red-700">{errors.password.message}</div>}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
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
              <div className="text-red-700">{errors.confirmPassword.message}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
