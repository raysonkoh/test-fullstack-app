import React from 'react';
import { Container, Button } from '@material-ui/core';
import onClickLogout from '../helper/onClickLogout';

function Dashboard(props) {
    return (
        <Container>
            <h1 style={{ textAlign: 'center' }}>This is the Dashboard!</h1>
            <Button 
                variant="contained"
                color="primary"
                onClick={e => onClickLogout(e, props)}>Logout</Button>
        </Container>
    )
}

export default Dashboard;
