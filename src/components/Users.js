import React, { Component } from "react";
import { getUsers } from "./api";
import "./Users.css";

class Users extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const data = await getUsers();
    this.setState({ users: data });
  }

  render() {
    let { users } = this.state;
    return (
      <div>
        <h2 className="articleHeading">users</h2>
        <div className="articleList">
          {users.map(({ name, avatar_url, username }) => {
            return (
              <div className="holder">
                <div className="container">
                  <img src={avatar_url} alt="user" className="avatars" />
                  <div className="overlay">
                    <h3 className="articleTitle">{username}</h3>
                    <p className="articleP">name: {name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Users;
