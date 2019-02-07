import React, { Component } from "react";
import axios from "axios";
import "./AddArticle.css";

class AddComment extends Component {
  state = {
    body: ""
  };
  render() {
    const { user } = this.props;
    const { body } = this.state;

    return (
      <div className="addArtHolder">
        <form onSubmit={this.handleSubmit}>
          <div className="topAddArticleForm">
            <textarea
              id="body"
              type="text"
              onChange={this.handleChange}
              value={body}
              placeholder="Body"
              required
            />
            <br />
          </div>
          <div className="postingAsBox">
            <img className="postingImg" src={user.avatar_url} alt="avatar" />
            <p className="postingAs">Commenting as: {user.username}</p>
            <button id="addArticleButton">Add Comment</button>
          </div>
        </form>
      </div>
    );
  }
  handleChange = event => {
    const { id } = event.target;
    this.setState({
      [id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.addComment();
    this.setState({
      body: ""
    });
  };

  addComment = () => {
    const { article_id, user, getComment } = this.props;
    const { body } = this.state;
    const com = {
      username: user.username,
      body: body
    };

    axios
      .post(
        `https://nc-news-lr.herokuapp.com/api/articles/${article_id}/comments`,
        com
      )
      .then(({ data }) => {
        let comment = data.comment;
        comment = { ...comment, author: user.username };
        delete comment.username;
        getComment(comment);
      });
  };
}

export default AddComment;
