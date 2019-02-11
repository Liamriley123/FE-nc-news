import React, { Component } from "react";
import "./App.css";
import Heading from "./components/Heading";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Topics from "./components/Topics";
import ArticlesByTopic from "./components/ArticlesByTopic";
import Article from "./components/Article";
import Comments from "./components/comments";
import Auth from "./components/Auth";
import Users from "./components/Users";
import ErrHandle from "./components/ErrHandle";

class App extends Component {
  state = {
    user: null
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Heading className="Heading" user={user} />
        <Nav user={user} logOut={this.logOut} />
        <Router>
          {user ? (
            <Articles user={user} path="/articles" />
          ) : (
            <Auth user={user} setUser={this.setUser} path="/articles" />
          )}
          {user ? (
            <Topics user={user} path="/topics" />
          ) : (
            <Auth user={user} setUser={this.setUser} path="/topics" />
          )}
          {user ? (
            <ArticlesByTopic user={user} path="/topics/:topic" />
          ) : (
            <Auth user={user} setUser={this.setUser} path="/topics/:topic" />
          )}
          {user ? (
            <Article user={user} path="/articles/:article_id" />
          ) : (
            <Auth
              user={user}
              setUser={this.setUser}
              path="/articles/:article_id"
            />
          )}
          {user ? (
            <Comments user={user} path="/articles/:article_id/comments" />
          ) : (
            <Auth
              user={user}
              setUser={this.setUser}
              path="/articles/:article_id/comments"
            />
          )}
          <Home path="/" user={user} />
          <Users path="/users" />
          <ErrHandle default />
        </Router>
      </div>
    );
  }

  componentDidMount = () => {
    const user = sessionStorage.getItem("user");
    if (user) this.setUser(JSON.parse(user));
  };

  setUser = user => {
    this.setState({
      user
    });
    sessionStorage.setItem("user", JSON.stringify(user));
  };
  logOut = () => {
    this.setState({
      user: null
    });
    sessionStorage.setItem("user", null);
  };
}

export default App;
