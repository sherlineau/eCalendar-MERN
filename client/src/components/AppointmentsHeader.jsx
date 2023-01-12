import React from 'react'
import LogooutButton from './LogooutButton'

const AppointmentsHeader = (props) => {
  const { heading, weekDays, day } = props

  return (
    <div className='appointment-header'>
      <div>
        <h2>{weekDays[day.getDay()]}</h2>
        <h1>{`${heading[day.getMonth()]} ${day.getDate()}`}</h1>
      </div>
      <LogooutButton />
    </div>
  )
}

export default AppointmentsHeader