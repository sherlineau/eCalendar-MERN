const AppointmentController = require("../controllers/appointments.controller");

module.exports = (app) => {
  app.post(`/api/appointments/new`, AppointmentController.createAppointment);
  app.get(`/api/appointments`, AppointmentController.getAllAppointments);
  app.get(`/api/appointments/:_id`, AppointmentController.getOneAppointment);
  app.put(`/api/appointments/:_id`, AppointmentController.updateAppointment);
  app.delete(`/api/appointments/:_id`, AppointmentController.deleteAppointment);
};
