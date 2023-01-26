import React from "react";
import "./Section.css";

function Section({ Icon, title, color, selected }) {
  return (
    <div className="section">
      <div
        className="section__item"
        style={{
          color: `${selected && color}`,
          borderBottom: `3px solid ${color}`,
          backgroundColor: `${selected && "whitesmoke"}`,
        }}
      >
        <Icon />
        <p>{title}</p>
      </div>
    </div>
  );
}

export default Section;
