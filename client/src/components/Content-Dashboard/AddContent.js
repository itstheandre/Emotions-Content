import React, { Component, useState } from "react";
import axios from "axios";

const AddContent = props => {
  const [urlPath, setUrlPath] = useState("");
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("image");
  const [enctype, setEnctype] = useState(false);
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  // const [selected, setSelected] = useState(null);

  const handleChange = event => {
    console.log(`Option selected:`, event.target.value);
    const { value } = event.target;
    console.log(typeof value, value === event.target.value);
    if (value === "text") {
      setContentType(value);
      setMessage("Adding text will be added later. Stay tuned!");
    } else if (value !== "video") {
      setContentType(value);
      setEnctype(true);
    } else {
      setContentType(value);
      setMessage("");
    }
  };

  // Form Submit Handler. Sends title, contentType, Body and the URL to the Database
  const handleSubmit = event => {
    event.preventDefault();

    if (urlPath && title && contentType && body) {
      axios
        .post("/api/content/add", {
          urlPath,
          title,
          contentType,
          body
        })
        .then(() => {
          props.history.push("/content-dashboard");
        });
    } else {
      setMessage("Please fill out the whole form");
    }
  };

  // Sends Image to
  const onImageUpload = event => {
    console.log("the file to be added is", event.target.files[0]);

    const files = event.target.files[0];
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("urlPath", files);
    axios.post("/api/content/add/image", uploadData).then(response => {
      const urlPath = response.data.secure_url;
      setUrlPath(urlPath);
    });
  };

  const onAudioUpload = event => {
    console.log("the file to be added is", event.target.files[0]);

    const files = event.target.files[0];
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("urlPath", files);
    axios.post("/api/content/add/audio", uploadData).then(response => {
      const urlPath = response.data.secure_url;
      setUrlPath(urlPath);
    });
  };

  const formInfo = enctype ? "multipart/form-data" : "";
  const image = contentType === "image";
  const audio = contentType === "audio";
  const video = contentType === "video";
  const text = contentType === "text";

  return (
    <>
      <form onSubmit={handleSubmit} encType={formInfo}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor='contentType'>Content Type</label>
        <select
          id='contentType'
          name='contentType'
          value={contentType}
          onChange={handleChange}
        >
          <option value='image'>Image</option>
          <option value='text'>Text</option>
          <option value='audio'>Audio</option>
          <option value='video'>Video</option>
        </select>
        {image && (
          <>
            <label htmlFor='file'>Upload your image</label>
            <input
              type='file'
              name='urlPath'
              id='urlPath'
              onChange={onImageUpload}
            />

            <img src={urlPath} />
          </>
        )}
        {audio && (
          <>
            <label htmlFor='file'>Upload your audio</label>
            <input
              type='file'
              name='urlPath'
              id='urlPath'
              onChange={onAudioUpload}
            />
          </>
        )}
        {video && (
          <>
            <label htmlFor='file'>Paste your Youtube Link</label>
            <input
              type='text'
              name='urlPath'
              id='urlPath'
              onChange={e => setUrlPath(e.target.value)}
              value={urlPath}
            />
          </>
        )}
        {text && <div>{message}</div>}
        <label htmlFor='body'>Add a description</label>
        <input
          name='body'
          id='body'
          type='text'
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        {!text && <button type='submit'>Upload your content</button>}
        {message}
      </form>
    </>
  );
};

export default AddContent;

// export default class AddContent extends Component {
//   state = {
//     url: "",
//     title: "",
//     contentType: "text",
//     body: "",
//     imagePath: "",
//     encType: false
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     // imagePath
//     const { url, title, contentType, body, imagePath } = this.state;
//     console.log("WHATS UP", this.state.imagePath);
//     axios
//       .post("/api/content/add", {
//         url,
//         title,
//         contentType,
//         body,
//         imagePath
//       })
//       .then(() => {
//         this.props.history.push("/content-dashboard");
//       });
//   };

//   handleChange = event => {
//     const { name, value } = event.target;
//     console.log(name);
//     console.log(value);
//     this.setState({
//       [name]: value
//     });
//   };

//   onUpload = event => {
//     console.log("the file to be added is", event.target.files[0]);

//     const files = event.target.files[0];
//     const uploadData = new FormData();
//     // imageUrl => this name has to be the same as in the model since we pass
//     // req.body to .create() method when creating a new thing in '/api/things/create' POST route
//     uploadData.append("imagePath", files);
//     axios.post("/api/content/add/image", uploadData).then(response => {
//       const imagePath = response.data.secure_url;
//       console.log(typeof imagePath);
//       this.setState({
//         imagePath
//       });
//     });
//   };

//   handleSelect = event => {
//     const { name, value } = event.target;
//     console.log(name);
//     if (value !== "text") {
//       this.setState({
//         [name]: value,
//         encType: true
//       });
//     } else if (value === "text") {
//       this.setState({
//         [name]: value,
//         encType: false
//       });
//     }
//   };

//   // encType='multipart/form-data'
//   render() {
//     console.log(this.state.encType);
//     const { contentType } = this.state;
//     const notText = contentType !== "text" ? true : false;

//     const enctype = this.state.encType ? "multipart/form-data" : "";

//     return (
//       <>
//         <form onSubmit={this.handleSubmit} encType={enctype}>
//           <label htmlFor='url'>URL</label>
//           <input
//             type='text'
//             name='url'
//             id='title'
//             value={this.state.url}
//             onChange={this.handleChange}
//           />

//           <label htmlFor='title'>Title</label>
//           <input
//             type='text'
//             name='title'
//             id='title'
//             value={this.state.title}
//             onChange={this.handleChange}
//           />
//           <label htmlFor='contentType'>Content Type</label>
//           <select
//             id='contentType'
//             name='contentType'
//             value={this.state.contentType}
//             onChange={this.handleSelect}
//           >
//             <option value='text'>Text</option>
//             <option value='audio'>Audio</option>
//             <option value='video'>Video</option>
//             <option value='image'>Image</option>
//           </select>

//           {notText && (
//             <>
//               <label htmlFor='file'>Content</label>
//               <input
//                 type='file'
//                 name='imagePath'
//                 id='imagePath'
//                 onChange={this.onUpload}
//               />{" "}
//             </>
//           )}
//           <label htmlFor='body'>Body</label>
//           <input
//             type='text'
//             name='body'
//             id='body'
//             value={this.state.body}
//             onChange={this.handleChange}
//           />
//           <button type='submit'>Add your lovely content now</button>
//         </form>
//       </>
//     );
//   }
// }
