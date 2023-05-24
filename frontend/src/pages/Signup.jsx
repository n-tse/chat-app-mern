import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Signup.css";
import defaultPicture from "../assets/default-avatar-profile-icon.jpg";
import { BsCloudUploadFill } from "react-icons/bs";

// like a hook that gives us a signup function and an object with the loading state
import { useSignupUserMutation } from "../services/appApi";

function Signup() {
  const [formData, setFormData] = useState({
    name: "Abc",
    email: "test@example.com",
    password: "abc",
  });

  const [signupUser, { isLoading, error }] = useSignupUserMutation();

  const [profilePic, setProfilePic] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [hasPicture, setHasPicture] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

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

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", profilePic);
    data.append("upload_preset", "wlormaj2");
    try {
      setIsImageUploading(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dvscluwbp/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setIsImageUploading(false);
      return urlData.url;
    } catch (e) {
      setIsImageUploading(false);
      console.log(e);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!profilePic) return alert("Please add a profile picture");
    const url = await uploadImage(profilePic);
    console.log("cloudinary image upload url:", url);
    // alert(
    //   `signed up with: name ${formData.name}, email ${formData.email}, password ${formData.password}`
    // );

    // sign up the user
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
        console.log(data);
      }
    });
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
            {isImageUploading ? "Creating your account..." : "Sign up"}
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
