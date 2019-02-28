import React, { Component } from "react";
import { getUserByUsername } from "./api";
import "./Auth.css";

class Auth extends Component {
  state = {
    userText: "",
    userErr: null
  };
  render() {
    const { user, children } = this.props;
    const { userText } = this.state;
    if (user) {
      return <div>{children}</div>;
    } else {
      return (
        <div>
          <h3 className="login">Please log in!</h3>
          <h3 className="login">
            Head over to the users page on the navigation bar and hover over a
            user to get their username and log in
          </h3>
          <form onSubmit={this.handleSubmit}>
            <input
              value={userText}
              placeholder="type username here.."
              onChange={this.handleChange}
              className="validation"
            />
          </form>
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
          userErr: err
          // userLoading: false
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
