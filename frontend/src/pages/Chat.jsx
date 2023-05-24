import React from 'react'
import Sidebar from '../components/Sidebar';
import MessageForm from '../components/MessageForm';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Chat() {
  const user = useSelector(state => state.user);
  
  return (
    <Container>
      <Row>
        <Col md={4}>
        {user &&
          <Sidebar />
        }
        </Col>
        <Col md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  )
}

export default Chat