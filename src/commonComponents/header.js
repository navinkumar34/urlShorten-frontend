import React from "react";
import { Navbar } from "reactstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar
      light
      expand="md"
      style={{
        background: `linear-gradient(to right, #ff416c, #ff4b2b)`,
        fontFamily: `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif`,
        fontWeight: "300"
      }}
    >
      <NavLink to="/" className="navbar-brand">
        Shorten-URL
      </NavLink>
    </Navbar>
  );
};

export default Header;
