import React, {useContext} from 'react';
import {Container, Button} from '@material-ui/core';
import {UserContext} from '../contexts/UserContext';
import onClickLogout from '../helpers/onClickLogout';
import AdminButton from './AdminButton';

function Dashboard(props) {
  const [user, customSetUser] = useContext(UserContext);

  return (
    <Container>
      <h1 style={{textAlign: 'center'}}>This is the Dashboard!</h1>
      <h1 style={{textAlign: 'center'}}>Welcome, {user.name}!</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={e => onClickLogout(e, props, customSetUser)}>
        Logout
      </Button>
      <AdminButton history={props.history} />
    </Container>
  );
}

export default Dashboard;
