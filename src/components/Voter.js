import React, { Component } from "react";
import axios from "axios";

class Voter extends Component {
  state = {
    voteChange: 0
  };
  render() {
    const { voteChange } = this.state;
    const { votes } = this.props;
    return (
      <div>
        <p className="votes">Votes: {voteChange + votes}</p>
        <button
          className="voteUp"
          disabled={voteChange > 0}
          type="submit"
          onClick={() => this.handleUpdateVote(1)}
        >
          UP
        </button>
        <button
          className="voteDown"
          disabled={voteChange < 0}
          type="submit"
          onClick={() => this.handleUpdateVote(-1)}
        >
          DOWN
        </button>
      </div>
    );
  }

  handleUpdateVote = direction => {
    const { parent } = this.props;

    this.setState(prevState => ({
      voteChange: prevState.voteChange + direction
    }));
    const { comment_id, article_id } = this.props;
    const reqStr =
      parent === "comments"
        ? `https://nc-news-lr.herokuapp.com/api/articles/${article_id}/comments/${comment_id}`
        : `https://nc-news-lr.herokuapp.com/api/articles/${article_id}`;
    const vote = {
      inc_votes: direction
    };
    axios.patch(reqStr, vote).then(res => {});
  };
}

export default Voter;
