import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, ListGroup, Row } from "react-bootstrap";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";
import "./css/Sidebar.css";
import defaultPicture from "../assets/default-avatar-profile-icon.jpg";
import { BsFillCircleFill } from "react-icons/bs";

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
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);
    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    // upon entering room, dispatch redux action to reset notifications
    dispatch(resetNotifications(room));

    socket.off("notifications").on("notifications", (room) => {
      dispatch(addNotifications(room));
    });
  };

  socket.off("new-user").on("new-user", (payload) => {
    // console.log("payload:", payload);
    setMembers(payload);
  });

  function getRooms() {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  // so that room id's match regardless of which user opens the DM
  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };

  const handlePrivateMemberMsg = (member) => {
    if (member?._id === user._id) return;
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };

  return (
    <div className="sidebar-container">
      <div className="group-section">
        <h2>Channels</h2>
        <div className="group-display">
          {rooms.map((room, idx) => (
            <div
              key={idx}
              className={
                currentRoom === room
                  ? "group-item-tab selected-item"
                  : "group-item-tab other-item"
              }
              onClick={() => joinRoom(room)}
            >
              {room}{" "}
              {currentRoom !== room && (
                <span className="badge rounded-pill bg-danger">
                  {user.newMessages[room]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="group-section">
        <h2>People</h2>
        <div className="group-display">
          {members.map((member, idx) => {
            return (
              <div key={idx} className={privateMemberMsg?._id === member?._id ? "group-item-tab selected-item" : "group-item-tab other-item"} id={member?._id === user._id && "disable"} onClick={() => handlePrivateMemberMsg(member)}>
                <Row>
                  <Col xs={2}>
                    <div className="member-status">
                      <img
                        src={member.picture || defaultPicture}
                        className="member-status-img"
                      />
                      {member.status === "online" ? (
                        <BsFillCircleFill className="sidebar-online-status" />
                      ) : (
                        <BsFillCircleFill className="sidebar-offline-status" />
                      )}
                    </div>
                  </Col>
                  <Col xs={10}>
                    {member.name} {member._id === user._id && " (You)"}
                    {member.status === "offline" && " (Offline)"}
                    <span className="badge rounded-pill bg-danger">
                      {user.newMessages[orderIds(member._id, user._id)]}
                    </span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
