import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import DATA from './data';
import './CommentBox.css';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  loadCommentsFromServer = () => {
      fetch(this.props.url)
        .then(res => res.json())
        .then(comments => {
          this.setState({ data: comments})
        })
    }
    handleCommentSubmit = (comment) => {
      fetch(this.props.url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      redirect: "follow", // follows the redirect response
      body: JSON.stringify(comment), // body data type must match "Content-Type" header
  }).then(res => res.json())
  .then(comment => {
    this.loadCommentsFromServer();
  })
    .catch(err => {
       console.error(err);
     });

    }
    componentDidMount() {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }


  render() {
    return (
      <div className="container">
        <div className="comments">
          <h2>Comments:</h2>
          <CommentList data={this.state.data} />
        </div>
        <div className="form">
          <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
        </div>
      </div>
    );
  }
}

export default CommentBox;
