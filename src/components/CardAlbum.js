import React, { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/CardAlbum.css';

class CardAlbum extends Component {
  render() {
    const { artist, albums } = this.props;
    return (
      <>
        <div className="Artist-Search">
          <p>{ `Resultado de álbuns de: ${artist}` }</p>
        </div>
        <div className="Artist-Albums">
          { albums.map(
            ({
              artistName,
              collectionId,
              collectionName,
              artworkUrl100,
            }) => (
              <Link
                to={ `/trybetunes/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
                key={ collectionId }
                className="Song"
              >
                <section className="Song-Info">
                  <div>
                    <img
                      src={ artworkUrl100 }
                      alt={ collectionName }
                    />
                  </div>
                  <div className="Artist-Song">
                    <h3>{collectionName}</h3>
                    <p>{artistName}</p>
                  </div>
                </section>
              </Link>
            ),
          ) }
        </div>
      </>
    );
  }
}

CardAlbum.propTypes = {
  artist: string.isRequired,
  albums: arrayOf(shape({})).isRequired,
};

export default CardAlbum;
