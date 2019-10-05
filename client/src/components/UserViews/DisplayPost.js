import React from "react";

const DisplayPost = props => {
  console.log(props);
  return (
    <div>
      <h1>{props.title}</h1>
      <h3>{props.owner}</h3>A beautiful song from yo momma!!
      {props.body}
    </div>
  );
};

export default DisplayPost;
