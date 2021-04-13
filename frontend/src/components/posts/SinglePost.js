import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components'

const PostLayout = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column;
  padding-left: 0;
  position: relative;
  top: 67px;
  opacity: ${({ read }) => read ? '60%' : '100%'};

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
        text-align: center;
        font-size: 1.2rem;
        color: black;
        padding: 1rem;
        margin-bottom: 0;
      }
    
      .credits {
        color: lightgrey;
        font-size: small;
        text-transform: lowercase;
        font-style: oblique;
        margin-bottom: 14px;
      }
    } 
`;

const SinglePost = ({ user }) => {

  const [read, setRead] = useState([])

  let { id } = useParams()
  const history = useHistory()
  const [singlePost, setSinglePost] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    fetch(`http://localhost:4000/dashboard/post/${id}`, {
      method: 'GET',
      headers: { token: localStorage.token }
    }, { signal: controller.signal })
      .then(res => res.json())
      .then(data => setSinglePost(data))
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
  }, [])

  function deletePost() {
    fetch(`http://localhost:4000/dashboard/post/${id}`, {
      method: 'DELETE',
      headers: { token: localStorage.token }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(() => history.push('/dashboard'))
  }

  function readPost() {
    fetch(`http://localhost:4000/dashboard/read/${id}`, {
      method: 'POST',
      headers: { token: localStorage.token }
    })
      .then(res => res.json())
      .then(data => setRead(data))
      .then(() => console.log(read))
  }

  return (
    <PostLayout read={read} setRead={setRead}>
      <li>
        <div>
          <img className='img-fluid' src={singlePost.image_url} alt="" />
        </div>
        <p className='post-body'>{singlePost.text}</p>
        <div className='credits'>posted by {singlePost.username} on {singlePost.created_at?.split('T')[0]}</div>
        <button className="btn btn-warning col-sm-2" onClick={() => readPost(read)} >
          Read Post
              </button>
        {user.user_id === singlePost.user_id ?
          (<button className="btn btn-danger col-sm-2" onClick={() => deletePost()} >
            Delete Post
          </button>
          ) : null
        }
      </li>
    </PostLayout>
  )
}

export default SinglePost
