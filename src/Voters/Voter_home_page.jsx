import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Voter_Homepage() {
  const [voterName, setVoterName] = useState("");
  const [users, setUsers] = useState([]);
  const [votedCandidate, setVotedCandidate] = useState(null); 
  const [aadhar, setaadhar] = useState("");
  const [voted, setVoted] = useState(false); 
  const [address, setAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedArea, setSelectedArea] = useState(""); 

  useEffect(() => {
    // Fetch candidates/users
    axios
      .get("http://localhost:5000/getusers")
      .then((response) => {
        setUsers(response.data); 
      })
      .catch((err) => console.log(err));

    // Get the voter's Aadhar from localStorage
    const aadharId = localStorage.getItem("aadhar");
    setaadhar(aadharId);

    // Fetch voter details to check if they've already voted
    axios
      .get(`http://localhost:5000/voterdetails`, {
        params: { checkAadhar: aadharId },
      })
      .then((response) => {
       
        setAddress(response.data.address);
        if (response.data.votedCandidates) {
          alert("already voted");
        }

        setVoterName(response.data.name);
        if (response.data.votedCandidates) {
          setVotedCandidate(response.data.votedCandidateId); // Set the voted candidate's ID if it exists
          setVoted(true); // Set voted to true if they've already voted
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to handle vote submission and update the voter's status
  const voteCount = (userId) => {
    if (!voted) {
      // Allow voting only if the voter hasn't already voted
      setVotedCandidate(userId);

      // Send the vote to the backend to update the database
      axios
        .post("http://localhost:5000/vote", { userId, aadhar, address })
        .then(() => {
          console.log("Vote successfully recorded");

          // After the vote, update the frontend state to reflect that the user has voted
          setVoted(true); // This disables the button after voting
          alert("Vote successfully recorded!"); // Alert after voting
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            // If 404 error is returned from the server, it means the user is trying to vote for someone in another area
            alert("You cannot vote for a candidate in another area!");
          } else {
            console.log("Error casting vote: ", err);
            alert("An error occurred while casting your vote.");
          }
        });
    } else {
      alert("You have already voted!"); // Show alert if the user has already voted
    }
  };

  // Group candidates by their area
  const groupByArea = () => {
    const grouped = users.reduce((acc, user) => {
      if (!acc[user.area]) {
        acc[user.area] = [];
      }
      acc[user.area].push(user);
      return acc;
    }, {});

    return grouped;
  };

  const groupedCandidates = groupByArea();

  // Filter candidates based on search term and selected area
  const filteredCandidates = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedArea === "" || user.area === selectedArea)
    );
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to logout?');
  
    if (confirmed) {
      // Clear local storage if confirmed
      localStorage.clear();
  
      // Navigate to the home page
      navigate('/');
    } else {
      // Do nothing if cancelled
      return; 
    }
  };
  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-gray-900 text-white">
      
      <div className="flex justify-between items-center  w-full">
  <div className="px-6">
    <h1 className="text-2xl font-bold text-white">
      Welcome, {voterName}! from {address}
    </h1>
  </div>
  <div className="right-5">
    <button 
      onClick={handleLogout} 
      className="text-white mt-3  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      Logout
    </button>
  </div>
</div>

        
      <div className="mt-8 w-full px-6">
        {/* Search bar */}
        

        {/* Dropdown to filter by area */}
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="mb-4 p-2 rounded w-60 bg-gray-800 text-white"
        >
          <option value="">All Areas</option>
          {Object.keys(groupedCandidates).map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by candidate name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 rounded ml-5  w-1/2 bg-gray-800 text-white placeholder-gray-400"
        />

        {/* Iterate over filtered candidates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredCandidates.map((user) => (
            <div
              key={user._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
              style={{ height: "250px", width: "200px" }}
            >
              <img
                src={`http://localhost:5000/uploads/${user.image}`}
                alt={user.name}
                className="w-full h-1/2 object-cover mb-4 rounded-md"
              />
              <h3 className="text-sm font-semibold">{user.name}</h3>
              <p className="text-xs text-gray-300">Position: {user.position}</p>
              <p className="text-xs text-gray-300">Area: {user.area}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => voteCount(user._id)}
                  disabled={voted} // Disable all buttons if the user has already voted
                  className={`py-1 px-2 text-xs rounded ${
                    votedCandidate === user._id && voted
                      ? "bg-green-500"
                      : ""
                  } text-white hover:bg-gray-700`}            style={{ width: '40px', height: '40px' }}
                  // Green if this candidate was successfully voted for
                >
                  {votedCandidate === user._id && voted ? <img src="/vote.gif" alt="Edit" className="w-full h-full object-contain" /> : <img src="/vote.gif" alt="Edit" className="w-full h-full object-contain" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
