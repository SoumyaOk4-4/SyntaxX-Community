import {
  faCalendarDays,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useCallback } from "react";

// EVENTS ARRAY
const events = [
  {
    name: "future reunion",
    date: "1th January 2069",
    time: "12:00PM",
    venue: "dead sea",
    start_time: "2069-01-01T12:00:00",
    end_time: "2069-01-01T12:30:00",
    timer: true,
  },
  {
    name: "test demo",
    date: "24th April 2026",
    time: "2:30PM",
    venue: "home home",
    start_time: "2025-12-11T18:39:00",
    end_time: "2025-12-11T18:40:00",
    timer: true,
  },
];

function EventsHandler() {
  // STATE FOR ALL EVENTS
  const [eventStates, setEventStates] = useState(
    events.map(() => ({
      status: "Upcoming",
      timeLeft: "",
    }))
  );

  // FORMAT FUNCTION
  const formatTime = (ms) => {
    if (ms <= 0) return "0s";

    const sec = Math.floor(ms / 1000);
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    return `${d > 0 ? d + "d " : ""}${h}h ${m}m ${s}s`;
  };

  // PROCESS EACH EVENT SEPARATELY
  const updateAllEvents = useCallback(() => {
    const newStates = events.map((event, index) => {
      const now = new Date();
      const start = new Date(event.start_time);
      const end = new Date(event.end_time);

      let status = "Upcoming";
      let timeLeft = "";

      if (now < start) {
        status = "Upcoming";
        timeLeft = `${formatTime(start - now)} Upcoming`;

      } else if (now >= start && now <= end) {
        status = "Ongoing";
        timeLeft = `${formatTime(end - now)} Ongoing`;

      } else {
        status = "Past Event";
        timeLeft = "Past Event";
      }

      return { status, timeLeft };
    });

    setEventStates(newStates);
  }, []);

  // UPDATE EVERY SECOND
  useEffect(() => {
    updateAllEvents();
    const interval = setInterval(updateAllEvents, 1000);
    return () => clearInterval(interval);
  }, [updateAllEvents]);

  const getColor = (status) => {
    if (status === "Upcoming") return "#ff9100";
    if (status === "Ongoing") return "green";
    return "red";
  };

  return (
    <>
      {events.map((event, index) => (
        <div className="event-content-container fadein_fadeout" key={index}>
          <h2 style={{ fontFamily: "Font2" }} className="event-box">
            <br />
            <h2 style={{ color: "#e7a129" }}>{event.name}</h2>
            <br />

            <p style={{ color: "rgb(157, 157, 157)" }}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ color: "#4b9eec", fontSize: "1.2rem" }}
              />{" "}
              {event.date}
            </p>

            <p style={{ color: "rgb(157, 157, 157)" }}>
              <FontAwesomeIcon
                icon={faClock}
                style={{ color: "#4b9eec", fontSize: "1.2rem" }}
              />{" "}
              {event.time}
            </p>

            <p style={{ color: "rgb(157, 157, 157)" }}>
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ color: "#4b9eec", fontSize: "1.2rem" }}
              />{" "}
              {event.venue}
            </p>

            <br />

            <p
              className="event-stat"
              style={{
                color: getColor(eventStates[index].status),
                border: "2px solid orange",
                borderRadius: "20px",
                width: "60%",
                textAlign: "center",
                padding: "8px",
              }}
            >
              {event.timer ? eventStates[index].timeLeft : eventStates[index].status}
            </p>

            <br />
          </h2>
        </div>
      ))}
    </>
  );
}

export default EventsHandler;
