import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {

  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    })

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false
    }

    this.audioElement = document.createElement('audio')
    this.audioElement.src = album.songs[0].audioSrc
  }

  play(song) {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause(song) {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song })
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause(song);
    } else {
      if (!isSameSong) { this.setSong(song) }
      this.play(song)
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
         { this.state.album.songs.map( (item, index) =>
           <tr className="song" key={index} onClick={() => this.handleSongClick(item)} >
             <td className="song-actions">
               <button>
                 <span className="song-number">{index+1}</span>
                 <span className="ion-play"></span>
                 <span className="ion-pause"></span>
               </button>
             </td>
             <td className="song-title">{item.title}</td>
             <td className="song-duration">{item.duration}</td>
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
