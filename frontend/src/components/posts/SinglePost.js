import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
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

const SinglePost = () => {

  let { id } = useParams()

  const [singlePost, setSinglePost] = useState([])

  const getPost = async () => {
    let postReq = await fetch(`http://localhost:4000/dashboard/post/${id}`, {
      method: 'GET',
      headers: { token: localStorage.token }
    });

    const postRes = await postReq.json()
    setSinglePost(postRes)
  }

  useEffect(() => {
    getPost()
  })

  return (
    <PostLayout>
      <li>
        <div>
          <img className='img-fluid' src={singlePost.image_url} alt="" />
        </div>
        <p className='post-body'>{singlePost.text}</p>
        <div className='credits'>posted by {singlePost.username} on {singlePost.created_at}</div>
      </li>
    </PostLayout>
  )
}

export default SinglePost
