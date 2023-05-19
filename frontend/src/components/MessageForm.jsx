import React from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import {BsFillSendFill} from 'react-icons/bs';


function MessageForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="message-form-container">
      <div className="messages">messages</div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={11} style={{paddingRight:0}}>
            <Form.Group>
              <Form.Control type="text" placeholder="Type a message..."></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={1}>
            <Button type="submit" style={{backgroundColor:"blueviolet"}}><BsFillSendFill/></Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default MessageForm;
