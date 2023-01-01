import React, { useState } from 'react'
import axios from 'axios'

const FormModal = () => {
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [people, setPeople] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    let start = new Date(`${startDate}T${startTime}`)
    let end = new Date(`${endDate}T${endTime}`)
    console.log({title,start,end,people,location,description});
    axios
      .post(`http://localhost:8000/api/appointments`, 
        { title, start, end, people, location, description })
      .then( res => console.log(res))
      .catch( err => console.log(err))
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" value={title} onChange={ e => setTitle(e.target.value) } />
      
      <label>Start Date</label>
      <input type="date"  value={startDate} onChange={ e => setStartDate(e.target.value) }/>
    
      <label>End Date</label>
      <input type="date"  value={endDate} onChange={ e => setEndDate(e.target.value) }/>
    
      <label>Start Time</label>
      <input type="time"  value={startTime} onChange={ e => setStartTime(e.target.value) }/>
    
      <label>End Time</label>
      <input type="time"  value={endTime} onChange={ e => setEndTime(e.target.value) }/>
    
      <label>People</label>
      <input type="text" value={people} onChange={ e => setPeople(e.target.value) } />
      
      <label>Location</label>
      <input type="text" value={location} onChange={ e => setLocation(e.target.value) } />
      
      <label>Description</label>
      <input type="text" value={description} onChange={ e => setDescription(e.target.value) } />
      
      <button>Submit</button>
    </form>
  )
}

export default FormModal