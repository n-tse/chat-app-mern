import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { AppContext } from "../context/appContext";

function Sidebar() {
  const rooms = ["announcements", "general", "fun/games", "random"];
  const { socket } = useContext(AppContext);
  socket.off('new-user').on('new-user', (payload) => {
    console.log(payload);
  })
  
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
