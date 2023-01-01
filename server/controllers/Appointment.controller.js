const { Appointment } = require("../models/appointments.model");

module.exports = {
  // Create Function
  newAppointment: (req, res) => {
    Appointment.create(req.body)
      .then((appointment) => res.json(appointment))
      .catch((err) => res.status(400).json(err));
  },

  // Read Functions
  getAllAppointments: (req, res) => {
    Appointment.find()
      .then((appointments) => res.json(appointments))
      .catch((err) => res.status(400).json(err));
  },

  // Update Function
  updateAppointment: (req, res) => {
    Appointment.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedAppointment) => res.json(updatedAppointment))
      .catch((err) => res.status(400).json(err));
  },

  // Delete Function
  deleteAppointment: (req, res) => {
    Appointment.deleteOne({ _id: req.params.id })
      .then((appointment) => res.json(appointment))
      .catch((err) => res.status(400).json(err));
  },
};
