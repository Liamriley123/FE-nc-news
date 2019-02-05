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

class App extends Component {
  state = {
    user: null
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Heading className="Heading" />
        <Nav />
        <Auth user={user} setUser={this.setUser}>
          <Router>
            <Home path="/" />
            <Articles path="/articles" />
            <Topics path="/topics" />
            <ArticlesByTopic path="/topics/:topic" />
            <Article path="/articles/:article_id" />
            <Comments path="/articles/:article_id/comments" />
          </Router>
        </Auth>
      </div>
    );
  }
  setUser = user => {
    this.setState({
      user
    });
  };
}

export default App;
