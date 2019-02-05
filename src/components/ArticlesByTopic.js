import React, { Component } from "react";
import { Link } from "@reach/router";
import { getArticlesByTopic, formatDate } from "./api";

class ArticlesByTopic extends Component {
  state = {
    articles: []
  };

  async componentDidMount() {
    const data = await getArticlesByTopic(this.props.topic);
    this.setState({ articles: data });
  }

  render() {
    let { articles } = this.state;
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
