import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import AppointmentsPanel from '../components/AppointmentsPanel'
import Calendar from '../components/Calendar'
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const [appointments, setAppointments] = useState([])
  const [day, setDay] = useState(new Date());

  useEffect(()=> {
    axios.get(`https://ecalendar-api.onrender.com/api/user/getloggedinuser`, {withCredentials: true})
      .then(res => {
        setUser(res.data[0])
        setAppointments(res.data[0].appointments)
      })
      .catch(err => console.log(err))
  })

  const heading = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const handleClick = (day) =>
  {
    setDay(day)
  }

  return (
    <div className="section">
      <Calendar appointments={appointments} heading={heading} weekDays={weekDays} onClickProp={handleClick}/>
      <AppointmentsPanel appointments={appointments} heading={heading} weekDays={weekDays} day={day}  id={user._id}/>
    </div>
  )
}

export default Main