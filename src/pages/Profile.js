import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import defaultUser from '../images/default-user.svg';
import '../styles/Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({
      userInfo: { ...user },
      isLoading: false,
    });
  };

  render() {
    const { userInfo, isLoading } = this.state;
    const { name, email, image, description } = userInfo;
    return (
      <>
        <Header />
        <section
          data-testid="page-profile"
          className="Profile-Container wave-bottom"
        >
          <div className="Category-Header"><h2>Perfil</h2></div>
          {isLoading ? (
            <Loading />
          ) : (
            <section className="Profile">
              <div
                className="Profile-Pic"
                style={ { backgroundColor: '#070b0e' } }
              >
                <img
                  src={ image || defaultUser }
                  alt={ `User ${name}` }
                  data-testid="profile-image"
                />
              </div>
              <div className="Profile-Informations">
                <h3>{name}</h3>
                <p>{email}</p>
                <p>{description}</p>
              </div>
              <Link to="/trybetunes/profile/edit" className="Edit-Profile">
                Editar perfil
              </Link>
            </section>
          )}
        </section>
      </>
    );
  }
}

export default Profile;
