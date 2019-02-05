import React, { Component } from "react";
import { getUserByUsername } from "./api";

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
          <h3>Please log in!</h3>;
          <form onSubmit={this.handleSubmit}>
            <input
              value={userText}
              placeholder="type username here.."
              onChange={this.handleChange}
            />
          </form>
          {this.state.userLoading && <p>loading...</p>}
          {this.state.userErr && <h4>no user found with this username</h4>}
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
