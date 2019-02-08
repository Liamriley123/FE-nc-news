import React from "react";
import { Link } from "@reach/router";

const ErrHandle = props => {
  console.log(props);
  return (
    <div className="errorBox">
      <h1>OH NO!</h1>

      <button>
        <Link className="link" to="/">
          Go Back?
        </Link>
      </button>
    </div>
  );
};

export default ErrHandle;
