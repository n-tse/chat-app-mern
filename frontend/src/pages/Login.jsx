import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import "./css/Login.css"

function Login() {
  return (
      <Row>
        <Col md={6} className="login__background"></Col>
        <Col md={6} className='d-flex flex-direction-column align-items-center justify-content-center'>
          <Form style={{width:"70%"}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-1'>
              Log In
            </Button>
            <div className='py-3'>
              <p className='text-center'>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
  );
}

export default Login;
