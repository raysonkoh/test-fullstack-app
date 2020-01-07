import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import customAxios from '../config/customAxios';

function AuthenticatedComponent(props) {
    const [userid, setUserid] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            props.history.push('/');
        }

        customAxios.get('./auth/users', { headers: { authorization: `Bearer ${token}` } })
            .then(res => {
                setUserid(res.data.id);
            })
            .catch(err => {
                localStorage.removeItem('token');
                props.history.push('/');
            });
    });


    return userid === null ? (
        <div>Loading...</div>
    ) : (
        <div>{props.children}</div>
    );
}

export default withRouter(AuthenticatedComponent);
