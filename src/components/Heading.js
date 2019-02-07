import React from "react";

const Heading = user => {
  return (
    <div className="headerWrapper">
      <div className="logged">
        {user.user && (
          <h4>
            logged in as: {user.user.username}{" "}
            <img alt="hello" src={user.user.avatar_url} className="userImg" />
          </h4>
        )}
      </div>
      <h1 className="title">NC-News</h1>
    </div>
  );
};

export default Heading;
