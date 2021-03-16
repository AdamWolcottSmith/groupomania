import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const PostForm = styled.form`
  margin: 2em;
  display: flex;
  justify-content: space-around;
  flex-flow: column wrap;

  label {
    cursor: pointer;
    display: flex;
    align-self: center;

    div {
      align-self: center;
      border: 2px dashed #f1f1f1;
      padding: 1em;
      margin: .5em;

      :hover {
        background-color: black;
        color: white;
        transition: 0.3s ease-in-out;
      }
    }

    img {
      height: 50%;
      width: 50%;
    }
  }
`;

const CreatePosts = () => {

  const [image, setImage] = useState({ preview: '', raw: '' })
  const [body, setBody] = useState('')

  const onImageChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  }

  const onBodyChange = e => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let myHeaders = new Headers()
    // myHeaders.append("Content-Type", "multipart/form-data")
    myHeaders.append("token", localStorage.token)

    const formData = new FormData();
    formData.append("image", image.raw);
    formData.append("text", body);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData
    };
    await fetch("http://localhost:4000/dashboard/post", requestOptions)

    setImage('')
    setBody('')
  };

  return (
    <PostForm>
      <label htmlFor="upload-button">
        {image.preview ? <img src={image.preview} /> : (
          <div>
            upload your photo here
          </div>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={onImageChange}
      />
      <textarea placeholder="new post..." value={body} onChange={onBodyChange}></textarea>
      <button className="btn btn-dark" type="submit" onClick={handleSubmit}>Create Post</button>
    </PostForm>
  )
}

export default CreatePosts
