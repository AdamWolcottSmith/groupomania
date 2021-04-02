import React, { useEffect } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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

const GetPosts = (args) => {

  useEffect(() => {

    const controller = new AbortController()

    fetch('http://localhost:4000/dashboard/post', {
      method: 'GET',
      headers: { token: localStorage.token }
    }, { signal: controller.signal })
      .then(res => res.json())
      .then(data => args.setPosts(data))
      .catch(e => {
        if (controller.signal.aborted) {
          console.log('Request has been gracefully cancelled');
        }
        else {
          throw e;
        }
      });
    return function cancel() {
      controller.abort();
    };
  }, [args.posts.length])

  return (
    <PostLayout>
      {args.posts?.map(post => {
        return (
          <Link to={`/dashboard/post/${post.post_id}`} >
            <li key={post.post_id}>
              <div>
                <img className='img-fluid' src={post.image_url} alt="" />
              </div>
              <p className='post-body'>{post.text}</p>
              <div className='credits'>
                posted by {post.username}
              </div>
            </li>
          </Link>
        )
      })}
    </PostLayout>
  )
}
export default GetPosts