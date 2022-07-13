import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favoriteSongs: [],
      favSongsChecked: {},
    };
  }

  componentDidMount() {
    this.showFavSongs();
  }

  handleChange = ({ target: { name, checked } }, song) => {
    this.setState(
      ({ favSongsChecked }) => ({
        isLoading: true,
        favSongsChecked: { ...favSongsChecked, [name]: checked },
      }),
      async () => {
        await removeSong(song);
        this.showFavSongs();
      },
    );
  };

  showFavSongs = async () => {
    const albums = await getFavoriteSongs();
    const favSongs = albums.map(({ trackId }) => [trackId, true]);
    this.setState({
      favoriteSongs: albums,
      favSongsChecked: Object.fromEntries(favSongs),
      isLoading: false,
    });
  };

  render() {
    const { isLoading, favoriteSongs, favSongsChecked } = this.state;
    return (
      <>
        <Header />
        <section className="Favorites wave-bottom" data-testid="page-favorites">
          <div className="Category-Header">
            <h2>Suas curtidas</h2>
          </div>
          { isLoading ? <Loading /> : (
            <div className="Fav-Container">
              {favoriteSongs.length === 0 ? (
                <h2>Você não tem nenhuma curtida!</h2>
              ) : (
                favoriteSongs.map((song) => (
                  <MusicCard
                    key={ song.trackId }
                    music={ song }
                    handleChange={ this.handleChange }
                    favSongsChecked={ favSongsChecked }
                  />
                ))
              )}
            </div>
          )}
        </section>
      </>
    );
  }
}

export default Favorites;
