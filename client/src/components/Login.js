import React, { useState } from "react";
import { login } from "../services/api";

// Written in props. Equivalent in Classes below

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    login(username, password).then(data => {
      if (data.message) {
        setMessage(data.message);
      } else {
        props.setUser(data);
        props.history.push("/projects");
      }
    });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
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

        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;
// export default class Login extends Component {
//   state = {
//     username: "",
//     password: "",
//     message: ""
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     const { username, password } = this.state;

//     login(username, password).then(data => {
//       if (data.message) {
//         this.setState({
//           message: data.message,
//           username: "",
//           password: ""
//         });
//       } else {
//         // successfully logged in
//         // update the state for the parent component
//         this.props.setUser(data);
//         this.props.history.push("/projects");
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
//         <h1>Login</h1>
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor='username'>Username: </label>
//           <input
//             type='text'
//             name='username'
//             id='username'
//             value={this.state.username}
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
