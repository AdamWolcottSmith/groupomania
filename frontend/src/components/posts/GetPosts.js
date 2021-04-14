import React, { useEffect } from 'react';
import Post from './Post'
import styled from 'styled-components'


const PostLayout = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column;
  padding-left: 0;
  
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



// const Post = ({ post, userId }) => {
//   const [showReadIndicator, setShowReadIndicator] = useState(false);

//   useEffect(() => {
//     fetch(`http://localhost:4000/dashboard/read/${post.postId}`, {
//       method: 'GET',
//       headers: { token: localStorage.token }
//     })
//       .then(res => res.json())
//       .then(data => {
//         data.forEach(item => {
//           console.log('post', post.post_id);
//           if (userId === item.user_read && post.post_id === item.post_read) {
//             setShowReadIndicator(true)
//           }
//         });
//       })
//   }, [])

//   function readPost(postId) {
//     fetch(`http://localhost:4000/dashboard/read/${postId}`, {
//       method: 'POST',
//       headers: { token: localStorage.token }
//     })
//       .then(res => res.json())
//       .then(data => console.log(data))
//       .then(() => setShowReadIndicator(true))
//   }

//   //delete post

//   function deletePost(postId) {
//     fetch(`http://localhost:4000/dashboard/post/${postId}`, {
//       method: 'DELETE',
//       headers: { token: localStorage.token }
//     })
//       .then(res => res.json())
//       .then(data => console.log(data))
//   }

//   return (
//     <li key={post.post_id} >
//       <div>
//         <img className='img-fluid' src={post.image_url} alt="" />
//       </div>
//       <p className='post-body'>{post.text}</p>

//       {showReadIndicator ? <>You read this!</> : <button className="btn btn-warning col-sm-2" onClick={() => { readPost(post.post_id); }} >
//         Read Post
//         </button>}

//       {userId === post.user_id ?
//         (<button className="btn btn-danger col-sm-2" onClick={() => deletePost(post.post_id)} >
//           Delete Post
//         </button>
//         ) : null
//       }
//       <div className='credits'>
//         posted by {post.username}
//       </div>
//     </li>
//   )
// }


const GetPosts = (args) => {

  //get posts

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

  //delete post

  return (
    <PostLayout>
      {args.posts?.map(post => (
        <Post
          post={post}
          userId={args.user.user_id}
          key={post.post_id}
        />
      ))}
    </PostLayout>
  )
}
export default GetPosts