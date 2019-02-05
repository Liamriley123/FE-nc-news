import React from "react";
import { Link } from "@reach/router";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/">HOME </Link>
      <Link to="/articles">ARTICLES </Link>
      <Link to="/topics">TOPICS </Link>
      <Link to="/users">USERS</Link>
    </nav>
  );
};

export default Nav;
