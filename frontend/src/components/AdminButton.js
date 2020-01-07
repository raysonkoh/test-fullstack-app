import React, {useContext} from 'react';
import {Button} from '@material-ui/core';
import customAxios from '../config/customAxios';
import {UserContext} from '../contexts/UserContext';

function AdminButton(props) {
  const [token, customSetToken] = useContext(UserContext);
  const onClick = e => {
    customAxios
      .get('./auth/users', {headers: {authorization: `Bearer ${token}`}})
      .then(res => {
        if (res.status === 200) {
          props.history.push('/admin');
        } else {
          customSetToken(null);
          props.history.push('/');
        }
      })
      .catch(err => {
        customSetToken(null);
        props.history.push('/');
      });
  };

  return (
    <Button variant="contained" color="secondary" onClick={onClick}>
      ADMIN BUTTON
    </Button>
  );
}

export default AdminButton;
