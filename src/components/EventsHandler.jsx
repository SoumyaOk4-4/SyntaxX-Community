import {
  faCalendarDays,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useCallback } from "react";

// EVENTS ARRAY (CUSTOM END TIME + START TIME)
const events = [
  {
    name: "test demo",
    date: "24th April 2069",
    time: "2:30PM",
    venue: "home home",
    start_time: "2025-04-24T14:30:00", // event start
    end_time: "2025-04-24T16:30:00",   // event end
    timer: true,
  },
];

function EventsHandler() {
  const event = events[0];

  const [status, setStatus] = useState("Upcoming");
  const [timeLeft, setTimeLeft] = useState("");

  // ✅ Calculate event status
  const calculateStatus = useCallback(() => {
    const now = new Date();
    const start = new Date(event.start_time);
    const end = new Date(event.end_time);

    if (now < start) {
      setStatus("Upcoming");
    } else if (now >= start && now <= end) {
      setStatus("Ongoing");
    } else {
      setStatus("Past");
    }
  }, [event.start_time, event.end_time]);

  // ✅ Calculate countdown
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const start = new Date(event.start_time);
    const end = new Date(event.end_time);

    if (status === "Upcoming") {
      const diff = start - now;
      const mins = Math.floor(diff / 60000);
      setTimeLeft(`${mins} min left to Start`);
    } else if (status === "Ongoing") {
      const diff = end - now;
      const mins = Math.floor(diff / 60000);
      setTimeLeft(`${mins} min left to End`);
    } else {
      setTimeLeft("Past");
    }
  }, [status, event.start_time, event.end_time]);

  // STATUS CHECK LOOP
  useEffect(() => {
    calculateStatus();
    const interval = setInterval(calculateStatus, 60000);
    return () => clearInterval(interval);
  }, [calculateStatus]);

  // TIME LEFT LOOP
  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  // FORCE PAST AFTER END TIME
  useEffect(() => {
    if (status === "Ongoing") {
      const now = new Date().getTime();
      const end = new Date(event.end_time).getTime();
      const diff = end - now;

      const timeout = setTimeout(() => {
        setStatus("Past");
        setTimeLeft("Past");
      }, diff);

      return () => clearTimeout(timeout);
    }
  }, [status, event.end_time]);

  // STATUS COLOR
  const getColor = () => {
    if (status === "Upcoming") return "#ff9100"; // orange
    if (status === "Ongoing") return "green";
    return "blue";
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
                color: getColor(),
                border: "2px solid orange",
                borderRadius: "20px",
                width: "30%",
                transform: "translateX(130px)",
                padding: "8px",
              }}
            >
              {event.timer ? timeLeft : status}
            </p>

            <br />
          </h2>
        </div>
      ))}
    </>
  );
}

export default EventsHandler;
