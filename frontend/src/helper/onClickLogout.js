import React from 'react';
import { Redirect } from 'react-router-dom';

const onClickLogout = (e, props) => {
    localStorage.removeItem('token');
    props.history.push('/');
}

export default onClickLogout;
