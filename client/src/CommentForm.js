import React, { Component } from 'react';


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', text: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  getLocation = () => {
    fetch("http://maps.googleapis.com/maps/api/geocode/json?latlng="+ this.props.latitude + "," + this.props.longitude +"&sensor=false")
      .then(res => res.json())
      .then(location => {
        console.log(location)
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    let latitude= this.props.lat;
    let longitude= this.props.long;

    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author: author,
                                 text: text,
                                 location:{
                                  coordinates: [
                                    longitude: longitude,
                                    latitude: latitude,
                                  ]
                                 }});
    this.setState({ author: '', text: '' });
  }
  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Your name...'

          value={ this.state.author }
          onChange={ this.handleAuthorChange } />
        <input
          type='text'
          placeholder='Say something...'

          value={ this.state.text }
          onChange={ this.handleTextChange } />
        <input
          type='submit'

          value='Post'/>
      </form>
    )
  }
}

export default CommentForm;
