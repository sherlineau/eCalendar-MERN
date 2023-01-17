import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {
  const navigate = useNavigate();
  const { onClickProp } = props;
  const [errors, setErrors] = useState([]);
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
      .post(`/api/register`, user, {
        withCredentials: true,
      })
      .then((res) => navigate("/dashboard"))
      .catch((err) => {
        // temp variable to store all our messages
        const errorMessages = {};
        const errorResponse = err.response.data.errors;
        for (const key in errorResponse) {
          errorMessages[key] = errorResponse[key].message;
        }
        setErrors(errorMessages);
      });
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
            <label className="form-label">
              First Name
              {errors["firstName"] ? (
                <span style={{ color: "red" }}>{errors["firstName"]}</span>
              ) : (
                ""
              )}
            </label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">
              Last Name{" "}
              {errors["lastName"] ? (
                <span style={{ color: "red" }}>{errors["lastName"]}</span>
              ) : (
                ""
              )}
            </label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">
              E-mail{" "}
              {errors["email"] ? (
                <span style={{ color: "red" }}>{errors["email"]}</span>
              ) : (
                ""
              )}
            </label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">
              Password{" "}
              {errors["password"] ? (
                <span style={{ color: "red" }}>{errors["password"]}</span>
              ) : (
                ""
              )}
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">
              Confirm Password{" "}
              {errors["confirmPassword"] ? (
                <span style={{ color: "red" }}>
                  {errors["confirmPassword"]}
                </span>
              ) : (
                ""
              )}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div className="btn-group mt-3 ">
            <button onClick={(e) => clickHandler()} className="btn btn-danger">
              Back
            </button>
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
