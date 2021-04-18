import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Login.css';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { setAuthToken } from '../services/localStorageService';
Modal.setAppElement('#root');

const Login = (props) => {
  let { isOpen, closeLogin, loggedInHandler } = props;
  const [value, setValue] = useState(0);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginSubmitted, setLoginSubmitted] = useState(false);
  const [registerSubmitted, setRegisterSubmitted] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const defaultRegisterState = {
    first_name: '',
    last_name: '',
    email_address: '',
    mobile_number: '',
    password: '',
  };
  const [registerDetails, setRegisterDetails] = useState(defaultRegisterState);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLoginSubmitted(false);
    setRegisterSubmitted(false);
    setRegisterDetails(defaultRegisterState);
    registrationSuccess(false);
  };
  const a11yProps = (index) => {
    return {
      id: `bk-lr-tab-${index}`,
      'aria-controls': `bk-lr-tab-panel-${index}`,
    };
  };

  const handleLoginClick = () => {
    setLoginSubmitted(true);
    if (!userName || !password) {
      return;
    }
    fetch('api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization:
          'Basic ' +
          btoa(unescape(encodeURIComponent(userName + ':' + password))),
      },
      body: {},
    })
      .then((response) => {
        setAuthToken(response.headers.get('access-token'));
        response.json();
      })
      .then((response) => {
        if (response && response['status'] === 'ACTIVE') {
          const userDetails = response;
          loggedInHandler(true);
          closeLogin();
        }
      });
  };

  const renderLoginForm = () => {
    return (
      <form>
        <FormControl
          required
          className="formControl"
          error={loginSubmitted && !userName}
        >
          <InputLabel htmlFor="userName">Username</InputLabel>
          <Input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormControl>
        <FormControl
          required
          className="formControl"
          error={loginSubmitted && !password}
        >
          <InputLabel htmlFor="registerPassword">Password</InputLabel>
          <Input
            id="registerPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <div className="bk-lr-actions">
          <Button
            className="bk-login"
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </div>
      </form>
    );
  };

  const handleRegisterClick = () => {
    setRegisterSubmitted(true);
    let hasError = false;
    Object.keys(registerDetails).forEach((key) => {
      if (!registerDetails[key]) {
        hasError = true;
      }
    });
    if (hasError) {
      return;
    }
    fetch('api/v1/signup', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(registerDetails),
    })
      .then((response) => response.json())
      .then((response) => {
        if (
          response &&
          (response['status'] === 'REGISTERED' ||
            response['status'] === 'ACTIVE')
        ) {
          setRegistrationSuccess(true);
        }
      });
  };

  const renderRegisterFormError = (property: string) => {
    return registerSubmitted && !registerDetails[property] ? (
      <FormHelperText className="bk-lr-error">
        <span className="red">required</span>
      </FormHelperText>
    ) : (
      ''
    );
  };

  const renderRegisterForm = () => {
    return (
      <form>
        <FormControl
          required
          className="formControl"
          // error={loginSubmitted && !userName}
        >
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            id="firstName"
            value={registerDetails['first_name']}
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                first_name: e.target.value,
              })
            }
          />
          {renderRegisterFormError('first_name')}
        </FormControl>
        <FormControl
          required
          className="formControl"
          // error={loginSubmitted && !userName}
        >
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            id="lastName"
            value={registerDetails['last_name']}
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                last_name: e.target.value,
              })
            }
          />
          {renderRegisterFormError('last_name')}
        </FormControl>
        <FormControl
          required
          className="formControl"
          // error={loginSubmitted && !userName}
        >
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            value={registerDetails['email_address']}
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                email_address: e.target.value,
              })
            }
          />
          {renderRegisterFormError('email_address')}
        </FormControl>
        <FormControl
          required
          className="formControl"
          // error={loginSubmitted && !userName}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={registerDetails['password']}
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                password: e.target.value,
              })
            }
          />
          {renderRegisterFormError('password')}
        </FormControl>
        <FormControl
          required
          className="formControl"
          // error={loginSubmitted && !userName}
        >
          <InputLabel htmlFor="contactNumber">Contact No</InputLabel>
          <Input
            id="contactNumber"
            value={registerDetails['mobile_number']}
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                mobile_number: e.target.value,
              })
            }
          />
          {renderRegisterFormError('mobile_number')}
        </FormControl>
        {registrationSuccess ? (
          <FormHelperText className="registration-success">
            Registration Successful. Please Login!
          </FormHelperText>
        ) : (
          ''
        )}
        <div
          className={'bk-lr-actions ' + (registrationSuccess ? 'edited' : '')}
        >
          <Button
            className="bk-login"
            variant="contained"
            color="primary"
            onClick={handleRegisterClick}
          >
            Register
          </Button>
        </div>
      </form>
    );
  };

  useEffect(() => {
    if (isOpen) {
      renderLoginDialog();
    }
  }, [isOpen]);

  const renderLoginDialog = () => {
    return (
      <Modal
        className="bk-login-register-dialog"
        overlayClassName="bk-overlay"
        isOpen={isOpen}
      >
        <Paper className="bk-lr-tabs" square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="login register tabs"
            centered
          >
            <Tab label="LOGIN" {...a11yProps(0)} />
            <Tab label="REGISTER" {...a11yProps(1)} />
          </Tabs>
          <div
            role="tabpanel"
            hidden={value !== 0}
            id="login"
            className="tab-section"
            value={value}
          >
            {renderLoginForm()}
          </div>
          <div
            role="tabpanel"
            hidden={value !== 1}
            id="register"
            value={value}
            className="tab-section"
          >
            {renderRegisterForm()}
          </div>
        </Paper>
      </Modal>
    );
  };

  return renderLoginDialog();
};

export default Login;
