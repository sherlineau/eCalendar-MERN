import React, { useState } from "react";
import AppointmentsHeader from "./AppointmentsHeader";
import FormModal from "./FormModal";
import { AiOutlinePlus } from "react-icons/ai";

const AppointmentsPanel = (props) => {
  const { heading, weekDays, day, appointments, id } = props;
  const [showModal, setShowModal] = useState(false);
  const month = day.getMonth();

  // set background image based on month's season
  let season = "";

  switch (month) {
    case 2: {
      season = "spring";
      break;
    }
    case 3: {
      season = "spring";
      break;
    }
    case 4: {
      season = "spring";
      break;
    }
    case 5: {
      season = "summer";
      break;
    }
    case 6: {
      season = "summer";
      break;
    }
    case 7: {
      season = "summer";
      break;
    }
    case 8: {
      season = "fall";
      break;
    }
    case 9: {
      season = "fall";
      break;
    }
    case 10: {
      season = "fall";
      break;
    }
    default:
      season = "winter";
  }

  let filteredAppointments = [];
  for (let i = 0; i < appointments.length; i++) {
    let temp = new Date(appointments[i].start);
    if (temp.toDateString() === day.toDateString()) {
      filteredAppointments.push(appointments[i]);
    }
  }

  const closeModal = (modal) => {
    setShowModal(false);
  };

  return (
    <div className={`section-right ${season}`}>
      <AppointmentsHeader heading={heading} weekDays={weekDays} day={day} />
      <div className="events">
        <div className="top">
          <div className="line"></div>
          <div className="event-list">
            <table>
              {filteredAppointments.length === 0 ? (
                <thead>
                  <tr>
                    <th>No Appointments</th>
                  </tr>
                </thead>
              ) : (
                filteredAppointments.map((i, index) => {
                  let temp = new Date(i.start);
                  // format into readable time
                  let time = "";
                  if (temp.getHours() > 12) {
                    time = `${temp.getHours() - 12}:`;
                  } else {
                    time += `${temp.getHours()}:`;
                  }
                  if (temp.getMinutes() < 10) {
                    time += `0${temp.getMinutes()}`;
                  } else {
                    time += temp.getMinutes();
                  }
                  temp.getHours() > 12 ? (time += " PM") : (time += " AM");
                  return (
                    <tr key={index}>
                      <td>{`${time}`}</td>
                      <td>{i.title}</td>
                    </tr>
                  );
                })
              )}
            </table>
          </div>
        </div>
        <div className="bottom">
          <AiOutlinePlus
            className="plus-icon"
            onClick={(e) => setShowModal(!showModal)}
          />
        </div>
        <div className={`modal ${showModal ? "show-modal" : ""}`}>
          <FormModal onSubmitProp={closeModal} onClickProp={closeModal} userId={id}/>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPanel;
