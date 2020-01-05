import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import customAxios from '../config/customAxios';

function ProtectedRoute(props) {
    const token = localStorage.getItem('token');
    const { path, main, redirect } = props;
    const promiseArr = [];
    const result = []

    async function validateUser(token) {
        const res = await customAxios.get('./auth/users', {headers: { authorization: `Bearer ${token}` }});
        let component;
        if (res.status === 200) {
            component = main;
        } else {
            component = redirect;
        };

        result.push(
            <Route exact path={path} render={props => component} />
        );
        console.log(result);
    }

    promiseArr.push(validateUser(token));
    Promise.all(promiseArr).then(() => result[0]);
}

export default ProtectedRoute;
