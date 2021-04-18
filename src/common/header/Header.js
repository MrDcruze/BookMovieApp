import React, { useState, useEffect } from 'react';
import './Header.css';
import CompanyLogo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import Login from './../login/Login';
import { getAuthToken } from './../services/localStorageService';

const Header = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const navToBookShow = () => {
    console.log('Navigate to book show page');
  };

  const toggleLogin = () => {
    setLoginDialogOpen(!loginDialogOpen);
  };

  const handleBookShowClick = () => {
    if (isLoggedIn) {
      navToBookShow();
    } else {
      toggleLogin();
    }
  };

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      toggleLogin();
      return;
    }
    fetch('api/v1/auth/logout', {
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
      <img className="bk-company-logo" src={CompanyLogo} alt="Company Logo" />
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
