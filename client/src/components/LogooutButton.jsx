import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogooutButton = () => {
  const navigate = useNavigate();

  const logout = (e) => {
    axios.post(`https://ecalendar-api.onrender.com/api/logout`)
      .then((res) => navigate("/"));
  };

  return (
    <button className="btn btn-danger" onClick={(e) => logout()}>
      Log out
    </button>
  );
};

export default LogooutButton;
