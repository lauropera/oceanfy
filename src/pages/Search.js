import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import CardAlbum from '../components/CardAlbum';
import '../styles/Search.css';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      userSearch: '',
      artist: '',
      artistAlbums: [],
      isLoading: false,
      artistFound: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      userSearch: target.value,
    });
  };

  getAlbums = () => {
    const { userSearch } = this.state;
    this.setState(
      {
        artist: userSearch,
        isLoading: true,
        userSearch: '',
      },
      async () => {
        const { artist } = this.state;
        this.setState({
          isLoading: false,
          artistFound: true,
          artistAlbums: await searchAlbumsAPI(artist),
        });
      },
    );
  };

  render() {
    const { userSearch, artist, artistAlbums, artistFound, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <>
        <Header />
        <section data-testid="page-search" className="Search-Container wave-bottom">
          <form className="Search-Form" onSubmit={ this.getAlbums }>
            <label htmlFor="search-artist">
              <input
                type="text"
                id="search-artist"
                placeholder="Artistas"
                data-testid="search-artist-input"
                value={ userSearch }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ userSearch.length < 2 }
              onClick={ this.getAlbums }
            >
              <FaSearch />
            </button>
          </form>
          {artistFound && (
            <main className="Albums-List wave-bottom">
              {artistAlbums.length > 0 ? (
                <CardAlbum artist={ artist } albums={ artistAlbums } />
              ) : (
                <p>Nenhum álbum foi encontrado</p>
              )}
            </main>
          )}
        </section>
      </>
    );
  }
}

export default Search;
