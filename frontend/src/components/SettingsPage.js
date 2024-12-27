import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPage.css";

const SettingsPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
  const [currency, setCurrency] = useState("USD");
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [isFAQVisible, setIsFAQVisible] = useState(false);
  const [isPrivacyPolicyVisible, setIsPrivacyPolicyVisible] = useState(false);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    profilePicture: null,
  });

  const navigate = useNavigate();

  const faqs = [
    { question: "How do I add a new expense?", answer: "Navigate to the dashboard and click 'Add Expense'." },
    { question: "Can I change the default currency?", answer: "Yes, go to Settings > Application Preferences > Currency." },
    { question: "How do I edit or delete a category?", answer: "Go to Settings > Manage Categories and select the category to edit or delete." },
    { question: "Is my data secure?", answer: "Yes, we use encryption to protect your data." },
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  };

  const handleCurrencyChange = (e) => setCurrency(e.target.value);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleContactSupportClick = () => {
    setIsContactFormVisible(true);
    setIsFAQVisible(false);
    setIsPrivacyPolicyVisible(false);
    setIsEditProfileVisible(false);
  };

  const handleBackToSettings = () => {
    setIsContactFormVisible(false);
    setIsFAQVisible(false);
    setIsPrivacyPolicyVisible(false);
    setIsEditProfileVisible(false);
  };

  const handleFAQClick = () => {
    setIsFAQVisible(true);
    setIsContactFormVisible(false);
    setIsPrivacyPolicyVisible(false);
    setIsEditProfileVisible(false);
  };

  const handlePrivacyPolicyClick = () => {
    setIsPrivacyPolicyVisible(true);
    setIsContactFormVisible(false);
    setIsFAQVisible(false);
    setIsEditProfileVisible(false);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileVisible(true);
    setIsContactFormVisible(false);
    setIsFAQVisible(false);
    setIsPrivacyPolicyVisible(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = () => {
    console.log("Profile updated:", userDetails);
    setIsEditProfileVisible(false);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setUserDetails((prev) => ({ ...prev, profilePicture: URL.createObjectURL(file) }));
  };

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  return (
    <div className="settings-page">
      <div className={`settings-container ${isFAQVisible ? "faq-active" : ""}`}>
        <h1 className="settings-header">Settings</h1>

        {!isFAQVisible && !isContactFormVisible && !isPrivacyPolicyVisible && !isEditProfileVisible && (
          <>
            <section className="settings-section">
              <h2 className="section-title">Profile Settings</h2>
              <button className="settings-button" onClick={handleEditProfileClick}>Edit Profile</button>
              <button className="settings-button">Change Password</button>
            </section>

            <hr className="settings-hr" />

            <section className="settings-section">
              <h2 className="section-title">Application Preferences</h2>
              <div className="settings-select-container">
                <label className="settings-label">
                  Theme:
                  <button onClick={toggleTheme} className="settings-button">
                    {theme === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
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
              <button className="settings-button" onClick={handleContactSupportClick}>
                Contact Support
              </button>
              <button className="settings-button" onClick={handleFAQClick}>
                FAQ
              </button>
              <button className="settings-button" onClick={handlePrivacyPolicyClick}>
                Privacy Policy
              </button>
              <button className="settings-button">Terms of Service</button>
            </section>
          </>
        )}

        {isFAQVisible && (
          <div className="faq-section">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${index === activeIndex ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <p className="faq-question">{faq.question}</p>
                {index === activeIndex && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
            <button className="back-btn" onClick={handleBackToSettings}>Back</button>
          </div>
        )}

        {isPrivacyPolicyVisible && (
          <div className="privacy-policy">
            <h3>Privacy Policy</h3>
            <h4>Introduction</h4>
            <ul>
              <li>We value your privacy and are committed to protecting your personal information.</li>
              <li>We collect personal data to provide better services and ensure security.</li>
              <li>Your information will not be shared with third parties without your consent.</li>
            </ul>
            <button className="back-btn" onClick={handleBackToSettings}>Back</button>
          </div>
        )}

        {isContactFormVisible && (
          <div className="contact-form-container">
            <h2>Contact Support</h2>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="contact">Contact Number:</label>
                <input
                  type="text"
                  id="contact"
                  placeholder="Enter your contact number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="query">Your Query</label>
                <textarea
                  id="query"
                  placeholder="Describe your issue or query"
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Submit Query</button>
            </form>
            <button className="back-btn" onClick={handleBackToSettings}>Back</button>
          </div>
        )}

        {isEditProfileVisible && (
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
                  placeholder="Enter your full name"
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={handleProfilePictureChange}
                />
              </div>
              <button type="button" className="submit-btn" onClick={handleProfileSave}>Save Changes</button>
              <button type="button" className="cancel-btn" onClick={handleBackToSettings}>Cancel</button>
            </form>
          </div>
        )}
      </div>
      {!isFAQVisible && !isContactFormVisible && !isPrivacyPolicyVisible && !isEditProfileVisible && (
        <div className="back-button-container">
          <button className="back-btn" onClick={handleBackToDashboard}>Back to Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;