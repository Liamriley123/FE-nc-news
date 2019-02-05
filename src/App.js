import React, { Component } from "react";
import "./App.css";
import Heading from "./components/Heading";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Topics from "./components/Topics";
import ArticlesByTopic from "./components/ArticlesByTopic";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading className="Heading" />
        <Nav />
        <Router>
          <Home path="/" />
          <Articles path="/articles" />
          <Topics path="/topics" />
          <ArticlesByTopic path="/topics/:topic" />
        </Router>
      </div>
    );
  }
}

export default App;
