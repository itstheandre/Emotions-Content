import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import { Link } from "react-router-dom";

// Written with Hooks. Same as below

const Post = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [id, setId] = useState("");
  // const [owner, setOwner] = useState("");
  const [fullName, setFullName] = useState("");
  const [textToCopy, setTextToCopy] = useState("");
  const [message, setMessage] = useState("");
  const [contentType, setContentType] = useState("");
  const [urlPath, setUrlPath] = useState("");

  // const getPostData = () => {
  //   const { unique } = props.match.params;
  //   axios.get(`/api/content/${unique}`).then(response => {
  //     const post = response.data;
  //     const { title, body } = post;
  //     const id = post._id;
  //     const owner = post.owner.username;
  //     const { fullName } = post.owner;
  //     setTitle(title);
  //     setBody(body);
  //     setId(id);
  //     setOwner(owner);
  //     setFullName(fullName);
  //     setTextToCopy(`http://localhost:3000/u/${owner}/${id}`);
  //   });
  // };

  // useEffect(() => {
  //   getPostData();
  // }, []);

  useEffect(() => {
    const { unique } = props.match.params;
    axios.get(`/api/content/${unique}`).then(response => {
      console.log("HEER", response.data);
      const post = response.data;
      const { title, body, urlPath, contentType } = post;
      const id = post._id;
      const owner = post.owner.username;
      const { fullName } = post.owner;
      setTitle(title);
      setBody(body);
      setUrlPath(urlPath);
      setContentType(contentType);
      // setOwner(owner);
      setFullName(fullName);
      setTextToCopy(`http://localhost:3000/u/${owner}/${id}`);
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setMessage("Your link has been copied to the cliboard");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const video = contentType === "video";
  const audio = contentType === "audio";
  const image = contentType === "image";
  console.log(urlPath);
  return (
    <div>
      <i
        className='fas fa-3x fa-angle-left'
        onClick={() => props.history.goBack()}
      ></i>

      <div className='motusHeader'>
        {/* <iframe
          style={{ pointerEvents: "none" }}
          src='https://giphy.com/embed/d2YVPRhQXI5FxJRe'
          width='480'
          height='240'
          frameBorder='0'
          className='giphy-embed'
        ></iframe> */}
        <h1>{title}</h1>
        {image && <img src={urlPath} />}
        {video && (
          <div className='videoPlayer'>
            <div className='embed-responsive'>
              <ReactPlayer url={urlPath} controls={true} />
            </div>
          </div>
        )}
        {audio && <ReactAudioPlayer src={urlPath} controls />}

        <p>{body}</p>
        <i
          className='fas fa-2x fa-share-square'
          style={{ cursor: "pointer" }}
          onClick={handleCopy}
        ></i>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Post;

// export default class Post extends Component {
//   state = {
//     title: "",
//     body: "",
//     id: "",
//     owner: "",
//     fullName: ""
//   };

//   getPostData = () => {
//     const { unique } = this.props.match.params;
//     axios.get(`/api/content/${unique}`).then(response => {
//       const post = response.data;
//       const { title, body } = post;
//       const id = post._id;
//       const owner = post.owner.username;
//       const { fullName } = post.owner;
//       this.setState({
//         title,
//         body,
//         id,
//         owner,
//         fullName,
//         textToCopy: `http://localhost:3000/u/${owner}/${id}`
//       });
//     });
//   };

//   componentDidMount = () => {
//     this.getPostData();
//   };

//   render() {
//     // console.log(this.state);
//     return (
//       <div>
//         <h1>{this.state.title}</h1>
//         <p>{this.state.body}</p>
//         <button
//           onClick={() => {
//             navigator.clipboard.writeText(this.state.textToCopy);
//           }}
//         >
//           Share this link and check the emotional responses.
//         </button>
//       </div>
//     );
//   }
// }
