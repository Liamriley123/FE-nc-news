import React, { Component } from "react";
import { getArticles, formatDate, getSortedArticles } from "./api";
import { Link } from "@reach/router";
import "./Articles.css";
import AddArticle from "./AddArticle";
import ErrHandle from "./ErrHandle";

class Articles extends Component {
  state = {
    articles: [],
    showAdd: false,
    sort: "created_at",
    order: "asc",
    limit: "5",
    page: 1,
    hasErr: false,
    error: ""
  };

  async componentDidMount() {
    const data = await getArticles();
    this.setState({ articles: data });
  }

  render() {
    const { hasErr, error } = this.state;
    if (hasErr) return <ErrHandle resetState={this.resetState} error={error} />;

    let { articles, showAdd } = this.state;
    const { user } = this.props;
    return (
      <div>
        <h2 className="articleHeading">Articles</h2>
        <button onClick={this.showAdder} className="showAdder">
          Add Article...
        </button>
        {showAdd && (
          <AddArticle fetchNewArticle={this.getNewArticle} user={user} />
        )}
        <div className="sortForm">
          <p id="sortLabel" className="sorterLabel">
            Sort By:
          </p>
          <select
            className="sorter"
            onChange={this.handleSortChange}
            defaultValue="created_at"
          >
            <option value="created_at">Date added</option>
            <option value="votes">Votes</option>
            <option value="author">Author</option>
            <option value="comment_count">Comments</option>
            <option value="title">Title</option>
          </select>
          <p id="orderLabel" className="sorterLabel">
            Order By:
          </p>
          <select
            className="sorter"
            onChange={this.handleOrderChange}
            defaultValue="asc"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <p id="pageLabel" className="sorterLabel">
            Articles Per Page:
          </p>
          <select
            className="sorter"
            onChange={this.handlePageChange}
            defaultValue="5"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
          <br />
          <button className="sortButton" onClick={this.handleSubmit}>
            SORT
          </button>
        </div>
        <div>
          <button onClick={this.prevPage} className="prevButton">
            Prev Page
          </button>{" "}
          <button onClick={this.nextPage} className="nextButton">
            Next Page
          </button>
        </div>

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
  getNewArticle = article => {
    this.setState(prevState => ({
      articles: [article, ...prevState.articles],
      showAdd: false
    }));
  };

  showAdder = () => {
    this.setState({
      showAdd: true
    });
  };
  handleSortChange = event => {
    this.setState({
      sort: event.target.value
    });
  };
  handleOrderChange = event => {
    this.setState({
      order: event.target.value
    });
  };
  handlePageChange = event => {
    this.setState({
      limit: event.target.value
    });
  };

  prevPage = () => {
    const { page } = this.state;
    page && this.setState({ page: page - 1 });
    this.handleSubmit();
  };

  nextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
    this.handleSubmit();
  };

  handleSubmit = event => {
    const { sort, order, limit, page } = this.state;
    getSortedArticles(sort, order, limit, page)
      .then(articles => {
        this.setState({
          articles
        });
      })
      .catch(console.log);
  };

  resetState = () => {
    this.setState({
      hasError: false,
      err: ""
    });
  };
}

export default Articles;
