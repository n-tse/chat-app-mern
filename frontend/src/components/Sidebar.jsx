import React from "react";
import { ListGroup } from "react-bootstrap";

function Sidebar() {
  const rooms = ["annoucements", "general", "fun/games", "random"];
  return (
    <div className="sidebar-container">
      <h2>Rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item key={idx}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Sidebar;
