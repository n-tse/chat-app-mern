import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import {BsChatDotsFill} from 'react-icons/bs';
import './css/Home.css';


function Home() {
  return (
    <Row>
      <Col md={6} className='d-flex flex-direction-column align-items-center justify-content-center'>
        <div>
          <h1>Chat with your friends</h1>
          <p>Log in or sign up to start chatting now!</p>
          <LinkContainer to="/chat">
            <Button variant='primary'>
              Start Chatting
              <BsChatDotsFill style={{marginLeft:5}}/>
            </Button>
          </LinkContainer>
        </div>
      </Col>
      <Col md={6} className='home__background'></Col>
    </Row>
    // <div>home</div>
  )
}

export default Home