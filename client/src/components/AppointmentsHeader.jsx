import React from 'react'

const AppointmentsHeader = (props) => {
  const { heading, weekDays, day } = props

  return (
    <div className='appointment-header'>
      <h2>{weekDays[day.getDay()]}</h2>
      <h1>{`${heading[day.getMonth()]} ${day.getDate()}`}</h1>
    </div>
  )
}

export default AppointmentsHeader