import React, { useState } from "react";
import axios from "axios";

const RegisterForm = (props) => {
  const { onClickProp } = props;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      .post(`http://localhost:8000/api/user/register`, user, {
        withCredentials: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };

  const clickHandler = (e) => {
    onClickProp(true);
  };

  return (
    <div className="user">
      <div className="m-5 mx-auto" style={{ width: "500px" }}>
        <h1>eCalendar</h1>
        <h1>Registration</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">E-mail</label>
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
          <div>
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div className="btn-group mt-3 ">
            <button onClick={(e) => clickHandler()} className="btn btn-danger" >Back</button>
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
