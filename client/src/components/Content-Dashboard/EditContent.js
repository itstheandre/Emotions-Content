import React, { useState, useEffect } from "react";
import axios from "axios";

const EditContent = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");

  const getData = () => {
    const { editPost } = props.match.params;
    axios.get(`/api/content/${editPost}`).then(post => {
      const id = post.data._id;
      const { title, body } = post.data;
      setTitle(title);
      setBody(body);
      setId(id);
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`/api/content/${id}`, { title, body }).then(() => {
      this.props.history.push("/content-dashboard");
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label htmlFor='body'>Body</label>
        <input
          type='text'
          id='body'
          name='body'
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <button type='submit'>Edit your content</button>
      </form>
    </>
  );
};

export default EditContent;

// export default class EditContent extends Component {
//   state = {
//     title: "",
//     body: "",
//     id: ""
//   };

//   getData = () => {
//     const { editPost } = this.props.match.params;
//     // console.log(this.props.match.params.editPost);
//     axios.get(`/api/content/${editPost}`).then(post => {
//       // console.log(post.data);
//       this.setState({
//         title: post.data.title,
//         body: post.data.body,
//         id: post.data._id
//       });
//     });
//   };

//   componentDidMount = () => {
//     this.getData();
//   };

//   handleChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const { title, body, id } = this.state;
//     axios.put(`/api/content/${id}`, { title, body }).then(() => {
//       this.props.history.push("/content-dashboard");
//     });
//   };

//   render() {
//     return (
//       <>
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor='title'>Title</label>
//           <input
//             type='text'
//             id='title'
//             name='title'
//             value={this.state.title}
//             onChange={this.handleChange}
//           />

//           <label htmlFor='body'>Body</label>
//           <input
//             type='text'
//             id='body'
//             name='body'
//             value={this.state.body}
//             onChange={this.handleChange}
//           />
//           <button type='submit'>Edit your content</button>
//         </form>
//       </>
//     );
//   }
// }
