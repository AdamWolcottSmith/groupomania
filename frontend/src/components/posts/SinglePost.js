import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const PostLayout = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column;
  padding-left: 0;
  
  a {

    text-decoration: none;
    margin: .5rem;
    padding: .5rem;
    text-align: center;
    align-self: center;
    height: 75%;
    width: 75%;
    box-shadow: 10px 10px 8px #888888;

    li {
    
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
  }
`;

const SinglePost = ({ match }) => {

  const [post, setPost] = useState([])
  const getPost = async () => {
    let postReq = await fetch(`http://localhost:4000/dashboard/post/${match.params.id}`, {
      method: 'GET',
      headers: { token: localStorage.token }
    });

    const postRes = await postReq.json()
    setPost(postRes)
    console.log(postRes);
  }

  useEffect(() => {
    getPost()
  }, [match.params.id])

  return (
    <PostLayout>
      <li>
        <div>
          <img className='img-fluid' src={post.image_url} alt="" />
        </div>
        <p className='post-body'>{post.text}</p>
        <div className='credits'>posted by {post.username} on {post.created_at}</div>
      </li>
    </PostLayout>
  )
}

export default SinglePost
