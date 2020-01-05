import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <Route exact path='/' component={HomePage} />
            <Route exact path='/dashboard' component={Dashboard} />
        </BrowserRouter>
            
    );
}

export default App;
