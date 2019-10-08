import React, { useState } from "react";
import { signup } from "../services/api";

// Written in props. Equivalent in Classes below

const Signup = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    signup(username, password, fullName).then(data => {
      if (data.message) {
        setMessage(data.message);
      } else {
        props.setUser(data);
        props.history.push("/");
      }
    });
  };

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor='fullName'>Full Name: </label>
        <input
          type='text'
          name='fullName'
          id='fullName'
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {message && <h1>{message}</h1>}
        <button type='submit'>Create Account</button>
      </form>
    </>
  );
};

export default Signup;

// export default class Signup extends Component {
//   state = {
//     username: "",
//     password: "",
//     message: "",
//     fullName: ""
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const { username, password, fullName } = this.state;
//     signup(username, password, fullName).then(data => {
//       if (data.message) {
//         this.setState({
//           message: data.message
//         });
//       } else {
//         this.props.setUser(data);
//         this.props.history.push("/");
//         // console.log(data);
//       }
//     });
//   };

//   handleChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };
//   render() {
//     // console.log(this.state.username);
//     return (
//       <>
//         <h1>Sign up</h1>
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor='username'>Username: </label>
//           <input
//             type='text'
//             name='username'
//             id='username'
//             value={this.state.username}
//             onChange={this.handleChange}
//           />
//           <label htmlFor='fullName'>Full Name: </label>
//           <input
//             type='text'
//             name='fullName'
//             id='fullName'
//             value={this.state.fullName}
//             onChange={this.handleChange}
//           />
//           <label htmlFor='password'>Password</label>
//           <input
//             type='password'
//             name='password'
//             id='password'
//             value={this.state.password}
//             onChange={this.handleChange}
//           />
//           {this.state.message && <h1>{this.state.message}</h1>}
//           <button type='submit'>Create Account</button>
//         </form>
//       </>
//     );
//   }
// }
