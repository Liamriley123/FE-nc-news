import React from "react";
import "./Home.css";
import { Link } from "@reach/router";

const ArticleSum = ({ articles, label, name }) => {
  return (
    <div className={`${name}`}>
      <label>{label}</label>
      {articles.map(({ title, author, votes, article_id }) => {
        return (
          <section key={title}>
            <p className="articleSumP">Author: {author}</p>
            <h3 className="articleSumTitle">{title}</h3>
            <p className="sumVotes">Votes: {votes}</p>
            <Link className="buttonViewArticle" to={`/articles/${article_id}`}>
              <p>View Article</p>
            </Link>
          </section>
        );
      })}
    </div>
  );
};

export default ArticleSum;
