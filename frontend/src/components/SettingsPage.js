import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPage.css";

const SettingsPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
  const [currency, setCurrency] = useState("USD");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayContent, setOverlayContent] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
  });

  const [contactForm, setContactForm] = useState({
    name: "",
    message: "",
    mobileNumber: "",
  });

  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  };

  const handleCurrencyChange = (e) => setCurrency(e.target.value);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const showOverlay = (content) => {
    setOverlayContent(content);
    setIsOverlayVisible(true);
  };

  const closeOverlay = () => {
    setIsOverlayVisible(false);
    setOverlayContent(null);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleProfileSave = () => {
    console.log("Profile updated:", userDetails);
    closeOverlay();
  };

  const handleContactSubmit = () => {
    console.log("Contact Support Form Submitted:", contactForm);
    closeOverlay();
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-header">Settings</h1>

        {!isOverlayVisible && (
          <>
            <section className="settings-section">
              <h2 className="section-title">Profile Settings</h2>
              <button
                className="settings-button"
                onClick={() =>
                  showOverlay(
                    <div className="edit-profile-container">
                      <h2>Edit Profile</h2>
                      <form className="edit-profile-form">
                        <div className="form-group">
                          <label htmlFor="name">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={userDetails.name}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={userDetails.phone}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <button type="button" className="submit-btn" onClick={handleProfileSave}>
                          Save Changes
                        </button>
                        <button type="button" className="cancel-btn" onClick={closeOverlay}>
                          Cancel
                        </button>
                      </form>
                    </div>
                  )
                }
              >
                Edit Profile
              </button>
              <button className="settings-button">Change Password</button>
            </section>

            <hr className="settings-hr" />

            <section className="settings-section">
              <h2 className="section-title">Application Preferences</h2>
              <div className="settings-select-container">
                <label className="settings-label">
                  Theme:
                  <button onClick={toggleTheme} className="settings-button">
                    {theme === "light" ? "Enable Dark Mode" : "Enable Light Mode"}
                  </button>
                </label>
              </div>
              <div className="settings-select-container">
                <label className="settings-label">
                  Language:
                  <select value={language} onChange={handleLanguageChange} className="settings-select">
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </label>
              </div>
              <div className="settings-select-container">
                <label className="settings-label">
                  Currency:
                  <select value={currency} onChange={handleCurrencyChange} className="settings-select">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="INR">INR</option>
                  </select>
                </label>
              </div>
            </section>

            <hr className="settings-hr" />

            <section className="settings-section">
              <h2 className="section-title">Support & Legal</h2>
              <button
                className="settings-button"
                onClick={() =>
                  showOverlay(
                    <div className="faq-section">
                      <h3>Frequently Asked Questions (FAQ)</h3>
                      <p>How do I add an expense?</p>
                      <p>To add an expense, go to the dashboard and click the "Add Expense" button.</p>
                      <p>How can I view my reports?</p>
                      <p>Your monthly reports are available under the "Reports" section of the dashboard.</p>
                      <button className="back-btn" onClick={closeOverlay}>
                        Close
                      </button>
                    </div>
                  )
                }
              >
                FAQ
              </button>
              <button
                className="settings-button"
                onClick={() =>
                  showOverlay(
                    <div className="contact-form-container">
                      <h3>Contact Support</h3>
                      <form>
                        <div className="form-group">
                          <label htmlFor="name">Your Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactFormChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="message">Your Message</label>
                          <textarea
                            id="message"
                            rows="5"
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactFormChange}
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="mobileNumber">Mobile Number</label>
                          <input
                            type="tel"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={contactForm.mobileNumber}
                            onChange={handleContactFormChange}
                          />
                        </div>
                        <button type="button" className="submit-btn" onClick={handleContactSubmit}>
                          Send Message
                        </button>
                        <button type="button" className="cancel-btn" onClick={closeOverlay}>
                          Cancel
                        </button>
                      </form>
                    </div>
                  )
                }
              >
                Contact Support
              </button>
              <button
                className="settings-button"
                onClick={() =>
                  showOverlay(
                    <div className="privacy-policy">
                      <h3>Terms of Service (TOS)</h3>
                      <p>Our Terms of Service govern your usage of our expense management system...</p>
                      <button className="back-btn" onClick={closeOverlay}>
                        Close
                      </button>
                    </div>
                  )
                }
              >
                Terms of Service
              </button>
              <button
                className="settings-button"
                onClick={() =>
                  showOverlay(
                    <div className="privacy-policy">
                      <h3>Privacy Policy (PP)</h3>
                      <p>We value your privacy. Our policy explains how we protect your data...</p>
                      <button className="back-btn" onClick={closeOverlay}>
                        Close
                      </button>
                    </div>
                  )
                }
              >
                Privacy Policy
              </button>
            </section>
          </>
        )}

        {isOverlayVisible && (
          <div className="overlay" onClick={closeOverlay}>
            <div
              className="overlay-content"
              onClick={(e) => e.stopPropagation()}  /* Prevent closing overlay when clicking inside it */
            >
              {overlayContent}
            </div>
          </div>
        )}
      </div>

      <div className="back-button-container">
        <button className="back-btn" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
