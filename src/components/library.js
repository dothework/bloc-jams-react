import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {

  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
   return (
     <section class='library'>
     {
       this.state.albums.map(album =>
         <Link to={`/album/${album.slug}`}>
         <img src={ album.albumCover } alt="album cover artwork"/>
         <div>{ album.title }</div>
         <div>{ album.artist }</div>
         <div>{ album.songs.length } songs</div>
         </Link>
       )
     }
     </section>
    )
  }
}

export default Library;
