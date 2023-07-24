import React, { useEffect, useState } from 'react';
import '../styles/Post.css';
import { Avatar } from '@mui/material';
import { db } from '../Firebase';
import firebase from 'firebase';




function Post({ user,postid,username , caption , imageurl, darkMode}) {
  const [comments,setcomments]=useState([])
  const [comment,setcomment]=useState('')

  useEffect(() => {
    let unsubscribe;
    if (postid) {
      unsubscribe = db
        .collection('post')
        .doc(postid)
        .collection('comments')
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot) =>{
          setcomments(snapshot.docs.map((doc) => doc.data()))
        })
    }
    return () => {
      unsubscribe()
    }
  },[postid])


  const postcomment = (event) => {
    event.preventDefault();

    db.collection('post').doc(postid).collection("comments").add({
      text : comment,
      username : user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log('Comment posted successfully!');
      // Clear the input box after posting the comment
      setcomment('');
    })
    .catch((error) => {
      console.error('Error posting comment: ', error);
    });

  }


  // For deleting posts
  const handleDelete = () => {
    // Check if the user is logged in and the post belongs to the logged-in user
    if (user && user.displayName === username) {
      db.collection("post")
        .doc(postid)
        .delete()
        .then(() => {
          console.log("Post successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing post: ", error);
        });
    }
  };



  return (
    <div className={`post ${darkMode ? 'dark-mode' : ''}`}>
        {user && user.displayName === username && (
        <button className="post_deleteButton" onClick={handleDelete}>
          Delete
        </button>
        )}
        <div class="post_header">
            <Avatar 
                className="post_avatar"
                alt={username}
                src="https://www.whatever.jpg" 
            />
            <h3>{username}</h3>
        </div>
        
        

        <img 
            className="post_image"
            src={imageurl} 
            alt="p2" 
         />

        <h4 className="post_text"><strong>{username}</strong>{caption}</h4>

    <div className='post_comments'>
      {comments.map((comment) =>(
        <p>
          <strong>{comment.username}</strong> {comment.text}
        </p>
      ))}
    </div>
    {user &&
      <form className="post_commentbox">
      <input 
        className='post_input'
        type='text'
        placeholder='Add a comment...'
        value={comment}
        onChange={(e)=>setcomment(e.target.value)}
      />
      <button
        className='post_input'
        disabled={!comment}
        type='submit'
        onClick={postcomment}
        
      >
        Post
      </button>

      </form>
    }
    
      
    </div>
  )
}

export default Post
