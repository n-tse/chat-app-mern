import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { AppContext } from "../context/appContext";
import "./css/Sidebar.css";

function Sidebar() {
  const {
    socket,
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    privateMemberMsg,
    setPrivateMemberMsg,
  } = useContext(AppContext);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  const joinRoom = (room, isPublic = true) => {
    socket.emit('join-room', room);
    setCurrentRoom(room);
    if(isPublic) {
      setPrivateMemberMsg(null);
    }
  }

  socket.off("new-user").on("new-user", (payload) => {
    // console.log("payload:", payload);
    setMembers(payload);
  });

  function getRooms() {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  return (
    <div className="sidebar-container">
      <div className="group-section">
        <h2>Rooms</h2>
        <ListGroup>
          {rooms.map((room, idx) => (
            <ListGroup.Item key={idx} style={{cursor:"pointer"}} onClick={() => joinRoom(room)} active={room === currentRoom}>{room}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="group-section">
        <h2>Members</h2>
        <ListGroup>
          {members.map((member, idx) => (
            <ListGroup.Item key={idx} style={{ cursor: "pointer" }}>
              {member.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Sidebar;
