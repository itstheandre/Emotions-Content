import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const ContentDashCard = props => {
  const handleClick = event => {
    event.preventDefault();
    return Axios.delete(`/api/content/${props.content._id}`).then(response => {
      // console.log(response.data);
      props.getData();
    });
  };

  // console.log("props here", props.content);
  return (
    <div className='contentCard'>
      <h2>{props.content.title}</h2>
      <h4>{props.content.date}</h4>
      <button>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/content-dashboard/${props.content._id}`}
        >
          View
        </Link>
      </button>
      <button>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/edit/${props.content._id}`}
        >
          Edit
        </Link>
      </button>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};

export default ContentDashCard;
