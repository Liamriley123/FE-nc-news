import React from "react";

const Heading = () => {
  return (
    <div className="headerWrapper">
      <div className="logged">
        <h3>
          <img alt="hello" />
          logged in as:
        </h3>
      </div>
      <h1 className="title">NC-News</h1>
    </div>
  );
};

export default Heading;
