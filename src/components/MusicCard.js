import { shape, func } from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import React, { Component } from 'react';
import '../styles/MusicCard.css';

class MusicCard extends Component {
  render() {
    const {
      music: { trackId, trackName, previewUrl },
      music,
      handleChange,
      favSongsChecked,
    } = this.props;
    return (
      <section key={ trackId } className="Album-Song">
        <div className="Track-Name">
          <h3>{trackName}</h3>
        </div>
        <div className="Audio-and-Fav">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackId }>
            <input
              id={ trackId }
              name={ trackId }
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ !!favSongsChecked[trackId] }
              onChange={ (e) => handleChange(e, music) }
              className="Fav-Checkbox"
            />
            {favSongsChecked[trackId] ? (
              <>
                <p>Favorita</p>
                <FaHeart className="Fav" />
              </>
            ) : (
              <>
                <p>Favorita</p>
                <FaRegHeart className="Fav" />
              </>
            )}
          </label>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: shape({}).isRequired,
  handleChange: func.isRequired,
  favSongsChecked: shape({}).isRequired,
};

export default MusicCard;
