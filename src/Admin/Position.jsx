import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

const AddPosition = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm();
  
  const [isFormVisible, setFormVisible] = useState(false); // State for form visibility

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/position", data)
      .then((response) => {
        console.log(response.data);
        reset(); // Clear the form fields after submitting
        alert("Position added successfully!"); // Success alert
        setFormVisible(false); // Close the form after submission
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("Position already exists!"); // Show alert if position exists
        } else {
          console.error("There was an error adding the position!", error);
          alert("Server error, please try again later."); // General error alert
        }
      });
  };

  const handleAddPositionClick = () => {
    setFormVisible(true); // Show the form
  };

  const handleCancelClick = () => {
    setFormVisible(false); // Hide the form
    reset(); // Optionally reset form fields on cancel
  };

  return (
    <div className="relative">
      {/* Button to show the form */}
      {!isFormVisible && (
        <button
          onClick={handleAddPositionClick}
          className="fixed top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Position
        </button>
      )}

      {/* Form as a popup modal */}
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Position</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="position">
                  Position Name
                </label>
                <input
                  {...register("position", {
                    required: "Position name is required",
                    minLength: {
                      value: 1,
                      message: "Position cannot be empty",
                    },
                    maxLength: {
                      value: 20,
                      message: "Position can contain up to 20 characters only",
                    },
                  })}
                  placeholder="Position"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.position && <div className="text-red-700">{errors.position.message}</div>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="district">
                  District
                </label>
                <input
                  {...register("district", {
                    required: "District is required",
                    minLength: {
                      value: 5,
                      message: "District must contain at least 5 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "District can contain up to 30 characters only",
                    },
                  })}
                  placeholder="District"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.district && <div className="text-red-700">{errors.district.message}</div>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="mandal">
                  Mandal
                </label>
                <input
                  {...register("mandal", {
                    required: "Mandal is required",
                    minLength: {
                      value: 5,
                      message: "Mandal must contain at least 5 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Mandal can contain up to 30 characters only",
                    },
                  })}
                  placeholder="Mandal"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.mandal && <div className="text-red-700">{errors.mandal.message}</div>}
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPosition;
