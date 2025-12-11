import {
  faCalendarDays,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const events = [
  {
    name: "test demo",
    date: "24th April 2069",
    time: "2:30PM",
    venue: "home home",
    status: "Future",
    timer: true,
  },
];

function EventsHandler() {
  const eventDate = new Date("2025-04-24T14:30:00").getTime(); // Change time for events
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState("Future"); // Track status separately

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff <= 0) {
        setStatus("Ongoing");
        setTimeLeft("Ongoing");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(timerInterval);
  }, [eventDate]);

  return (
    <>
      {events.map((event, index) => (
        <div className="event-content-container fadein_fadeout" key={index}>
          <h2 style={{ fontFamily: "Font2" }} className="event-box">
            <br />
            <h2 style={{color: "#e7a129"}}>{event.name}</h2>
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
                color:
                  status === "Future"
                    ? "#ff9100"
                    : status === "Ongoing"
                    ? "green"
                    : "blue",
                border: "2px solid orange",
                borderRadius: "20px",
                width: "30%",
                transform: "translateX(130px)",
                padding: "8px",
              }}
            >
              {event.timer === true ? `${timeLeft}` : status}
            </p>
            <br />
          </h2>
        </div>
      ))}
    </>
  );
}

export default EventsHandler;
