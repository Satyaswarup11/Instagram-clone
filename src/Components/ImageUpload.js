import React, { useState } from 'react';
import Button from '@mui/material/Button';
import firebase from 'firebase';
import { db, storage } from '../Firebase';
import '../styles/ImageUpload.css';

function ImageUpload({ username, closeModal }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('post')
              .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageurl: url,
                username: username,
              })
              .then(() => {
                console.log('Image posted successfully!');
                setProgress(0);
                setCaption('');
                setImage(null);
                closeModal(); // Close the modal after image upload
              })
              .catch((error) => {
                console.error('Error posting image: ', error);
              });
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload_progress" value={progress} max="100" />
      <input type="text" placeholder="Enter a caption" value={caption} onChange={(event) => setCaption(event.target.value)} />
      <input type="file" onChange={handleChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
