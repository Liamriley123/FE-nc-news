import React from "react";
import { Link } from "@reach/router";
import "./ErrHandle.css";

const ErrHandle = ({ error }) => {
  return (
    <div className="errorBox">
      <h1>OH NO!</h1>
      {error ? (
        <h3>
          Error: {error.response.status} {error.response.statusText}
        </h3>
      ) : (
        <h3>404</h3>
      )}
      <button className="goHome">
        <Link className="link" to="/">
          Go Home
        </Link>
      </button>
    </div>
  );
};

export default ErrHandle;
