import React, { Component } from "react";
import ArticleSum from "./ArticleSum";
import { getArticles, getTopArticles } from "./api";
import "./Home.css";

class Home extends Component {
  state = {
    recentArticles: [],
    topArticles: []
  };
  async componentDidMount() {
    const recent = await getArticles();
    const recentArticles = recent.slice(0, 3);
    const top = await getTopArticles();
    const topArticles = top.slice(0, 3);
    this.setState({ topArticles, recentArticles });
    console.log(recentArticles);
  }

  render() {
    console.log(this.state.topArticles);
    return (
      <div>
        <h2 className="homeTitle">Welcome to NC-News</h2>
        <h3 className="homeSlug">
          Log in to use all of the websites features...
        </h3>
        <div className="sumContainer">
          <ArticleSum
            articles={this.state.recentArticles}
            label="RECENT"
            name="recent"
          />
          <ArticleSum
            articles={this.state.topArticles}
            label="TOP"
            name="top"
          />
        </div>
        <div className="home" />
      </div>
    );
  }
}

export default Home;
