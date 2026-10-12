import React, { useEffect, useState } from "react";

export const useCountdown = (endsAt) => {
  const getRemaining = () => {
    const difference = new Date(endsAt).getTime() - Date.now();

    if (!Number.isFinite(difference) || difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, ended: true };
    }

    const totalSeconds = Math.floor(difference / 1000);

    return {
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
      ended: false,
    };
  };

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    setRemaining(getRemaining());

    const interval = setInterval(() => {
      setRemaining(getRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [endsAt]);

  return remaining;
};

export const Countdown = ({ endsAt }) => {
  const time = useCountdown(endsAt);

  if (time.ended) {
    return <p className="timer">Subasta finalizada</p>;
  }

  return (
    <p className="timer" aria-live="polite">
      {String(time.hours).padStart(2, "0")}:
      {String(time.minutes).padStart(2, "0")}:
      {String(time.seconds).padStart(2, "0")}
    </p>
  );
};