import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const PostStyle = styled.li`
  li {
    text-decoration: none;
    margin: .5rem;
    padding: .5rem;
    text-align: center;
    align-self: center;
    height: 75%;
    width: 75%;
    box-shadow: 10px 10px 8px #888888;

    .post-body {
      color: black;
      padding: 1rem;
      margin-bottom: 0;
    }
    
    .credits {
      color: lightgrey;
      font-size: small;
      text-transform: lowercase;
      font-style: oblique;
    }
  }

  .read-post {
    margin: 1em;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    background-color: aquamarine;
    border: 1px solid transparent;
    padding: 1.14rem 0.75rem;
    font-size: 1rem;
    border-radius: .25rem;
  }
`;

const Post = ({ post, userId }) => {

  const [showReadIndicator, setShowReadIndicator] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/dashboard/read/${post.postId}`, {
      method: 'GET',
      headers: { token: localStorage.token }
    })
      .then(res => res.json())
      .then(data => {
        data.forEach(item => {
          if (userId === item.user_read && post.post_id === item.post_read) {
            setShowReadIndicator(true)
          }
        });
      })
  }, [])

  function readPost(postId) {
    fetch(`http://localhost:4000/dashboard/read/${postId}`, {
      method: 'POST',
      headers: { token: localStorage.token }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(() => setShowReadIndicator(true))
  }

  //delete post

  function deletePost(postId) {
    fetch(`http://localhost:4000/dashboard/post/${postId}`, {
      method: 'DELETE',
      headers: { token: localStorage.token }
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <PostStyle>
      <div>
        <img className='img-fluid' src={post.image_url} alt="" />
      </div>
      <p className='post-body'>{post.text}</p>

      {showReadIndicator ? <div className='read-post'>You read this!</div> : <button className="btn btn-warning col-sm-2" onClick={() => { readPost(post.post_id); }} >
        Read Post
        </button>}

      {userId === post.user_id ?
        (<button className="btn btn-danger col-sm-2" onClick={() => deletePost(post.post_id)} >
          Delete Post
        </button>
        ) : null
      }
      <div className='credits'>
        posted by {post.username}
      </div>
    </PostStyle>
  )
}

export default Post