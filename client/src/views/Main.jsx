import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Calendar from '../components/Calendar'
import DaySquare from '../components/DaySquare'

const Main = () => {
  const [appointments, setAppointments] = useState([])
  const heading = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  useEffect(()=> {
    axios.get(`http://localhost:8000/api/appointments`)
      .then(res => setAppointments(res.data))
      .catch(err => console.log(err))
  })

  return (
    <div>
      <Calendar appointments={appointments} heading={heading} weekDays={weekDays} />
    </div>
  )
}

export default Main