import React, { Component } from "react";
import { getArticleById } from "./api";

class Article extends Component {
  state = {
    article: []
  };

  async componentDidMount() {
    const data = await getArticleById(this.props.topic);
    this.setState({ article: data });
    console.log(data);
  }

  render() {
    let { article } = this.state;
    return (
      <div>
        <h2 className="articleHeading">Articles</h2>
        <div className="articleList">
          return (
          <li key={article_id}>
            <p className="articleP">Author: {article.author}</p>
            <h3 className="articleTitle">{article.title}</h3>
            <p className="articlePTopic">Topic: {article.topic}</p>
            <p className="articlePDate">
              Date: {formatDate(article.created_at)}
            </p>
            <p className="comments">{article.comment_count} comments</p>
            <p className="votes">Votes: {article.votes}</p>
          </li>
          ); } )}
        </div>
      </div>
    );
  }
}

export default Article;
