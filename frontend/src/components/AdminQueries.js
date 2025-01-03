import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios"; // Import axios for API requests
import "../styles/AdminQueries.css";

const AdminQueries = () => {
  const [queries, setQueries] = useState([]); // Holds the fetched queries
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 5;

  // Fetch queries from the API when the component mounts
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/get-all-queries");
        if (response.data.status === "success" && Array.isArray(response.data.data)) {
          setQueries(response.data.data); // Set fetched queries to state
        } else {
          console.error("Unexpected response format:", response.data);
          setQueries([]); // Set empty array if the response format is not as expected
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
        setQueries([]); // In case of an error, set empty array
      }
    };

    fetchQueries();
  }, []);

  // Handle marking a query as resolved
  const markAsResolved = (id) => {
    setQueries((prevQueries) =>
      prevQueries.map((query) =>
        query.id === id ? { ...query, resolved: true } : query
      )
    );
  };

  // Filter queries based on the search term
  const filteredQueries = queries.filter((query) => {
    // Ensure query.query and query.email are defined before calling toLowerCase
    const queryText = query.query ? query.query.toLowerCase() : '';
    const emailText = query.email ? query.email.toLowerCase() : '';
    return queryText.includes(searchTerm.toLowerCase()) || emailText.includes(searchTerm.toLowerCase());
  });

  // Calculate pagination
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
            placeholder="Search by query or email..."
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
                  <th>Name</th>
                  <th>Mobile No</th>
                  <th>Email</th>
                  <th>Query</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedQueries.map((query) => (
                  <tr key={query.id}>
                    <td>{query.name}</td>
                    <td>{query.phone}</td>
                    <td>{query.email}</td>
                    <td>{query.query}</td>
                    <td>
                      {/* Add button to mark query as resolved */}
                      {query.resolved ? (
                        <span className="resolved">Resolved</span>
                      ) : (
                        <button
                          onClick={() => markAsResolved(query.id)}
                          className="resolve-btn"
                        >
                          Mark as Resolved
                        </button>
                      )}
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
