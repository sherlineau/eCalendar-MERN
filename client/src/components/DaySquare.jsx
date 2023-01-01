import React from 'react'

const DaySquare = (props) => {
  const { appointment } = props
  const start = new Date(appointment.start)
  const end = new Date(appointment.end)
  return (
    <div>
      {start.toLocaleTimeString()}
    </div>
  )
}

export default DaySquare