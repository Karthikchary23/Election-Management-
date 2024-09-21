import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCandidate = () => {
  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    area: '',
    image: null,
  });
  const [editingCandidateId, setEditingCandidateId] = useState(null);

  useEffect(() => {
    // Fetch positions for the dropdown
    axios.get('http://localhost:5000/positions')
      .then(response => setPositions(response.data))
      .catch(error => console.error('Error fetching positions:', error));

    // Fetch candidates to display
    fetchCandidates();
  }, []);

  const fetchCandidates = () => {
    axios.get('http://localhost:5000/candidates')
      .then(response => setCandidates(response.data))
      .catch(error => console.error('Error fetching candidates:', error));
  };

  const handleAddCandidateClick = () => {
    setEditingCandidateId(null);
    setFormData({
      name: '',
      position: '',
      area: '',
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('position', formData.position);
    data.append('area', formData.area);
    data.append('image', formData.image);

    const url = editingCandidateId
      ? `http://localhost:5000/candidates/${editingCandidateId}`
      : 'http://localhost:5000/candidates';

    const method = editingCandidateId ? 'put' : 'post';

    axios[method](url, data)
      .then(() => {
        toast.success('Candidate Addedd Successfully', {
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
        setIsModalOpen(false);
        fetchCandidates();
      })
      .catch(error => console.error('Error saving candidate:', error));
  };

  const handleEditCandidate = (candidate) => {
    setEditingCandidateId(candidate._id);
    setFormData({
      name: candidate.name,
      position: candidate.position,
      area: candidate.area,
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleDeleteCandidate = (id) => {
    axios.delete(`http://localhost:5000/candidates/${id}`)
      .then(() => fetchCandidates())
      .catch(error => console.error('Error deleting candidate:', error));
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
            <h2 className="text-xl font-bold mb-4">{editingCandidateId ? 'Edit Candidate' : 'Add Candidate'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Candidate Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Position</option>
                  {positions.map(position => (
                    <option key={position._id} value={position.position}>
                      {position.position}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Area
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Candidate Photo
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
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
                  {editingCandidateId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Candidates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1">
          {candidates.map(candidate => (
            <div key={candidate._id} className="bg-white p-4 rounded-lg shadow-md" style={{ height: '250px', width: '200px' }}>
              <img
                src={`http://localhost:5000/uploads/${candidate.image}`}
                alt={candidate.name}
                className="w-full h-1/2 object-cover mb-4 rounded-md"
              />
              <h3 className="text-sm font-semibold">{candidate.name}</h3>
              <p className="text-xs text-gray-700">Position: {candidate.position}</p>
              <p className="text-xs text-gray-700">Area: {candidate.area}</p>
              <p className="text-xs text-gray-700">Number of Votes: {candidate.vote_count}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEditCandidate(candidate)}
                  className="bg-yellow-500 text-white py-1 px-2 text-xs rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCandidate(candidate._id)}
                  className="bg-red-500 text-white py-1 px-2 text-xs rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default AddCandidate;