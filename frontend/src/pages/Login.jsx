import React, { useState, useContext } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/appApi";
import "./css/Login.css";
import { AppContext } from "../context/appContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(
    //   `logging in with credentials\nemail: ${formData.email}\npassword: ${formData.password}`
    // );
    const email = formData.email;
    const password = formData.password;
    loginUser({email, password}).then(({data}) => {
      if (data) {
        console.log(data);
        socket.emit('new-user')
        navigate("/chat");
      }
    })
  };

  return (
    <Row>
      <Col md={6} className="login__background"></Col>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <Form style={{ width: "70%" }} onSubmit={handleSubmit}>
          <h1 className="text-center">Log In</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-1">
            Log In
          </Button>
          <div className="py-3">
            <p className="text-center">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
