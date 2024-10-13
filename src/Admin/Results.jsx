import React, { useEffect, useState } from "react";
import axios from "axios";

const Results = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    axios
      .get("http://localhost:5000/getusers")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with the full dataset
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter users based on area
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    const areaFiltered = users.filter((user) =>
      e.target.value === "" ? true : user.area === e.target.value
    );
    setFilteredUsers(areaFiltered);
  };

  // Sort users by vote_count
  const sortUsersByVotes = (order) => {
    const sorted = [...filteredUsers].sort((a, b) =>
      order === "asc" ? a.vote_count - b.vote_count : b.vote_count - a.vote_count
    );
    setFilteredUsers(sorted);
  };

  // Handle search by name
  useEffect(() => {
    const searchFiltered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(searchFiltered);
  }, [searchTerm, users]);

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className="text-white font-bold text-3xl items-center justify-center flex">
          <h1>Check Results!</h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center py-4 mt-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 sm:mb-0 p-2 border rounded-md"
          />

          {/* Area Dropdown Filter */}
          <select
            value={selectedArea}
            onChange={handleAreaChange}
            className="mb-4 sm:mb-0 p-2 border rounded-md"
          >
            <option value="">All Areas</option>
            {[...new Set(users.map((user) => user.area))].map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          {/* Sort Button */}
          <button
            onClick={() => {
              const newOrder = sortOrder === "asc" ? "desc" : "asc";
              setSortOrder(newOrder);
              sortUsersByVotes(newOrder);
            }}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Sort by Votes ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-white mt-8">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700">
              <tr>
                <th scope="col" className="p-4">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="px-6 py-3">
                  Area
                </th>
                <th scope="col" className="px-6 py-3">
                  Number of votes
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.position}</td>
                    <td className="px-6 py-4">{user.area}</td>
                    <td className="px-6 py-4">{user.vote_count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Results;
