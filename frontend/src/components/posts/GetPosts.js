import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const PostLayout = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column;
  padding-left: 0;
  opacity: ${({ read }) => read ? '100%' : '60%'};
    
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
`;

const GetPosts = (args) => {

  const history = useHistory()
  const [read, setRead] = useState({})

  let { id } = useParams()


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

  function deletePost(postId) {
    fetch(`http://localhost:4000/dashboard/post/${postId}`, {
      method: 'DELETE',
      headers: { token: localStorage.token }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(() => history.push('/dashboard'))
  }

  function readPost(postId) {
    fetch(`http://localhost:4000/dashboard/read/${postId}`, {
      method: 'POST',
      headers: { token: localStorage.token }
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <PostLayout read={read} setRead={setRead}>
      {args.posts?.map(post => {
        return (
          <li key={post.post_id} >
            <div>
              <img className='img-fluid' src={post.image_url} alt="" />
            </div>
            <p className='post-body'>{post.text}</p>
            <button className="btn btn-warning col-sm-2" onClick={() => { readPost(post.post_id); setRead(!read) }} >
              Read Post
              </button>
            {args.user.user_id === post.user_id ?
              (<button className="btn btn-danger col-sm-2" onClick={() => deletePost(post.post_id)} >
                Delete Post
              </button>
              ) : null
            }
            <div className='credits'>
              posted by {post.username}
            </div>
          </li>
        )
      })}
    </PostLayout>
  )
}
export default GetPosts