import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SignUpForm({signUp}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (event) => {
        event.preventDefault();
        signUp(username, email, password);
  };
  return (
    <div>
        <form className='app_signup'>
            <center>
                <img
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='insta'
                className='app_headerImage'
                />
            </center>
            <TextField
                label='Username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' variant='contained' color='primary' onClick={handleSignUp}>
                Sign up
            </Button>
        </form>

      
    </div>
  )
}

export default SignUpForm
