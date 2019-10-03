import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const ContentDashCard = props => {
  const handleClick = event => {
    console.log(props.content)
    return Axios.delete(`/api/content/${props.content._id}`).then(response=>{
      console.log(response.data);
      props.getData();
    });

  };

  return (
    <div className='contentCard'>
      <h2>{props.content.title}</h2>
      <h4>{props.content.date}</h4>
      <Link to={`/${props.content._id}`}>View</Link>
      <Link to={`/edit/${props.content._id}`}>Edit</Link>
      <Link onClick={handleClick}>Delete</Link>

      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default ContentDashCard;
