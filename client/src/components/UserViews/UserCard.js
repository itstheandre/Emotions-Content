import React from "react";
import { Link } from "react-router-dom";

const UserCard = props => {
  console.log(props);
  return (
    <div className='contentCard'>
      <h2>{props.content.title}</h2>
      <h4>{props.content.date}</h4>
      <button>
        <Link to={`/u/${props.user}/${props.content._id}`}>View</Link>
      </button>
    </div>
  );
};

export default UserCard;
