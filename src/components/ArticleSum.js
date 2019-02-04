import React from "react";
import "./Home.css";

const ArticleSum = ({ articles, label, name }) => {
  console.log(articles);
  return (
    <div className={`${name}`}>
      <label>{label}</label>
      {articles.map(({ title, author, votes }) => {
        return (
          <section key={title}>
            <p className="articleSumP">Author: {author}</p>
            <h3 className="articleSumTitle">{title}</h3>
            <p className="sumVotes">Votes: {votes}</p>
          </section>
        );
      })}
    </div>
  );
};

export default ArticleSum;
