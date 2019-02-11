import React, { Component } from "react";
import { Link } from "@reach/router";
import { getComments, formatDate, deleteData } from "./api";
import "./comments.css";
import Voter from "./Voter";
import AddComment from "./AddComment";

class Comments extends Component {
  state = {
    comments: [],
    showAdd: false
  };

  async componentDidMount() {
    const data = await getComments(this.props.article_id);
    this.setState({ comments: data });
  }

  render() {
    let { comments, showAdd } = this.state;
    let { user, article_id } = this.props;
    return (
      <div>
        <h2 className="articleHeading">Comments</h2>
        <button onClick={this.showAdder} className="showAdder">
          Add Comment...
        </button>
        {showAdd && (
          <AddComment
            article_id={article_id}
            getComment={this.getComment}
            user={user}
          />
        )}
        <div className="articleList">
          {comments.map(({ author, created_at, body, votes, comment_id }) => {
            return (
              <li key={comment_id}>
                {created_at && (
                  <p className="commentDate">Date: {formatDate(created_at)}</p>
                )}
                <p className="commentAuthor">Author: {author}</p>
                <p className="commentBody"> {body}</p>
                {user.username === author ? (
                  <button
                    onClick={() => this.handleDeleteComment(comment_id)}
                    className="delButton"
                  >
                    DELETE
                  </button>
                ) : (
                  <Voter
                    votes={votes}
                    comment_id={comment_id}
                    article_id={this.props.article_id}
                    parent="comments"
                  />
                )}
                <br />
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
  getComment = comment => {
    this.setState(prevState => {
      return { comments: [comment, ...prevState.comments], showAdd: false };
    });
  };

  showAdder = () => {
    this.setState({
      showAdd: true
    });
  };

  handleDeleteComment = commentid => {
    const remainingComments = this.state.comments.filter(remainingComment => {
      return remainingComment.comment_id !== commentid;
    });
    deleteData(this.props.article_id, commentid).then(data => {
      this.setState({ comments: remainingComments });
    });
  };
}

export default Comments;
