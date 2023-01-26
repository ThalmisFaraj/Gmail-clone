import React from "react";
import "./SidebarOptions.css";

function SidebarOptions({ Icon, title, number, selected, onClick }) {
  return (
    <div className="sidebar__options" onClick={onClick}>
      <Icon />
      <h3>{title}</h3>
      <p>{number}</p>
    </div>
  );
}

export default SidebarOptions;
