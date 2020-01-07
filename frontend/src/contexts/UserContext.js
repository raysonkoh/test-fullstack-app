import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState({
    token: localStorage.getItem('token'),
    name: localStorage.getItem('name'),
  });

  const customSetUser = val => {
    if (val === null) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      setUser(null);
    } else {
      localStorage.setItem('token', val.token);
      localStorage.setItem('name', val.name);
      setUser(val);
    }
  };

  return (
    <UserContext.Provider value={[user, customSetUser]}>
      {props.children}
    </UserContext.Provider>
  );
}
