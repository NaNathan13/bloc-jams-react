import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
		  hovered: null,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;


  }

  formatTime(toFormat) {
    const minutes = Math.floor(toFormat / 60);
    const seconds = Math.round(toFormat % 60);
    if (seconds < 10 ) {
      return minutes + ':0' + seconds;
    } else if (isNaN(toFormat)) {
      return '-:--';
    } else {
      return minutes + ':' + seconds;
    }
  }


  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
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
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }     
      this.play();
    }
  }

  mouseEnter(song) {
    this.setState( {hovered: song} );	
  }
  
  mouseLeave() {
    this.setState( {hovered: null });
  }
  
  renderButton(song, index) {
  
    if (this.state.isPlaying && song === this.state.currentSong) {
      return <span className='icon ion-md-pause'></span>;
    } else if (song === this.state.hovered) {
      return <span className='icon ion-md-play'></span>;
    } else {
      return index+1;
    }
  
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }



    render() {
      return (
        <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>  
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
         </section>
         <table id="song-list">
           <col id="song-number-colum"/>
           <col id="song-title-colum"/>
           <col id="song-duration-colum"/>
           <tbody>
           {
							this.state.album.songs.map( (song, index) =>

								<tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.mouseEnter(song)} onMouseLeave={() => this.mouseLeave()} >
                  <td>{this.renderButton(song, index)}</td>
									<td>{song.title}</td>
									<td>{this.formatTime(song.duration)}</td>
								</tr>
							)
						}
           </tbody>
         </table>

         <PlayerBar 
         isPlaying={this.state.isPlaying} 
         currentSong={this.state.currentSong} 
         handleSongClick={() => this.handleSongClick(this.state.currentSong)}
         handlePrevClick={() => this.handlePrevClick()}
         />

        </section>
      );
    }
  }

export default Album;