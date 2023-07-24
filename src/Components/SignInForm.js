import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function SignInForm({signIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (event) => {
        event.preventDefault();
        signIn(email, password);
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
            <Button type='submit' variant='contained' color='primary' onClick={handleSignIn}>
                Sign In
            </Button>
        </form>

      
    </div>
  )
}

export default SignInForm
