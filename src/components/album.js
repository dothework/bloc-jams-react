import React, { Component } from 'react';

class Album extends Component {
  render() {
    return (
      <div>
        { this.props.match.params.slug } Album will go here 
      </div>
    );
  }
}

export default Album;
