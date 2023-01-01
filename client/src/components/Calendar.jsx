import axios from "axios";
import React from "react";
import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";


/* TODO: 
1. create a day object for each date of the CURRENT month
2. go through appointments and add them to "date" object
3. render previous/next months days to fill "6 weeks" if month does not start on sunday
*/

const getCalendar = (year, month, appointments) => {
  // initialize empty arrays for each section of month
  // prev/next month days only need the date numbers since they wont be "clickable"
  const prevCalendarMonth = [];
  const currCalendarMonth = [];
  const nextCalendarMonth = [];

  let prevMonthLastDay = new Date(year, month - 1, 0).getDate();
  if (month === 0) {
    prevMonthLastDay = new Date(year - 1, month - 1, 0).getDate();
  }

  // get current months first and last day of month
  // first day will be used to get the weekday 0-6 -> 4 = Thursday
  // last day will determine how many squares we need to generate for the current month
  let firstDayMonth = new Date(year, month - 1, 1);
  let lastDayMonth = new Date(year, month, 0);

  // this loop adds the prevs months last days to my array based on the day the 1st of current month lands on.
  // ex -> firstDayMonth.getDay() returns 4 for thursday.. I need the previous months last days between sunday-wednesday
  for (let i = 0; i < firstDayMonth.getDay(); i++) {
    prevCalendarMonth.push(prevMonthLastDay);
    prevMonthLastDay--;
  }

  prevCalendarMonth.sort();

  // create object for each day of month
  for (let i = 1; i <= lastDayMonth.getDate(); i++) {
    // tempDate is a Date instance for each day
    let tempDate = new Date(year, month - 1, i);
    let tempObj = {
      date: tempDate,
      events: [],
    };

    // this loops goes through the appointments array and add them to the correct date objects event
    // IF it is the .toDateString() is the same 
    for (let i = 0; i < appointments.length; i++) {
      let appoint_start = new Date(appointments[i].start).toDateString();
      if( appoint_start === tempDate.toDateString()) {
        tempObj.events.push(appointments[i])
      }
    }
    currCalendarMonth.push(tempObj);
  }

  // I want the calendar to display six weeks -> 6 weeks * 7 days = 42days
  // check if the length of currentCalendarMonth is not 42
  // only run code to add remaining days, since the next month starts with 1 i just need to increment from one depending on how many remaining days I need
  if (currCalendarMonth.length + prevCalendarMonth.length !== 42) {
    let remaining = 43 - (currCalendarMonth.length + prevCalendarMonth.length);
    for (let i = 1; i < remaining; i++) {
      nextCalendarMonth.push(i);
    }
  }

  return { prevCalendarMonth, currCalendarMonth, nextCalendarMonth };
};

const getFilteredAppointments = ( year, month, appointments) => {
  let filtered = []
  if (appointments !== null) {
    for( let i = 0; i < appointments.length; i++) {
      let temp = new Date(appointments[i].start)
      if (temp.getMonth() === month && temp.getFullYear() === year ) {
        filtered.push(appointments[i])
      }
    }
  }
  return filtered
}

const Calendar = ( props ) => {
  const { appointments, heading, weekDays } = props
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today);
  const [filtered, setFiltered] = useState(getFilteredAppointments( year, month, appointments ))

  // on load get appoints from database and FILTER it for the current month

  // get calendar based on month 
  const [calendar, setCalendar] = useState(getCalendar(year, month + 1 , filtered))
  const { prevCalendarMonth, currCalendarMonth, nextCalendarMonth } = calendar;

  // on click functions
  const pastMonth = async(e) => {
    let temp = month
    let tempYear = year
    if (temp === 0) {
      temp = 11;
      tempYear--;
    } else {
      temp--;
    }
    setYear(tempYear);
    setMonth(temp);
    await setFiltered(getFilteredAppointments(tempYear, temp , appointments))
    setCalendar(getCalendar(tempYear,temp,filtered))
  }

  const nextMonth = async(e) => {
    let temp = month
    let tempYear = year
    if (temp === 11) {
      // increment to next year and set month to index 0 [january]
      temp = 0;
      tempYear++;
    } else {
      // get next month
      temp++;
    }
    setYear(tempYear);
    setMonth(temp);
    await setFiltered(getFilteredAppointments(tempYear, temp , appointments))
    setCalendar(getCalendar(tempYear,temp,filtered))
  }

  const handleClick = day => {
    setDay(day)
  }

  return (
    <div className="section">
    <div className="section-left">
      <CalendarHeader month={month} year={year} heading={heading} />
      <div className="content">
        <div className="calendar-buttons">
          <AiOutlineArrowLeft onClick={(e) => pastMonth()} className="btn" />
        </div>
        <div className="calendar">
          {weekDays.map((w, i) => {
            return (
              <div className="weekday" key={i}>
                {w.substring(0, 3).toUpperCase()}
              </div>
            );
          })}
          {prevCalendarMonth.map((day, index) => {
            return (
              <div className="square greyed-out" key={index}>
                <span className="day-number">{day}</span>
              </div>
            );
          })}
          {currCalendarMonth.map((day, index) => {
            return (
              <div
                key={index}
                onClick={(e) => handleClick(day.date)}
                className="square"
              >
                <span
                  className={`day-number ${
                    day.date.getMonth() === today.getMonth() &&
                    day.date.getDate() === today.getDate()
                      ? "today"
                      : ""
                  }`}
                >
                  {day.date.getDate()}
                </span>
              </div>
            );
          })}
          {nextCalendarMonth.map((day, index) => {
            return (
              <div className="square greyed-out" key={index}>
                <span className="day-number">{day}</span>
              </div>
            );
          })}
        </div>
        <div className="calendar-buttons">
          <AiOutlineArrowRight onClick={(e) => nextMonth()} className="btn" />
        </div>
      </div>
    </div>
  </div>
    )
};

export default Calendar;
