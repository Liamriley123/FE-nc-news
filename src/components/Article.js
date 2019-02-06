import React, { Component } from "react";
import { getArticleById, formatDate } from "./api";
import { Link } from "@reach/router";
import Voter from "./Voter";

class Article extends Component {
  state = {
    article: []
  };

  async componentDidMount() {
    const data = await getArticleById(this.props.article_id);
    this.setState({ article: data });
    console.log(data);
  }

  render() {
    let { article } = this.state;
    console.log(article.created_at);
    return (
      <div>
        <h2 className="articleHeading">Articles</h2>
        <div className="articleList">
          <li key={article.article_id}>
            <p className="articleP">Author: {article.author}</p>
            <h3 className="oneArticleTitle">{article.title}</h3>
            <p className="articlePTopic">Topic: {article.topic}</p>
            <p className="articlePDate">
              Date: {article.created_at && formatDate(article.created_at)}
            </p>
            <p className="body">{article.body}</p>
            <p className="comments">{article.comment_count} comments</p>
            <Voter votes={article.votes} article_id={article.article_id} />

            <div className="buttonGrid">
              <Link className="buttonBack" to={`/articles`}>
                <p>Back</p>
              </Link>
              <Link
                className="buttonViewComments"
                to={`/articles/${article.article_id}/comments`}
              >
                <p>View Comments</p>
              </Link>
            </div>
          </li>
        </div>
      </div>
    );
  }
}

export default Article;
