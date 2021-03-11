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
 }, [])

 return (
  <Fragment>
   <ul>
    {posts.map(post => {
     return (
      <li key={post.post_id}>
       <h2>{post.caption}</h2>
       <div>{post.image_url}</div>
       <div>{post.username}</div>
      </li>
     )
    })}
   </ul>
  </Fragment>
 )
}

export default GetPosts