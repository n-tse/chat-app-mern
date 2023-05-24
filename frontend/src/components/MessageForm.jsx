import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { BsFillSendFill } from "react-icons/bs";
import "./css/MessageForm.css";
import { useSelector } from "react-redux";

function MessageForm() {
  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
  };

  return (
    <div className="message-form-container">
      <div className="messages-window">
        {!user && <div className="alert alert-danger">Please log in</div>}
      </div>
      <Form onSubmit={handleSubmit}>
        <Row style={{ width: "100%", margin: "auto" }}>
          <Col sm={11} style={{ paddingRight: 0 }}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Type a message..."
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
