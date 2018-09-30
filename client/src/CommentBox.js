import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import DATA from './data';
import './CommentBox.css';
require('dotenv').config();

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      longitude: 0,
      latitude: 0
 };
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


getCoords = () => {
  if (navigator.geolocation) { //check if geolocation is available
            navigator.geolocation.getCurrentPosition(position =>{
              console.log(position);
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });

            });
        }
}


getLocation = () => {
  var key = process.env.key;

  fetch("http://maps.googleapis.com/maps/api/geocode/json?latlng="+ this.state.latitude + "," + this.state.longitude +"&sensor=false&key=" + key )
    .then(res => res.json())
    .then(location => {
      console.log(location)
    })
}



    componentDidMount() {
      this.loadCommentsFromServer();
      // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
      this.getCoords()
      this.getLocation()
      debugger

    }


  render() {
    return (
      <div className="container">
        <div className="comments">
          <h2>Comments:</h2>
          <CommentList data={this.state.data} />
        </div>
        <div className="form">
          <CommentForm onCommentSubmit={ this.handleCommentSubmit } lat={this.state.latitude} long={this.state.longitude}/>
        </div>
      </div>
    );
  }
}

export default CommentBox;
