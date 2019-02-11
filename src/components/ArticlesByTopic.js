import React, { Component } from "react";
import { Link } from "@reach/router";
import { getArticlesByTopic, formatDate } from "./api";
import ErrHandle from "./ErrHandle";

class ArticlesByTopic extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    getArticlesByTopic(this.props.topic).then(articles => {
      this.setState({ articles });
    });
    console.log(this.state);
  }

  render() {
    let { articles } = this.state;
    if (articles.length === 0) return <ErrHandle />;
    return (
      <div>
        <h2 className="articleHeading">Articles</h2>
        <div className="articleList">
          {articles.map(
            ({
              article_id,
              title,
              topic,
              author,
              created_at,
              comment_count,
              votes
            }) => {
              return (
                <li key={article_id}>
                  <p className="articleP">Author: {author}</p>
                  <h3 className="articleTitle">{title}</h3>
                  <p className="articlePTopic">Topic: {topic}</p>
                  <p className="articlePDate">Date: {formatDate(created_at)}</p>
                  <p className="comments">{comment_count} comments</p>
                  <p className="votes">Votes: {votes}</p>
                  <Link
                    className="buttonViewArticle"
                    to={`/articles/${article_id}`}
                  >
                    <p>View Article</p>
                  </Link>
                </li>
              );
            }
          )}
        </div>
      </div>
    );
  }
}

export default ArticlesByTopic;
