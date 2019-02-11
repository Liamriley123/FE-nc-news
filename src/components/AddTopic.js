import React, { Component } from "react";
import axios from "axios";
import "./AddArticle.css";

class AddTopic extends Component {
  state = {
    title: "",
    slug: ""
  };
  render() {
    const { title, slug } = this.state;

    return (
      <div className="addArtHolder">
        <form onSubmit={this.handleSubmit}>
          <div className="topAddArticleForm">
            <input
              id="title"
              type="text"
              onChange={this.handleChange}
              value={title}
              placeholder="title"
              required
            />
            <br />
            <input
              id="slug"
              type="text"
              onChange={this.handleChange}
              value={slug}
              placeholder="description"
              required
            />
            <br />
            <button id="addArticleButton">Add Topic</button>
          </div>
        </form>
      </div>
    );
  }
  handleChange = event => {
    const { id } = event.target;
    this.setState({
      [id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.addTopic();
    this.setState({
      title: "",
      slug: ""
    });
  };

  addTopic = () => {
    const { getTopic } = this.props;
    const { title, slug } = this.state;
    const top = {
      slug: title,
      description: slug
    };

    axios
      .post(`https://nc-news-lr.herokuapp.com/api/topics`, top)
      .then(({ data }) => {
        let topic = data.topic;
        getTopic(topic);
      });
  };
}

export default AddTopic;
