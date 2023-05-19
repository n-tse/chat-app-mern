import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Signup.css";
import defaultPicture from "../assets/default-avatar-profile-icon.jpg";
import { BsCloudUploadFill } from "react-icons/bs";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [hasPicture, setHasPicture] = useState(false);

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      //1mb
      return alert("Max file size exceeded (1mb)");
    } else {
      setHasPicture(true);
      setProfilePic(file);
      setPicturePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert(
      `signed up with: name ${formData.name}, email ${formData.email}, password ${formData.password}`
    );
  };

  return (
    <Row>
      <Col md={6} className="signup__background"></Col>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <Form style={{ width: "70%" }} onSubmit={handleSignup}>
          <h1 className="text-center">Create an account</h1>
          <div className="signup-profile-picture-container">
            <img
              src={picturePreview || defaultPicture}
              className="signup-profile-picture"
            />
            {hasPicture && (
              <div className="edit-image-textprompt">
                Edit Image
                <label
                  htmlFor="edit-image-upload"
                  className="edit-image-upload-label"
                ></label>
                <input
                  type="file"
                  id="edit-image-upload"
                  hidden
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={validateImg}
                />
              </div>
            )}
            <label htmlFor="image-upload" className="image-upload-label">
              {!hasPicture && (
                <BsCloudUploadFill className="upload-picture-icon" />
              )}
            </label>
            <input
              type="file"
              id="image-upload"
              hidden
              accept="image/png, image/jpeg, imaFge/jpg"
              onChange={validateImg}
            />
          </div>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
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
            Sign Up
          </Button>
          <div className="py-3">
            <p className="text-center">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Signup;
