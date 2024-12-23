import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/AdminQueries.css";

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 5;

  useEffect(() => {
    // Dummy data for testing UI
    const dummyData = [
      {
        id: 1,
        date: "2024-12-22",
        title: "Payment Issue",
        description: "I am unable to process my payment through the app.",
        status: "Pending",
      },
      {
        id: 2,
        date: "2024-12-21",
        title: "Feature Request",
        description: "It would be great to have a dark mode in the app.",
        status: "Resolved",
      },
      {
        id: 3,
        date: "2024-12-20",
        title: "Bug Report",
        description: "The app crashes when I try to upload an image.",
        status: "In Progress",
      },
      {
        id: 4,
        date: "2024-12-19",
        title: "Login Issue",
        description: "I cannot log in after updating my password.",
        status: "Pending",
      },
      {
        id: 5,
        date: "2024-12-18",
        title: "Suggestion",
        description: "Consider adding a referral program.",
        status: "Resolved",
      },
    ];
    setQueries(dummyData);
  }, []);

  const filteredQueries = queries.filter(
    (query) =>
      query.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.date.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredQueries.length / queriesPerPage);
  const displayedQueries = filteredQueries.slice(
    (currentPage - 1) * queriesPerPage,
    currentPage * queriesPerPage
  );

  return (
    <div className="queries-container">
      <header className="queries-header">
        <h1>User Queries</h1>
        <div className="queries-search">
          <input
            type="text"
            placeholder="Search by title or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>
        </div>
      </header>

      <div className="queries-content">
        {displayedQueries.length > 0 ? (
          <>
            <table className="queries-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedQueries.map((query) => (
                  <tr key={query.id}>
                    <td>{new Date(query.date).toLocaleDateString()}</td>
                    <td>{query.title}</td>
                    <td>{query.description}</td>
                    <td className={`status ${query.status.toLowerCase()}`}>
                      {query.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="no-queries">No queries found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminQueries;
