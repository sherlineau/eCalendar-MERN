const { AppointmentModel } = require("../models/appointments.model");
const User = require("../models/user.model");

class AppointmentController {
  // Create new Appointment
  createAppointment = async (req, res) => {
    try {
      const newAppointment = new AppointmentModel(req.body);
      await newAppointment.save();
      await User.findOneAndUpdate(
        { _id: newAppointment.userId },
        { $push: { appointments: newAppointment } }
      );
      res.json(newAppointment);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  // Read appointments
  getAllAppointments = (req, res) => {
    // sorts returned query in descending order
    AppointmentModel.find({})
      .sort({ createdAt: -1 })
      .then((appointments) => res.json(appointments))
      .catch((err) => res.status(400).json(err));
  };

  getOneAppointment = (req, res) => {
    AppointmentModel.findOne(req.params)
      .then((appointment) => res.json(appointment))
      .catch((err) => res.status(400).json(err));
  };

  // Update Appointments
  updateAppointment = (req, res) => {
    AppointmentModel.findOneAndUpdate(req.params, req.body, {
      new: true,
      runValidators: true,
    })
      .then((update) => res.json(update))
      .catch((err) => res.status(400).json(err));
  };

  // Delete Appointments
  deleteAppointment = (req, res) => {
    AppointmentModel.deleteOne(req.params)
      .then((deleteConfirm) => res.json(deleteConfirm))
      .catch((err) => res.json(err));
  };
}

module.exports = new AppointmentController();
