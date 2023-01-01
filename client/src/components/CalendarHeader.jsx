import React from 'react'

const CalendarHeader = (props) => {
  const { month, year, heading } = props

  return (
    <div className='calendar-header'>
      <div className="top">
        <h1>eCalendar</h1>
        <h2>{year}</h2>
      </div>
      <div className="bottom">
        <p className="greyed-out">
        {
          month === 0 ? heading[11] : heading[month-1]
        }
        </p>
        <h1>{heading[month]}</h1>
        <p className="greyed-out">
        {
          month === 11 ? heading[0] : heading[month+1]
        }
        </p>
      </div>
    </div>
  )
}

export default CalendarHeader