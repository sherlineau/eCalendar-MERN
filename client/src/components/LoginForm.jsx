import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const { onClickProp } = props;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const demoUser = { email: "test@test.com", password: "password" };

  const changeHandler = (e) => {
    let { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`/api/login`, user, {
        withCredentials: true,
      })
      .then((res) => navigate("/dashboard"))
      .catch((err) => console.log(err.response));
  };

  const DemoUser = (e) => {
    axios
      .post(`/api/login`, demoUser, {

        withCredentials: true,
      })
      .then((res) => navigate("/dashboard"))
      .catch((err) => console.log(err.response));
  };

  const clickHandler = (e) => {
    onClickProp(true);
  };

  return (
    <div className="user">
      <div className="m-5 mx-auto" style={{ width: "500px" }}>
        <h1>eCalendar</h1>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label className="form-label">Email</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <button onClick={(e) => clickHandler()} className="mt-3 btn btn-link">
            New User? Register here!
          </button>
          <div className="d-grid mt-3">
            <div className="btn-group">
              <button onClick={(e) => DemoUser()} className="btn btn-primary">Demo User</button>
              <button className="btn btn-warning"> Login </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
