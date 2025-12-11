import React, { useState, useEffect } from "react";

function EventCard({ event }) {
  const [status, setStatus] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  const calculateStatus = () => {
    const now = new Date();
    const start = new Date(event.start);
    const end = new Date(event.end);

    if (now < start) {
      setStatus("Upcoming");
    } else if (now >= start && now <= end) {
      setStatus("Ongoing");
    } else {
      setStatus("Past");
    }
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const end = new Date(event.end);

    if (status === "Upcoming") {
      const diff = new Date(event.start) - now;
      const mins = Math.floor(diff / 60000);
      setTimeLeft(`${mins} min left to Start`);
    } else if (status === "Ongoing") {
      const diff = end - now;
      const mins = Math.floor(diff / 60000);
      setTimeLeft(`${mins} min left to End`);
    } else {
      setTimeLeft("Past");
    }
  };

  const endTime = event.end_time; // create stable variable
  useEffect(() => {
    calculateStatus();
    const interval = setInterval(calculateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === "Ongoing") {
      const timeout = setTimeout(() => {
        setStatus("Past");
        setTimeLeft("Past");
      }, endTime * 60 * 1000);

      return () => clearTimeout(timeout);
    }
  }, [status, endTime]);

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>Status: {status}</p>
      <p>{timeLeft}</p>
      <p>Starts: {event.start}</p>
      <p>Ends: {event.end}</p>
    </div>
  );
}

export default EventCard;
