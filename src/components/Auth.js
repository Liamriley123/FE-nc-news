import React, { Component } from "react";
import { getUserByUsername } from "./api";
import "./Auth.css";

class Auth extends Component {
  state = {
    userText: "",
    userErr: null,
    userLoading: false
  };
  render() {
    const { user, children } = this.props;
    const { userText } = this.state;
    if (user) {
      return children;
    } else {
      return (
        <div>
          <h3 className="login">Please log in!</h3>
          <h3 className="login">go over to users to find a valid username</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              value={userText}
              placeholder="type username here.."
              onChange={this.handleChange}
            />
          </form>
          {this.state.userLoading && <p className="login">loading...</p>}
          {this.state.userErr && <h4 className="invalid">INVALID USERNAME</h4>}
        </div>
      );
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const { setUser } = this.props;
    const { userText } = this.state;
    this.setState({
      userLoading: true
    });
    getUserByUsername(userText)
      .then(({ user }) => {
        setUser(user);
      })
      .catch(err => {
        this.setState({
          userErr: err,
          userLoading: false
        });
      });
    this.setState({
      userText: ""
    });
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({
      userText: value,
      userErr: null
    });
  };
}

export default Auth;
