import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayPost from "./DisplayPost";

const Post = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [contentId, setContentId] = useState("");
  const [owner, setOwner] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [viewId, setViewId] = useState("");
  const [viewTotal, setViewTotal] = useState(0);
  const [urlPath, setUrlPath] = useState("");
  const [contentType, setContentType] = useState("");

  // const getPostData = () => {
  //    axios.get(`/u / api / ${ user } /${contentId}`).then(response => {
  //   const newId = response.data._id;
  //   const owner = response.data.owner.username;
  //   const ownerId = response.data.owner._id;
  //   const viewTotal = response.data.views.length;
  //   const { title, body } = response.data;
  //   axios.post(`/api/views/${newId}`).then(created => {
  //     const viewId = created.data._id;
  //     setBody(body);
  //     setTitle(title);
  //     setOwner(owner);
  //     setOwnerId(ownerId);
  //     setViewId(viewId);
  //     setContentId(newId);
  //     setViewTotal(viewTotal);
  //   });
  // });
  // };

  useEffect(() => {
    // getPostData(); Same thing as the function above. Everything written here to stop watning
    const { user } = props.match.params;
    const contentId = props.match.params.id;
    axios.get(`/u/api/${user}/${contentId}`).then(response => {
      const newId = response.data._id;
      const owner = response.data.owner.username;
      const ownerId = response.data.owner._id;
      const viewTotal = response.data.views.length;
      const { title, body, contentType, urlPath } = response.data;

      axios.post(`/api/views/${newId}`).then(created => {
        const viewId = created.data._id;
        setBody(body);
        setTitle(title);
        setOwner(owner);
        setOwnerId(ownerId);
        setViewId(viewId);
        setContentId(newId);
        setViewTotal(viewTotal);
        setContentType(contentType);
        setUrlPath(urlPath);
      });
    });
  }, []);

  const state = {
    title,
    body,
    contentId,
    owner,
    ownerId,
    viewId,
    viewTotal,
    contentType,
    urlPath
  };

  return (
    <div>
      <h1>{contentType}</h1>
      <br />
      <h1>#of Views {viewTotal}</h1>
      <h1>{title} </h1>
      <h2>{body}</h2>
      <h3>CONTENT ID: {contentId}</h3>
      <h4>OWNER: {owner} </h4>
      <h5>OWNERID: {ownerId} </h5>
      <h6>viewID: {viewId} </h6>

      <DisplayPost {...state} />
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
//     ownerId: "",
//     views: 0
//   };

//   componentDidMount = () => {
//     this.getPostData();
//   };

//   getPostData = () => {
//     const { user, id } = this.props.match.params;
//     console.log(id);
//     axios.get(`/u/api/${user}/${id}`).then(response => {
//       const views = response.data.views + 1;
//       const newId = response.data._id;

//       axios.put(`/u/api/views/${newId}`, { views }).then(response => {
//         console.log("PUT REQUEST NOW", response.data);
//         const owner = response.data.owner.username;
//         const ownerId = response.data.owner._id;
//         const { title, body } = response.data;
//         this.setState({
//           title,
//           body,
//           owner,
//           ownerId,
//           views: response.data.views
//         });
//       });

//       this.setState({
//         views
//       });
//     });
//   };

//   render() {
//     return (
//       <div>
//         <DisplayPost newView={this.newView} {...this.state} />

//         <DisplayPost {...this.state} />
//         {/* Here To add the FaceDetection */}
//         <ReactPlayer url={"https://www.youtube.com/watch?v=8kOiLadbzpM"} />
//       </div>
//     );
//   }
// }
