import React from "react";
import { Link } from "@reach/router";
import "./Nav.css";

const Nav = ({ user, logOut }) => {
  console.log(user);
  return (
    <nav className="nav">
      <Link to="/">HOME </Link>
      <Link to="/articles">ARTICLES </Link>
      <Link to="/topics">TOPICS </Link>
      <Link to="/users">USERS</Link>
      {user && (
        <p className="logOutLink" onClick={logOut}>
          LOG-OUT
        </p>
      )}
    </nav>
  );
};

export default Nav;
