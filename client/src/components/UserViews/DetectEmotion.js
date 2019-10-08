import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import DisplayPost from "./DisplayPost";
// import { Link } from "react-router-dom"
import ReactPlayer from "react-player";

const Post = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");
  const [owner, setOwner] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [views, setViews] = useState(0);

  const getPostData = () => {
    const { user } = props.match.params;
    const contentId = props.match.params.id;
    axios.get(`/u/api/${user}/${contentId}`).then(response => {
      const views = response.data.views + 1;
      const newId = response.data._id;
      axios.put(`/u/api/views/${newId}`, { views }).then(response => {
        console.log("RESPONSE DATA FROM PUT REQUEST: ", response.data);
        const owner = response.data.owner.username;
        const ownerId = response.data.owner._id;
        const { title, body } = response.data;
        setTitle(title);
        setBody(body);
        setOwner(owner);
        setOwnerId(ownerId);
        setViews(response.data.views);
        setId(contentId);
      });
    });
  };

  useEffect(() => {
    getPostData();
  }, []);

  const state = {
    title,
    body,
    id,
    owner,
    ownerId,
    views
  };
  console.log(state);
  return (
    <div>
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

// componentDidMount = () => {
//   this.getPostData();
// };

// getPostData = () => {
//   const { user, id } = this.props.match.params;
//   console.log(id);
//   axios.get(`/u/api/${user}/${id}`).then(response => {
//     const views = response.data.views + 1;
//     const newId = response.data._id;

//     axios.put(`/u/api/views/${newId}`, { views }).then(response => {
//       console.log("PUT REQUEST NOW", response.data);
//       const owner = response.data.owner.username;
//       const ownerId = response.data.owner._id;
//       const { title, body } = response.data;
//       this.setState({
//         title,
//         body,
//         owner,
//         ownerId,
//         views: response.data.views
//       });
//     });

// this.setState({
//   views
// });
// });
// };

// render() {
// return (
// <div>
{
  /* <DisplayPost newView={this.newView} {...this.state} /> */
}
{
  /* <DisplayPost {...this.state} /> */
}
{
  /* Here To add the FaceDetection */
}
{
  /* <ReactPlayer url={"https://www.youtube.com/watch?v=8kOiLadbzpM"} /> */
}
{
  /* </div> */
}
// );
// }
// }
