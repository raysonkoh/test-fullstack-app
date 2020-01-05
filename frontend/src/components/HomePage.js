import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button } from '@material-ui/core';

function HomePage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submitHandler(event) {
    }

    return (
        <Container>
            <h1 style={{ textAlign: 'center' }}>This is the Homepage!</h1>
            <Box style={{ margin: '0.5em 2em' }}>  
                <TextField 
                    type="email"
                    id="email" 
                    label="Email" 
                    variant="outlined" 
                    fullWidth
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </Box>
            <Box style={{ margin: '0.5em 2em', position: 'relative' }}>  
                <TextField 
                    type="password"
                    id="password" 
                    label="Password" 
                    variant="outlined" 
                    fullWidth
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <Button 
                    style={{ marginTop: '2em', position: 'absolute', right: '0', display: 'block'}} 
                    variant="contained" 
                    color="primary"
                    onClick={submitHandler}>Submit</Button>
            </Box>
        </Container>
    )
}

export default HomePage;
