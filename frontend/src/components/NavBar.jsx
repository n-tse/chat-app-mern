import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import chatapplogo from "../assets/chatapplogo.png";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../services/appApi";

function NavBar() {
  // useSelector allows us to have access to our state
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    await logoutUser(user);
    // navigate back to home page
    window.location.replace("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={chatapplogo}
              style={{ width: 60, height: 60, margin: 5 }}
            />
            My Chat App
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>
              </>
            )}
            <LinkContainer to="/chat">
              <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
            {user && (
              <NavDropdown
                title={
                  <div style={{display:"inline-flex" , alignItems:"center"}}>
                    {user.name}
                    <img
                      src={user.picture}
                      style={{
                        height: 25,
                        width: 25,
                        objectFit: "cover",
                        borderRadius: "50%",
                        marginLeft: 5
                      }}
                    />
                  </div>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => alert("logged out")}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
