import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import "./css/Signup.css"
import defaultPicture from "../assets/default-avatar-profile-icon.jpg";

function Signup() {
  return (
    <Row>
        <Col md={6} className="signup__background"></Col>
        <Col md={6} className='d-flex flex-direction-column align-items-center justify-content-center'>
          <Form style={{width:"70%"}}>
              <h1 className='text-center'>Create an account</h1>
              <div className='signup-profile-picture-container'>
                <img src={defaultPicture} className='signup-profile-picture' style={{width:20, height:20}}/>
              </div>
              <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-1'>
              Sign Up
            </Button>
            <div className='py-3'>
              <p className='text-center'>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
  )
}

export default Signup