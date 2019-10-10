import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import FaceApi from "../face-api/FaceApi";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";

// Written in a functional component. Same as below.

const DisplayPost = props => {
  // }
  // class DisplayPost extends Component {
  // state = {
  //   loading: true
  // };

  // componentDidMount = () => {
  //   setTimeout(() => {
  //     this.setState({
  //       loading: false
  //     });
  //   },8000);
  // };
  // const [loading, setLoading] = useState(true)

  // render() {
  const video = props.contentType === "video";
  const audio = props.contentType === "audio";
  const image = props.contentType === "image";

  return (
    <>
      <div>
        {image && <img src={props.urlPath} />}
        {video && (
          <div className='videoPlayer'>
            <div className='embed-responsive'>
              <ReactPlayer url={props.urlPath} controls={true} />
            </div>
          </div>
        )}
        {audio && <ReactAudioPlayer src={props.urlPath} controls />}
        <br />
        HERE {props.views} views
        <br />
        <Link to={`/u/${props.owner}`}>Check the creator's page</Link>
        {/* <FaceApi id={this.props.viewId} /> */}
      </div>
      {/* )} */}
      <FaceApi id={props.viewId} />
    </>
  );
  // }
};

export default DisplayPost;

// export default class DisplayPost extends Component {
//   // componentDidMount = () => {
//   //   this.props.newView();
//   // };
//   // console.log(this.props)

//   render() {
//     console.log("LOOK HERE NOW MOFO", this.props);
//     return (
//       <div>
//         <ReactPlayer url={"https://www.youtube.com/watch?v=8kOiLadbzpM"} />
//         <br />
//         HERE {this.props.views} views
//         <br />
//         <Link to={`/u/${this.props.owner}`}>Check the creator's page</Link>
//         <h1>{this.props.title}</h1>
//         <h3>{this.props.owner}</h3>
//         {this.props.body}
//         <FaceApi id={this.props.id} />
//       </div>
//     );
//   }
// }
