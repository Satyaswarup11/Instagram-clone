import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/responsive.css';
import Post from './Components/Post';
import { db, auth } from './Firebase';
import AuthModal from './Components/AuthModal';
import SignInForm from './Components/SignInForm';
import SignUpForm from './Components/SignUpForm';
import ImageUpload from './Components/ImageUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor:'background.paper',
    // bgcolor: darkMode ? '#333' : 'background.paper',
    // color: darkMode ? '#fff' : '#000',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    '@media (max-width: 600px)': {
      width: '90%',
      overflow: 'auto',
    },
  };


  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [showSignInForm,setshowSignInForm]=useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    db.collection('post')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const handleSignIn = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message));
    setOpenAuthModal(false);
  };

  const handleSignUp = (username, email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpenAuthModal(false);
  };

  const handleUploadModalOpen = () => {
    setOpenUploadModal(true);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}>
        <>
        {showSignInForm ? (
          <SignInForm signIn={handleSignIn} />
        ) : (
          <SignUpForm signUp={handleSignUp} />
        )}
        </>
      </AuthModal>

      <div className='app_header'>
        <img
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='insta'
          className='app_headerImage'
        />
        <div className="app_headerButtons">
          {user ? (
            <Button onClick={() => auth.signOut()}>Log out</Button>
          ) : (
            <div className='app_loginContainer'>
              <Button onClick={() => {setOpenAuthModal(true);setshowSignInForm(true);}}>Log In</Button>
              <Button onClick={() => {setOpenAuthModal(true);setshowSignInForm(false);}}>Sign up</Button>
            </div>
          )}
          {user ? (
            <Button onClick={handleUploadModalOpen}>Upload Image</Button>
          ) : (
            <Typography variant='body1'>You need to log in to upload.</Typography>
          )}
          {/* Dark mode  */}

          <Button  color="primary"
              onClick={() => {setDarkMode((prevDarkMode) => !prevDarkMode);}}>{darkMode ? "Light Mode" : "Dark mode"}
          </Button>
        </div>
      </div>

      <div className="app_posts">
        {
          posts.map(({id,post})=>(
            <Post key={id} postid ={id} user={user} username={post.username} caption={post.caption} imageurl={post.imageurl}
            darkMode={darkMode} />
          ))
        }
      </div>

      <Modal
        open={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
      >
        <Box sx={style}>
          <ImageUpload username={user?.displayName} closeModal={() => setOpenUploadModal(false)} />
        </Box>
      </Modal>
    </div>
  );
}

export default App;
