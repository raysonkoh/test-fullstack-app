import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import AdminPage from './components/AdminPage';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import {UserProvider} from './contexts/UserContext';

function App() {
  return (
    <BrowserRouter>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <UserProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <AuthenticatedComponent>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/admin" component={AdminPage} />
          </AuthenticatedComponent>
        </Switch>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
