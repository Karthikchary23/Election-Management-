import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Voter_Homepage() {
  const [voterName, setVoterName] = useState("");
  const [users, setUsers] = useState([]);
  const [votedCandidate, setVotedCandidate] = useState(null); // Track the candidate voted for

  useEffect(() => {
    axios
      .get('http://localhost:5000/getusers')
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));

    // Get the voter's name from localStorage
    const name = localStorage.getItem("voterName");
    setVoterName(name);
  }, []);

  // Function to handle vote and disable other buttons
  const voteCount = (userId) => {
    if (votedCandidate === null) {
      // Allow voting only once
      setVotedCandidate(userId);

      // Send the vote to the backend (optional, add your backend vote handling here)
      axios.post('http://localhost:5000/vote', { userId })
        .then(() => {
          console.log("Vote successfully recorded");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="flex flex-col items-start justify-start min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {voterName}!</h1>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Candidates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1">
            {users.map(user => (
              <div key={user._id} className="bg-white p-4 rounded-lg shadow-md" style={{ height: '250px', width: '200px' }}>
                <img
                  src={`http://localhost:5000/uploads/${user.image}`}
                  alt={user.name}
                  className="w-full h-1/2 object-cover mb-4 rounded-md"
                />
                <h3 className="text-sm font-semibold">{user.name}</h3>
                <p className="text-xs text-gray-700">Position: {user.position}</p>
                <p className="text-xs text-gray-700">Area: {user.area}</p>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => voteCount(user._id)}
                    disabled={votedCandidate !== null && votedCandidate !== user._id} // Disable other buttons once a vote is cast
                    className={`py-1 px-2 text-xs rounded ${votedCandidate === user._id ? 'bg-green-500' : 'bg-yellow-500'} text-white hover:bg-yellow-600`}
                  >
                    {votedCandidate === user._id ? 'Voted' : 'Vote'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
