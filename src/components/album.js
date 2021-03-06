import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './playerbar';
import './album.css';

class Album extends Component {

  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    })

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      currentVolume: 0.1,
      duration: album.songs[0].duration,
      isPlaying: false
    }

    this.audioElement = document.createElement('audio')
    this.audioElement.src = album.songs[0].audioSrc
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
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

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    this.audioElement.volume = e.target.value;
    this.setState({ currentVolume: this.audioElement.volume });
  }

  formatTime(time) {
    return time ? `${Math.floor(time / 60)}:${Number(time % 60 / 100).toFixed(2).substr(2,3)}` : '-:--'
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
      <PlayerBar
        isPlaying={this.state.isPlaying}
        currentSong={this.state.currentSong}
        currentTime={this.audioElement.currentTime}
        currentVolume={this.audioElement.volume}
        duration={this.audioElement.duration}
        formatTime={(t) => this.formatTime(t)}
        handleSongClick={() => this.handleSongClick(this.state.currentSong)}
        handlePrevClick={() => this.handlePrevClick()}
        handleNextClick={() => this.handleNextClick()}
        handleTimeChange={(e) => this.handleTimeChange(e)}
        handleVolumeChange={(e) => this.handleVolumeChange(e)}
      />
      </div>
    );
  }
}

export default Album;
