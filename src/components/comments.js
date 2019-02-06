import React, { Component } from "react";
import { Link } from "@reach/router";
import { getComments, formatDate } from "./api";
import "./comments.css";
import Voter from "./Voter";

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
                <Voter
                  votes={votes}
                  comment_id={comment_id}
                  article_id={this.props.article_id}
                  parent="comments"
                />
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
