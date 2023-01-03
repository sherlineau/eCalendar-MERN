import React, { useState } from "react";
import axios from "axios";

const FormModal = (props) => {
  const { onSubmitProp, onClickProp } = props;
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [people, setPeople] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let start = new Date(`${startDate}T${startTime}`);
    let end = new Date(`${endDate}T${endTime}`);
    axios
      .post(`http://localhost:8000/api/appointments`, {
        title,
        start,
        end,
        people,
        location,
        description,
      })
      .then((res) => onSubmitProp(res.json))
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

  const handleClick = (e) => {
    onClickProp(false);
  };

  return (
    <div className="form-container">
      <h1>Create Appointment/Event</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-label mt-3">
          Title
          {errors["title"] ? (
            <span style={{ color: "red" }}>{errors["title"]}</span>
          ) : (
            ""
          )}
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />

        <label className="form-label mt-3">
          Start Date
          {errors["start"] ? (
            <span style={{ color: "red" }}>{errors["start"]}</span>
          ) : (
            ""
          )}
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control"
        />

        <label className="form-label mt-3">
          End Date
          {errors["end"] ? (
            <span style={{ color: "red" }}>{errors["end"]}</span>
          ) : (
            ""
          )}
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control"
        />

        <label className="form-label mt-3">
          Start Time
          {errors["start"] ? (
            <span style={{ color: "red" }}>{errors["start"]}</span>
          ) : (
            ""
          )}
        </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="form-control"
        />

        <label className="form-label mt-3">
          End Time
          {errors["end"] ? (
            <span style={{ color: "red" }}>{errors["end"]}</span>
          ) : (
            ""
          )}
        </label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="form-control"
        />

        <label className="form-label mt-3">People</label>
        <input
          type="text"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          className="form-control"
        />

        <label className="form-label mt-3">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="form-control"
        />

        <label className="form-label mt-3">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />

        <div className="mt-3 btn-group">
          <button onClick={(e) => handleClick()} className="btn btn-outline-danger">Cancel</button>
          <button type="submit" className="btn btn-outline-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormModal;
