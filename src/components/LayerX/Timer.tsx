import React, { useEffect, useState } from 'react';

type TimeAgoProps = {
  timestamp: string | number | Date;
};

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const [timeAgoText, setTimeAgoText] = useState<string>('');

  // Function to calculate "time ago" similar to your existing logic
  const calculateTimeAgo = (timestamp: string | number | Date) => {
    const now = new Date();
    const timeDiff = now.getTime() - new Date(timestamp).getTime();

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Approximation
    const years = Math.floor(days / 365); // Approximation

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (days < 7) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (weeks < 4) {
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  };

  // Update time ago every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgoText(calculateTimeAgo(timestamp));
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [timestamp]);

  return <span>{timeAgoText}</span>;
};

export default TimeAgo;