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

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let appointments = [
  {
    _id: "63b0f76f91897df2445fe193",
    title: "wer",
    start: "2022-12-07T02:49:00.000Z",
    end: "2022-12-07T02:49:00.000Z",
    people: "asdf",
    location: "asdf",
    description: "asdf",
    createdAt: "2023-01-01T03:01:03.163Z",
    updatedAt: "2023-01-01T03:01:03.163Z",
    __v: 0,
  },
  {
    _id: "63b0f78091897df2445fe195",
    title: "wer",
    start: "2022-12-07T02:49:00.000Z",
    end: "2022-12-07T02:49:00.000Z",
    people: "asdf",
    location: "asdf",
    description: "asdf",
    createdAt: "2023-01-01T03:01:20.557Z",
    updatedAt: "2023-01-01T03:01:20.557Z",
    __v: 0,
  },
  {
    _id: "63b112a591897df2447ab5d7",
    title: "testing filtered appointments by month",
    start: "2023-01-25T17:00:00.000Z",
    end: "2023-01-26T18:00:00.000Z",
    people: "",
    location: "",
    description: "",
    createdAt: "2023-01-01T04:57:09.162Z",
    updatedAt: "2023-01-01T04:57:09.162Z",
    __v: 0,
  },
  {
    _id: "63b1cab5a0c92b746d9625ed",
    title: "testing dots",
    start: "2023-01-02T18:02:00.000Z",
    end: "2023-01-02T19:02:00.000Z",
    people: "",
    location: "",
    description: "",
    createdAt: "2023-01-01T18:02:29.066Z",
    updatedAt: "2023-01-01T18:02:29.066Z",
    __v: 0,
  },
];

const test = getCalendar(year, month + 1, appointments);

for(let i = 0; i < test.currCalendarMonth.length ; i++) {
  if (test.currCalendarMonth[i].events.length > 0) {
    console.log(test.currCalendarMonth[i].events);
  }
}