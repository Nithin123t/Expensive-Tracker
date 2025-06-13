import React, { useState } from "react";

const Profile = ({ user, setUser }) => {
  const [name, setName] = useState(user.name || "");
  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [preview, setPreview] = useState(profilePic);

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview image as base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Save base64 string in state (you can also upload to server instead)
      setProfilePic(null); // reset first
      const fr = new FileReader();
      fr.onload = () => {
        setProfilePic(fr.result);
      };
      fr.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Simple validation
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!profilePic) {
      alert("Please upload a profile picture");
      return;
    }

    // Create updated user object
    const updatedUser = { ...user, name: name.trim(), profilePic };
    setUser(updatedUser);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

      <label className="block mb-2 font-medium" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        type="text"
        className="w-full border rounded px-3 py-2 mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block mb-2 font-medium" htmlFor="profilePic">
        Profile Picture
      </label>
      <input
        id="profilePic"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {preview && (
        <img
          src={preview}
          alt="Profile Preview"
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
      )}

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
