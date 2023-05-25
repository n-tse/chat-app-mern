import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from '../features/userSlice';
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
  const dispatch = useDispatch();

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
    // upon entering room, dispatch redux action to reset notifications
    dispatch(resetNotifications(room));

    socket.off('notifications').on('notifications', (room) => {
      dispatch(addNotifications(room));
    })
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

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false)
  }

  return (
    <div className="sidebar-container">
      <div className="group-section">
        <h2>Rooms</h2>
        <ListGroup>
          {rooms.map((room, idx) => (
            <ListGroup.Item key={idx} style={{cursor:"pointer", backgroundColor: room === currentRoom ? 'turquoise' : 'inherit', color: room === currentRoom ? 'white' : 'inherit'}} onClick={() => joinRoom(room)}>{room} {currentRoom !== room && <span className="badge rounded-pill bg-danger">{user.newMessages[room]}</span>}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="group-section">
        <h2>Members</h2>
        <ListGroup>
          {members.map((member, idx) => (
            <ListGroup.Item key={idx} style={{cursor: "pointer", backgroundColor: privateMemberMsg?._id === member?._id ? 'turquoise' : 'inherit', color: privateMemberMsg?._id === member?._id ? 'white' : 'inherit'}} onClick={() => handlePrivateMemberMsg(member)}>
              {member.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Sidebar;
