import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album
    };


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
								
								<tr className="song" key={index} >
                  <td>{song, index +1}</td>
									<td>{song.title}</td>
									<td>{this.formatTime(song.duration)}</td>
								</tr>
							)
						}
           </tbody>
         </table>
        </section>
      );
    }
  }

export default Album;