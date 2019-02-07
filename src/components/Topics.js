import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "./api";
import "./Topics.css";
import AddTopic from "./AddTopic";

class Topics extends Component {
  state = {
    topics: [],
    showAdd: false
  };

  async componentDidMount() {
    const data = await getTopics();
    this.setState({ topics: data });
  }

  render() {
    let { topics, showAdd } = this.state;
    return (
      <div>
        <h2 className="topicHeading"> Topics</h2>
        <button onClick={this.showAdder} className="showAdder">
          Add Topic...
        </button>
        {showAdd && <AddTopic getTopic={this.getTopic} />}
        <div className="topicContainer">
          {topics.map(({ slug, description }) => {
            return (
              <li className="topic" key={slug}>
                <h3 className="slug">
                  {slug[0].toUpperCase() + slug.substring(1)}{" "}
                </h3>
                <p className="desc">{description}</p>
                <Link id="linkToArticles" to={`/topics/${slug}`}>
                  View Articles
                </Link>
              </li>
            );
          })}
        </div>
      </div>
    );
  }
  getTopic = topic => {
    this.setState(prevState => ({
      topics: [topic, ...prevState.topics],
      showAdd: false
    }));
  };
  showAdder = () => {
    this.setState({
      showAdd: true
    });
  };
}

export default Topics;
