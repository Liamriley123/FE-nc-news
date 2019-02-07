import React, { Component } from "react";
import ArticleSum from "./ArticleSum";
import { getRecentArticles, getTopArticles } from "./api";
import "./Home.css";

class Home extends Component {
  state = {
    recentArticles: [],
    topArticles: []
  };
  async componentDidMount() {
    const recent = await getRecentArticles();
    const recentArticles = recent.slice(0, 3);
    const top = await getTopArticles();
    const topArticles = top.slice(0, 3);
    this.setState({ topArticles, recentArticles });
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h2 className="homeTitle">Welcome to NC-News</h2>
        <h3 className="homeSlug">
          {user
            ? `Welcome Back ${user.name}`
            : "Log in to use all of the websites features..."}
        </h3>
        <div className="sumContainer">
          <ArticleSum
            articles={this.state.recentArticles}
            label="RECENT ARTICLES"
            name="recent"
          />
          <ArticleSum
            articles={this.state.topArticles}
            label="TOP ARTICLES"
            name="top"
          />
        </div>
        <div className="home" />
      </div>
    );
  }
}

export default Home;
