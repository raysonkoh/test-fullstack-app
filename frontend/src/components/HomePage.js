import React, {useState, useContext} from 'react';
import customAxios from '../config/customAxios';
import {Container, Box, TextField, Button} from '@material-ui/core';
import {UserContext} from '../contexts/UserContext';

function HomePage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [error, setError] = useState('');
  const [token, customSetToken] = useContext(UserContext);

  function submitHandler(event) {
    const data = {
      email,
      password,
    };

    customAxios
      .post('./auth/login', data)
      .then(res => {
        if (res.status === 200) {
          const token = res.data.token;
          customSetToken(token);
          props.history.push('/dashboard');
        } else {
          setError(res.data.msg);
          setShowErrors(true);
        }
      })
      .catch(err => {
        const error = err.response.data.msg;
        setError(error);
        setShowErrors(true);
      });
  }

  //TODO: make this warning msg nicer
  function renderError(err) {
    return <Box>{err}</Box>;
  }

  return (
    <Container>
      <h1 style={{textAlign: 'center'}}>This is the Homepage!</h1>
      {showErrors && renderError(error)}
      <Box style={{margin: '0.5em 2em'}}>
        <TextField
          type="email"
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </Box>
      <Box style={{margin: '0.5em 2em', position: 'relative'}}>
        <TextField
          type="password"
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <Box
          style={{
            marginTop: '2em',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={e => props.history.push('/register')}>
            Register New Account
          </Button>
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
