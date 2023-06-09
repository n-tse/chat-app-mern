import React, { useState, useRef, useEffect, useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { BsFillSendFill } from "react-icons/bs";
import "./css/MessageForm.css";
import defaultPicture from "../assets/default-avatar-profile-icon.jpg";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

function MessageForm() {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const { socket, currentRoom, messages, setMessages, privateMemberMsg } =
    useContext(AppContext);
  const latestMessageRef = useRef(null);

  const scrollToBottom = () => {
    latestMessageRef.current?.scrollIntoView({ behavior: "instant"});
  }

  useEffect(() => scrollToBottom(), [messages]);

  const getTodaysDate = () => {
    const date = new Date();
    // console.log(date);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    // console.log(month + "/" + day + "/" + year)
    return month + "/" + day + "/" + year;
  };

  const getCurrentTime = () => {
    const today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    const amOrPm = hours < 12 ? "AM" : "PM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const time = `${hours}:${minutes} ${amOrPm}`;
    return time;
  };

  // 'off' removes any existing event listeners from 'room-messages' event
  // 'on' attaches a fresh event listener
  // helps to prevent potential issues eg: multiple event handlers being triggered for the same event
  // ensures that only the latest event listener is active for that event
  socket.off("room-messages").on("room-messages", (roomMessages) => {
    // console.log('roomMessages', roomMessages);
    setMessages(roomMessages);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    // console.log(e.target[0].value);
    // console.log(getCurrentTime());
    socket.emit(
      "new-room-message",
      currentRoom,
      message,
      user,
      getCurrentTime(),
      getTodaysDate()
    );
    setMessage("");
  };

  return (
    <div className="message-form-container">
      <div className="messages-window">
        {!user && <div className="alert alert-danger">Please log in</div>}
        {user && privateMemberMsg?._id && (
          <div className="alert alert-info d-flex">
            Your direct messages with {privateMemberMsg.name}
            <img
              src={privateMemberMsg.picture || defaultPicture}
              style={{
                width: 25,
                height: 25,
                objectFit: "cover",
                borderRadius: "50%",
                marginLeft: 5
              }}
            />
          </div>
        )}
        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="message-date-indicator">{date}</p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div
                    className={
                      sender._id === user._id ? "your-message" : "their-message"
                    }
                    key={msgIdx}
                  >
                    <div className="sender-container">
                      <img
                        src={sender.picture || defaultPicture}
                        style={{
                          width: 25,
                          height: 25,
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                      <p className="message-sender">
                        {sender._id === user?._id ? "You" : sender.name}
                      </p>
                    </div>
                    <div className="message">
                      <p className="message-content">{content}</p>
                      <p className="message-time-stamp">{time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
          <div ref={latestMessageRef}/>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row style={{ width: "100%", margin: "auto" }}>
          <Col sm={11} style={{ paddingRight: 0 }}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!user}
                id={!user ? "no-user" : ""}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={1}>
            <span id={!user ? "no-user" : ""}>
              <Button
                type="submit"
                style={{ backgroundColor: "blueviolet" }}
                disabled={!user}
              >
                <BsFillSendFill />
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default MessageForm;
