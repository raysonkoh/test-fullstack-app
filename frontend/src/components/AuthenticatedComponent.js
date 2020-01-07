import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../contexts/UserContext';

function AuthenticatedComponent(props) {
  const [token, customSetToken] = useContext(UserContext);

  return token === null ? <Redirect to="/" /> : <div>{props.children}</div>;
}

export default AuthenticatedComponent;
