const AppointmentController = require("../controllers/Appointment.controller")

module.exports = app => {
  app.get('/api/appointments', AppointmentController.getAllAppointments)
  app.post('/api/appointments', AppointmentController.newAppointment)
  app.put('/api/appointments/:id', AppointmentController.updateAppointment)
  app.delete('/api/appointments/:id', AppointmentController.deleteAppointment)
}