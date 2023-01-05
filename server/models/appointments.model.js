const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    userId: String,
    title: {
      type: String,
      required: [true, " is required"],
      minLength: [3, "Title must be at least 3 characters"],
    },
    start: {
      type: Date,
      required: [true, " is required"],
    },
    end: {
      type: Date,
      required: [true, " is required"],
    },
    people: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = {
  Appointment: mongoose.model("Appointment", AppointmentSchema),
  AppointmentSchema
}
