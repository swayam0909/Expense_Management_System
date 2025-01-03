import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPage.css";

const SettingsPage = () => {
  const [username, setUsername] = useState(""); // Edit Profile
  const [email, setEmail] = useState(""); // Dynamically fetched email
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayContent, setOverlayContent] = useState(null);
  const [name, setName] = useState(""); // Contact Support
  const [phone, setPhone] = useState(""); // Contact Support
  const [query, setQuery] = useState(""); // Contact Support
  const [errorMessage, setErrorMessage] = useState(""); // Error message for support form
  const [successMessage, setSuccessMessage] = useState(""); // Success message for support form

  const navigate = useNavigate();

  // Fetch the email from localStorage or any other state management system
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail"); // Assuming email is stored in localStorage after login
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserInfo(storedEmail); // Fetch user info on load
    } else {
      console.error("User email not found!");
    }
  }, []);

  // Fetch user info from backend
  const fetchUserInfo = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/auth/user-info?email=${email}`
      );
      if (response.status === 200) {
        setUsername(response.data.username); // Set the current username
      } else {
        alert("Failed to fetch user information.");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      alert("An error occurred while fetching user information.");
    }
  };

  // Handle input change for username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle profile save (username change)
  const handleProfileSave = async () => {
    if (!email || !username) {
      alert("Email or username cannot be empty!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/auth/edit-username?email=${email}&username=${username}`
      );
      if (response.status === 200) {
        alert("Username updated successfully!");
      } else {
        alert("Failed to update username.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the username.");
    }
  };

  // Handle back button click
  const handleBackButton = () => {
    navigate("/dashboard");
  };

  // Show overlay for contact form
  const showOverlay = (content) => {
    setOverlayContent(content);
    setIsOverlayVisible(true);
  };

  // Close overlay
  const closeOverlay = () => {
    setIsOverlayVisible(false);
    setOverlayContent(null);
  };

  // Handle input change for contact form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "query") {
      setQuery(value);
    } else if (name === "email") {
      setEmail(value); // Update email on change in support form
    }
  };

  // Handle form submission for Contact Support
  const handleSubmitSupportQuery = async () => {
    if (!name || !phone || !query || !email) {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    const supportData = {
      name,
      email, // Pre-filled email
      phone,
      query,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/support-query", // Your Spring Boot backend URL
        supportData
      );

      if (response.status === 200) {
        setSuccessMessage("Support request submitted successfully!");
        setErrorMessage(""); // Clear error message on success
      } else {
        setErrorMessage("Failed to submit support query. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting support query:", error);
      setErrorMessage("An error occurred while submitting the support query.");
    }
  };

  return (
    <div className="settings-page">
      {/* Back Button */}
      <button className="back-button" onClick={handleBackButton}>
        &#8592; Back
      </button>

      <h1 className="settings-header">Settings</h1>

      {/* Edit Profile Section */}
      <div className="edit-profile-section">
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your new username"
          />
        </div>
        <button className="settings-button" onClick={() => showOverlay("editProfile")}>
          Edit Username
        </button>
      </div>

      <hr className="settings-hr" />

      {/* Contact Support Section */}
      <div className="contact-support-section">
        <h2>Contact Support</h2>
        <button className="settings-button" onClick={() => showOverlay("contactSupport")}>
          Contact Support
        </button>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions (FAQ)</h2>
        <p>How do I add an expense?</p>
        <p>To add an expense, go to the dashboard and click the "Add Expense" button.</p>
        <p>How can I view my reports?</p>
        <p>Your monthly reports are available under the "Reports" section of the dashboard.</p>
      </div>

      {/* Overlay for Edit Profile or Contact Support */}
      {isOverlayVisible && (
        <div className="overlay" onClick={closeOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            {overlayContent === "editProfile" && (
              <div>
                <h2>Edit Username</h2>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter your new username"
                  />
                </div>
                <button className="settings-button" onClick={handleProfileSave}>
                  Save Username
                </button>
                <button className="close-button" onClick={closeOverlay}>
                  Close
                </button>
              </div>
            )}
            {overlayContent === "contactSupport" && (
              <div>
                <h2>Contact Support</h2>
                <form>
                  {/* Contact form fields */}
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="query">Query</label>
                    <textarea
                      id="query"
                      name="query"
                      value={query}
                      onChange={handleInputChange}
                      placeholder="Enter your query"
                      rows="4"
                    />
                  </div>

                  {/* Error and Success messages */}
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
                  {successMessage && <p className="success-message">{successMessage}</p>}

                  <button
                    type="button"
                    className="settings-button"
                    onClick={handleSubmitSupportQuery}
                  >
                    Submit Query
                  </button>
                </form>
                <button className="close-button" onClick={closeOverlay}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
