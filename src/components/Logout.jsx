import React from "react";
import "./Logout.css";
import axios from "axios";

function Logout() {
    
  const handleLogout = (e) => {
    e.preventDefault();

    axios
      .post("https://forgedfashion-backend.onrender.com/profile/logout")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <button className="logout-button" onClick={handleLogout}>Logout</button>;
}

export default Logout;