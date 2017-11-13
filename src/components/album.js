import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {

  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    })

    this.state = {
      album: album
    }
  }

  render() {
    return (
      <div>
      <section id="album-info">
        <img id="album-cover-art" src={this.state.album.albumCover} alt="album cover artwork"/>
        <div className="album-details">
          <h1 id="album-title">{ this.state.album.title }</h1>
          <h2 className="artist">{ this.state.album.artist }</h2>
          <div id="release-info">{ this.state.album.releaseInfo }</div>
        </div>
      </section>
      <table id="song-list">
        <colgroup>
          <col id="song-number-column" />
          <col id="song-title-column" />
          <col id="song-duration-column" />
        </colgroup>
        <tbody>
        {
          this.state.album.songs.map((item, index)  =>
            <tr className="album-view-song-item">
            <td className="song-item-number" data-song-number={index}>{index+1}</td>
            <td className="song-item-title">{ item.title }</td>
            <td className="song-item-duration">{item.duration }</td>
            </tr>
          )
        }
        </tbody>
      </table>
      </div>
    );
  }
}

export default Album;
