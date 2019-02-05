import React, { Component } from "react";
import { Link } from "@reach/router";
import { getComments, formatDate } from "./api";
import "./comments.css";

class Comments extends Component {
  state = {
    comments: []
  };

  async componentDidMount() {
    const data = await getComments(this.props.article_id);
    this.setState({ comments: data });
  }

  render() {
    let { comments } = this.state;
    return (
      <div>
        <h2 className="articleHeading">Comments</h2>
        <div className="articleList">
          {comments.map(({ author, created_at, body, votes, comment_id }) => {
            return (
              <li key={comment_id}>
                <p className="commentDate">Date: {formatDate(created_at)}</p>
                <p className="commentAuthor">Author: {author}</p>
                <p className="commentBody"> {body}</p>
                <p className="votes">Votes: {votes}</p>
                <Link
                  className="buttonBack"
                  to={`/articles/${this.props.article_id}`}
                >
                  <p>Back</p>
                </Link>
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Comments;
