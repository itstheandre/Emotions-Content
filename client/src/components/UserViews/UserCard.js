import React from "react";
import { Link } from "react-router-dom";

const UserCard = props => {
  console.log(props);
  return (
    <div className='text-center dashCard'>
      <div className='contentCard'>
        <h2>{props.content.title}</h2>
        <h4>{props.content.date}</h4>
        <h3>{props.content.contentType}</h3>

        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/u/${props.user}/${props.content._id}`}
        >
          <i className='fas fa-lg fa-eye'></i>
        </Link>
        <hr style={{ width: "60%" }} />
      </div>
    </div>
  );
};

export default UserCard;
