import React, { Fragment, useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

const GetPosts = () => {

  const [posts, setPosts] = useState([])
  // const [users, setUsers] = useState([])

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
  }, [setPosts])

  return (
    <Fragment>
      <ul className="d-flex justify-content-center ">
        {posts.map(post => {
          return (
            <li className="w-75 card" key={post.post_id}>
              <div className="">
                <img className="img-fluid center" src={post.image_url} alt="" />
              </div>

              <h3 className="card-text">{post.text}</h3>
              <div className="card-subtitle mb-2 text-muted">posted by {post.username} on {post.created_at.split('T')[0]}</div>
            </li>
          )
        })}
      </ul>
    </Fragment>
  )
}

export default GetPosts