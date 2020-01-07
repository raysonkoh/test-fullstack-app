import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../contexts/UserContext';

function AuthenticatedComponent(props) {
  const [user, customSetUser] = useContext(UserContext);

  return user === null ? <Redirect to="/" /> : <div>{props.children}</div>;
}

export default AuthenticatedComponent;
