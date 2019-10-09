import React, { useState, useEffect } from "react";
import axios from "axios";
import EditProfile from "./EditProfile";

const Settings = ({ user: { _id }, history }) => {
  console.log(_id);

  // fullName: "RootRoot"
  // password: "$2b$10$cN33/c5k3SqGYLQbAIcg.ugPhr8oJAkNIH5fTq9zsidvOFz2aTU4a"
  // updated_at: "2019-10-09T14:38:28.844Z"
  // username: "rootroot"
  // __v: 0
  // _id: "5d9df0e4de23c3e652e51c0c"
  // __proto__: Object

  // const [id, setId] = useState("");
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    profilePictureTest: "",
    oldPasswordTest: "",
    newPasswordTest: ""
  });

  const [clicked, setClicked] = useState(false);
  const [message, setMessage] = useState("");

  // const checkDatabase = () => {
  //   axios.get(`/api/userSettings/${user._id}`).then(({ data }) => {
  //     setFullName(data.fullName);
  //     setUserName(data.username);
  //     setOldPassword(data.password);
  //   });
  // };

  useEffect(() => {
    axios
      .get(`/api/userSettings/${_id}`)
      .then(({ data: { fullName, username } }) => {
        setUser({ ...user, fullName, username });
      });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(user);
    axios
      .put(`/api/userSettings/${_id}`, user)
      .then(() => {
        history.push("/content-dashboard");
      })
      .catch(err => {
        setMessage(err.response.data.message);
      });
  };

  const onImageUpload = event => {
    console.log("the file to be added is", event.target.files[0]);

    const files = event.target.files[0];
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("profilePicture", files);
    axios.post("/api/userSettings/add/image", uploadData).then(response => {
      const profilePictureTest = response.data.secure_url;
      setUser(...user, profilePictureTest);
    });
  };

  return (
    <div>
      <h1>Heverything is here</h1>
      {/* <button onClick={checkDatabase}>Click for console.log</button> */}
      <h2>{user.username} </h2>
      <EditProfile
        setUser={setUser}
        handleSubmit={handleSubmit}
        onImageUpload={onImageUpload}
        user={user}
      />
      {message}
    </div>
  );
};

export default Settings;

/* 

{_id: "5d9df0e4de23c3e652e51c0c", username: "rootroot", password: "$2b$10$cN33/c5k3SqGYLQbAIcg.ugPhr8oJAkNIH5fTq9zsidvOFz2aTU4a", fullName: "RootRoot", created_at: "2019-10-09T14:38:28.844Z", …}
created_at: "2019-10-09T14:38:28.844Z"
fullName: "RootRoot"
password: "$2b$10$cN33/c5k3SqGYLQbAIcg.ugPhr8oJAkNIH5fTq9zsidvOFz2aTU4a"
updated_at: "2019-10-09T14:38:28.844Z"
username: "rootroot"
__v: 0
_id: "5d9df0e4de23c3e652e51c0c"
__proto__: Object

*/
