import React, { useState } from 'react';

const AddCandidate = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddCandidateClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert("Candidate added!");
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={handleAddCandidateClick}
                className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Add Candidate
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Add Candidate</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                    htmlFor="candidateName"
                                >
                                    Candidate Name
                                </label>
                                <input
                                    type="text"
                                    id="candidateName"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                    htmlFor="candidatePhoto"
                                >
                                    Candidate Photo
                                </label>
                                <input
                                    type="file"
                                    id="candidatePhoto"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                    htmlFor="position"
                                >
                                    Position
                                </label>
                                <input
                                    type="text"
                                    id="position"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                    htmlFor="area"
                                >
                                    Area
                                </label>
                                <input
                                    type="text"
                                    id="area"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCandidate;
