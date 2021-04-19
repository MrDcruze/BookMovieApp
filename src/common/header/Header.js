import React, { useState, useEffect } from 'react';
import './Header.css';
import CompanyLogo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import Login from './../login/Login';
import { useHistory, history, useParams } from 'react-router-dom';
import { getAuthToken } from './../services/localStorageService';

const Header = (props) => {
  let history = useHistory();
  const { movieId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const toggleLogin = () => {
    setLoginDialogOpen(!loginDialogOpen);
  };

  const handleBookShowClick = () => {
    if (isLoggedIn) {
      //Navigate to book show page'
      history.push('/book-show');
    } else {
      toggleLogin();
    }
  };

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      toggleLogin();
      return;
    }
    fetch(props.baseUrl + 'api/v1/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + getAuthToken(),
      },
      body: {},
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          console.log(response);
        }
      });
  };

  const loggedInHandler = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  useEffect(() => {
    if (getAuthToken()) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="bk-header">
      <img
        className="bk-company-logo"
        src={CompanyLogo}
        alt="Company Logo"
        onClick={() => {
          history.push('/');
        }}
      />
      <div>
        <Button
          className="bk-book-show"
          variant="contained"
          color="primary"
          onClick={handleBookShowClick}
        >
          Book Show
        </Button>
        <Button
          variant="contained"
          name={isLoggedIn ? 'Logout' : 'Login'}
          onClick={handleLoginClick}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </div>
      <Login
        isOpen={loginDialogOpen}
        closeLogin={toggleLogin}
        baseUrl={props.baseUrl}
        loggedInHandler={loggedInHandler}
      ></Login>
    </div>
  );
};

export default Header;
