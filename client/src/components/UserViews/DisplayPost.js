import React from "react";
import { Link } from "react-router-dom";
import FaceApi from "../face-api/FaceApi";
import ReactPlayer from "react-player";

// Written in a functional component. Same as below.

const DisplayPost = props => {
  console.log("PROPS", props);
  return (
    <div>
      <ReactPlayer
        url={"https://www.youtube.com/watch?v=8kOiLadbzpM"}
        controls={true}
      />
      <br />
      HERE {props.views} views
      <br />
      <Link to={`/u/${props.owner}`}>Check the creator's page</Link>
      <h1>{props.title}</h1>
      <h3>{props.owner}</h3>
      {props.body}
      <FaceApi id={props.id} />
    </div>
  );
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
