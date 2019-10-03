import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const ContentDashCard = props => {
  const handleClick = event => {
    return Axios.delete(`/content/delete/${props._id}`);
  };

  return (
    <div className='contentCard'>
      <h2>{props.title}</h2>
      <h4>{props.date}</h4>
      <Link to={`/${props._id}`}>View</Link>
      <Link to={`/edit/${props._id}`}>Edit</Link>
      <Link onClick={handleClick}>Delete</Link>

      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default ContentDashCard;
