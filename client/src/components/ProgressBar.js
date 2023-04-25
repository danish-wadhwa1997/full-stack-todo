import React from "react";

const ProgressBar = ({ progress }) => {
  const colors = ["red", "orange", "green", "cyan"];

  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: color }}
      ></div>
    </div>
  );
};

export default ProgressBar;
