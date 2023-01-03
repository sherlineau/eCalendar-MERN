import React, { useEffect } from "react";
import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

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
    let tempArr = [];

    // this loops goes through the appointments array and add them to the correct date objects event
    // IF it is the .toDateString() is the same
    for (let i = 0; i < appointments.length; i++) {
      let appoint_start = new Date(appointments[i].start).toDateString();
      if (appoint_start === tempDate.toDateString()) {
        tempArr.push(appointments[i]);
      }
    }

    let tempObj = {
      date: tempDate,
      events: tempArr,
    };
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

const Calendar = (props) => {
  const { heading, weekDays, appointments, onClickProp } = props;
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [calendar, setCalendar] = useState({});

  // on load get appointments from api and load calendar
  useEffect(() => {
    setCalendar(getCalendar(year, month + 1, appointments));
  }, [year, month, appointments]);

  const { prevCalendarMonth, currCalendarMonth, nextCalendarMonth } = calendar;

  // on click functions
  const pastMonth = (e) => {
    let tempMonth = month;
    let tempYear = year;
    if (tempMonth === 0) {
      tempMonth = 11;
      tempYear--;
    } else {
      tempMonth--;
    }
    setYear(tempYear);
    setMonth(tempMonth);
    setCalendar(getCalendar(tempYear, tempMonth + 1, appointments));
  };

  const nextMonth = (e) => {
    let tempMonth = month;
    let tempYear = year;
    if (tempMonth === 11) {
      // increment to next year and set month to index 0 [january]
      tempMonth = 0;
      tempYear++;
    } else {
      // get next month
      tempMonth++;
    }
    setYear(tempYear);
    setMonth(tempMonth);
    setCalendar(getCalendar(tempYear, tempMonth + 1, appointments));
  };

  // sends "date" that was clicked back to parent Main.jsx to be used for Events panel
  const handleOnClick = (day) => {
    onClickProp(day);
  };

  return (
    <div className="section-left">
      <CalendarHeader month={month} year={year} heading={heading} />
      <div className="content">
        <div className="calendar-buttons">
          <AiOutlineArrowLeft onClick={(e) => pastMonth()} className="button" />
        </div>
        <div className="calendar">
          {weekDays.map((w, i) => {
            return (
              <div className="weekday" key={i}>
                {w.substring(0, 3).toUpperCase()}
              </div>
            );
          })}
          {prevCalendarMonth
            ? prevCalendarMonth.map((day, index) => {
                return (
                  <div className="square greyed-out" key={index}>
                    <span className="day-number">{day}</span>
                  </div>
                );
              })
            : ""}
          {currCalendarMonth
            ? currCalendarMonth.map((day, index) => {
                return (
                  <div
                    key={index}
                    onClick={(e) => handleOnClick(day.date)}
                    className="square"
                  >
                    <div
                      className={`square-top day-number ${
                        day.date.getMonth() === today.getMonth() &&
                        day.date.getDate() === today.getDate()
                          ? "today"
                          : ""
                      }`}
                    >
                      {day.date.getDate()}
                    </div>
                    <div className="square-bottom">
                      {day.events
                        ? day.events.map((i,index) => {
                            return <div className="dot" key={index} />;
                          })
                        : ""}
                    </div>
                  </div>
                );
              })
            : ""}
          {nextCalendarMonth
            ? nextCalendarMonth.map((day, index) => {
                return (
                  <div className="square greyed-out" key={index}>
                    <span className="day-number">{day}</span>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="calendar-buttons">
          <AiOutlineArrowRight onClick={(e) => nextMonth()} className="button" />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
