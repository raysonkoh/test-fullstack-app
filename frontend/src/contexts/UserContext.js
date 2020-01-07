import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const customSetToken = val => {
    if (val === null) {
      localStorage.removeItem('token');
      setToken(null);
    } else {
      localStorage.setItem('token', val);
      setToken(val);
    }
  };

  return (
    <UserContext.Provider value={[token, customSetToken]}>
      {props.children}
    </UserContext.Provider>
  );
}
