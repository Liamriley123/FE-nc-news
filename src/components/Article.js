import React, { Component } from "react";
import { getArticleById, formatDate, deleteData } from "./api";
import { Link, navigate } from "@reach/router";
import Voter from "./Voter";
import ErrHandle from "./ErrHandle";

class Article extends Component {
  state = {
    article: [],
    error: null
  };

  componentDidMount() {
    getArticleById(this.props.article_id)
      .then(article => {
        this.setState({ article });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  render() {
    let { user } = this.props;

    const { article, error } = this.state;
    if (error) return <ErrHandle resetState={this.resetState} error={error} />;
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
            {user.username === article.author ? (
              <button onClick={this.handleDeleteArticle} className="delButton">
                DELETE
              </button>
            ) : (
              <Voter votes={article.votes} article_id={article.article_id} />
            )}
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
  handleDeleteArticle = () => {
    const articleid = this.state.article.article_id;
    deleteData(articleid).then(() => {
      navigate("/articles");
    });
  };
  resetState = () => {
    this.setState({
      hasError: false,
      err: ""
    });
  };
}

export default Article;
