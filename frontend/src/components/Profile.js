import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Profile</h2>
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={profile.email}
        onChange={handleChange}
      />
      <button>Save Changes</button>
    </div>
  );
};

export default Profile;
