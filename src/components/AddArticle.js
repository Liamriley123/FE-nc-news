import React, { Component } from "react";
import axios from "axios";
import * as api from "./api";
import "./AddArticle.css";
import ErrHandle from "./ErrHandle";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    username: this.props.user.username,
    topics: [],
    hasError: false,
    error: ""
  };
  render() {
    const { user } = this.props;
    const { topics, title, body, topic, hasError, error } = this.state;
    if (hasError) return <ErrHandle error={error} />;

    return (
      <div className="addArtHolder">
        <form onSubmit={this.handleSubmit}>
          <div className="topAddArticleForm">
            <input
              id="title"
              type="text"
              onChange={this.handleChange}
              value={title}
              placeholder="Title"
              required
            />
            <br />

            <textarea
              id="body"
              type="text"
              onChange={this.handleChange}
              value={body}
              placeholder="Body"
              required
            />
            <br />
            <label className="selectLabel" htmlFor="topic">
              Topic
            </label>
            <br />
            <div className="categories">
              <select
                className="selectTopic"
                id="topic"
                value={topic}
                onChange={this.handleChange}
                required
              >
                <option />
                {topics.map(topic => {
                  return (
                    <option key={topic.slug} id={topic} value={topic.slug}>
                      {topic.slug}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="postingAsBox">
            <img className="postingImg" src={user.avatar_url} alt="avatar" />
            <p className="postingAs">Posting as: {user.username}</p>
            <button id="addArticleButton">Add Article</button>
          </div>
        </form>
      </div>
    );
  }
  componentDidMount = () => {
    this.setTopicArray();
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { title, username, body, topic } = this.state;
    const { fetchNewArticle } = this.props;

    const art = {
      username: username,
      body: body,
      title: title
    };

    axios
      .post(
        `https://nc-news-lr.herokuapp.com/api/topics/${topic}/articles`,
        art
      )
      .then(({ data }) => {
        let article = data.article;
        article = { ...article, author: article.username };
        fetchNewArticle(article);
      })
      .then(() => {
        this.setState({
          username: "",
          body: "",
          title: ""
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };
  setTopicArray = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState({
          topics
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };
}

export default AddArticle;
