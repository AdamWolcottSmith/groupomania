import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
// import { toast } from 'react-toastify';

const PostLayout = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column;
  padding-left: 0;
  
  
  li {
    margin: .5rem;
    padding: .5rem;
    text-align: center;
    align-self: center;
    height: 75%;
    width: 75%;
    box-shadow: 10px 10px 8px #888888;

    .post-body {
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
`;


const GetPosts = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    try {
      const getPosts = async () => {
        let postReq = await fetch('http://localhost:4000/dashboard/post', {
          method: 'GET',
          headers: { token: localStorage.token }
        });
        const postRes = await postReq.json()
        setPosts(postRes)
      }
      getPosts();
    } catch (error) {
      console.error(error.message)
    }
  }, [posts])

  return (
    <PostLayout>
      {posts.map(post => {
        return (
          <li key={post.post_id}>
            <div>
              <img className='img-fluid' src={post.image_url} alt="" />
            </div>
            <p className='post-body'>{post.text}</p>
            <div className='credits'>posted by {post.username} on {post.created_at.split('T')[0]}
            </div>
          </li>
        )
      })}
    </PostLayout>
  )
}

export default GetPosts