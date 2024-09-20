import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Voter_Homepage() {
  const [voterName, setVoterName] = useState("");
  const [users, setUsers] = useState([]);
  const [votedCandidate, setVotedCandidate] = useState(null); // Store the ID of the voted candidate
  const [aadhar, setaadhar] = useState("");
  const [voted, setVoted] = useState(false);  // Controls if the user has voted at all

  useEffect(() => {
    // Fetch candidates/users
    axios
      .get('http://localhost:5000/getusers')
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));

    // Get the voter's Aadhar from localStorage
    const aadharId = localStorage.getItem("aadhar");
    setaadhar(aadharId);

    // Fetch voter details to check if they've already voted
    axios.get(`http://localhost:5000/voterdetails`, { params: { checkAadhar: aadharId } })
      .then((response) => {
        if (!response.data.votedCandidates)
        {
          alert("already voted")
        }

        setVoterName(response.data.name);
        if (!response.data.votedCandidates) {
          setVotedCandidate(response.data.votedCandidateId); // Set the voted candidate's ID if it exists
          setVoted(true);  // Set voted to true if they've already voted
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to handle vote submission and update the voter's status
  const voteCount = (userId) => {
    if (!voted) {  // Allow voting only if the voter hasn't already voted
      setVotedCandidate(userId);

      // Send the vote to the backend to update the database
      axios.post('http://localhost:5000/vote', { userId, aadhar })
        .then(() => {
          console.log("Vote successfully recorded");

          // After the vote, update the frontend state to reflect that the user has voted
          setVoted(true);  // This disables the button after voting
          alert("Vote successfully recorded!");  // Alert after voting
        })
        .catch((err) => console.log("Error casting vote: ", err));
    } else {
      alert("You have already voted!");  // Show alert if the user has already voted
    }
  };

  return (
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
                  disabled={voted}  // Disable all buttons if the user has already voted
                  className={`py-1 px-2 text-xs rounded ${votedCandidate === user._id ? 'bg-green-500' : 'bg-yellow-500'} text-white hover:bg-yellow-600`}  // Green if this candidate was voted for
                >
                  {votedCandidate === user._id ? 'Voted' : 'Vote'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
