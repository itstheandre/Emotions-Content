import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

// WRITTEN IN HOOKS. SAME AS BELOW

const CreatorPage = props => {
  const [content, setContent] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    return getData();
  }, []);

  const getData = () => {
    const { user } = props.match.params;
    axios.get(`/u/api/${user}`).then(contentArr => {
      console.log(contentArr.data);
      console.log(content);
      const contentData = contentArr.data;
      setContent(...content, contentData);
      setUser(user);
    });
  };

  console.log("CONTENT STATE", content);
  return (
    <>
      {content.reverse().map(el => {
        console.log("CONSOLE LOG THE MAP HERE", el);
        return <UserCard content={el} key={el._id} user={user} />;
      })}
    </>
  );
};

export default CreatorPage;

// export default class CreatorPage extends Component {
//   state = {
//     content: [],
//     user: ""
//   };

//   componentDidMount = () => {
//     console.log("Mounted");
//     this.getData();
//   };

//   getData = () => {
//     // console.log(this.props.match.params);
//     const { user } = this.props.match.params;
//     axios.get(`/u/api/${user}`).then(contentArr => {
//       this.setState({
//         content: contentArr.data,
//         user
//       });
//     });
//   };

//   render() {
//     console.log("André", this.state);
//     return (
//       <>
//         {this.state.content.reverse().map(el => {
//           return <UserCard content={el} key={el._id} user={this.state.user} />;
//         })}
//       </>
//     );
//   }
// }
