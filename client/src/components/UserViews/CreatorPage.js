import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

// WRITTEN IN HOOKS. SAME AS BELOW

const CreatorPage = props => {
  const [content, setContent] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    // getData() same thing as below. useEffect gives out a warning
    const { user } = props.match.params;
    axios.get(`/u/api/${user}`).then(contentArr => {
      const contentData = contentArr.data;
      setContent(contentData);
      setUser(user);
    });
  }, []);

  // const getData =() => {
  //    const { user } = props.match.params;
  //    axios.get(`/u/api/${user}`).then(contentArr => {
  //      console.log(contentArr.data);
  //      const contentData = contentArr.data;
  //      setContent(contentData);
  //      setUser(user);
  //    });
  // }

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }} className='logIn h3'>
          My Content Dashboard
        </h2>

        <br />

        {content.reverse().map(el => {
          return <UserCard content={el} key={el._id} user={user} />;
        })}
      </div>
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
