import React, {useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";



const Profile = () => {

  const navigate = useNavigate();

  const{logout} = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  
  const handleEdit = () => {
    setEditing(true);
  };
  
  const handleSave = async (e) => {
    e.preventDefault();

    try{
      const userId = currentUser.id;
      const image = currentUser.img;
      const updatedData = {
        userId,
        image,
        username,
        email
      };
  
      if (username !== currentUser.username) {
        updatedData.username = username;
      }
  
      if (email !== currentUser.email) {
        updatedData.email = email;
      }

     await axios.put(`http://localhost:8800/api/users/${userId}`, {
          username,
          email,
          userId,
        });
        setCurrentUser(updatedData);
        localStorage.setItem("user", JSON.stringify(updatedData));
    }catch(err){
      console.log(err);
    }
    setEditing(false);
    navigate("/login")
  };
  
  const handleDelete =  async (e) => {

    e.preventDefault();
    try{
    const userId = currentUser.id;
    await axios.delete(`http://localhost:8800/api/users/${userId}`);
  }catch(err){
    console.log(err);
  }
  logout();
  navigate("/")
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {currentUser && (
        <div className="profile-card">
          <div className="profile-image">
            <img src={`../upload/${currentUser.img}`} alt="Profile" />
          </div>
          <div className="profile-details">
            <div className="profile-row">
              <span className="label">Username:</span>
              {editing ? (
                <input
                  className="profile-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <span className="profile-value">{currentUser.username}</span>
              )}
            </div>
            <div className="profile-row">
              <span className="label">Email:</span>
              {editing ? (
                <input
                  className="profile-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <span className="profile-value">{currentUser.email}</span>
              )}
            </div>
            {editing ? (
              <div className="profile-buttons">
                <button className="profile-save-btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="profile-cancel-btn"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="profile-buttons">
                <button className="profile-edit-btn" onClick={handleEdit}>
                  Edit
                </button>
                <button className="profile-delete-btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;