import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const Header: React.FC = () => {
  return (
    <>
      <Navbar
        style={{
          width: "100vw",
          minWidth: "790px",
        }}
        bg="dark"
        variant="dark"
      >
        <Nav
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "auto auto",
          }}
          className="mr-auto"
        >
          <Nav.Link as={Link} to="/myCourses">
            הקורסים שלי
          </Nav.Link>
          <Nav.Link as={Link} to="/add">
            הוספת קורס
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            בית
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
