import React, { useEffect, useState } from "react";

export default function Voter_Homepage() {
  const [voterName, setVoterName] = useState("");

  useEffect(() => {
    // Get the voter's name from localStorage
    const name = localStorage.getItem("voterName");
    setVoterName(name);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Welcome, {voterName}!</h1>
      <p className="mt-4 text-gray-600">You have successfully logged in.</p>
      {/* Add more content here for the voter dashboard */}
    </div>
  );
}
