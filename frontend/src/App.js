import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import customAxios from './config/customAxios';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import AuthenticatedComponent from './components/AuthenticatedComponent';

function App() {
    return (
        <BrowserRouter>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/register' component={Register} />
                <AuthenticatedComponent>
                    <Route exact path='/dashboard' component={Dashboard} />
                </AuthenticatedComponent>
            </Switch>
        </BrowserRouter>

    );
}

export default App;
