import React, { useState, useEffect } from "react";

const EditProfile = ({ setUser, handleSubmit, onImageUpload, user }) => {
  console.log(user);
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='fullName'>Name</label>
      <input
        type='text'
        name='fullName'
        id='fullName'
        value={user.fullName}
        onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
      />
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        name='username'
        id='username'
        value={user.username}
        onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
      />
      <label htmlFor='oldPasswordTest'>Old Password</label>
      <input
        type='password'
        name='oldPasswordTest'
        id='oldPasswordTest'
        value={user.oldPasswordTest}
        onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
      />
      <label htmlFor='newPasswordTest'>Password</label>
      <input
        type='password'
        name='newPasswordTest'
        id='newPasswordTest'
        value={user.newPasswordTest}
        onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
      />
      <label htmlFor='file'>Profile Picture</label>
      <input
        type='file'
        name='profilePictureTest'
        id='profilePictureTest'
        onChange={onImageUpload}
      />
      <button type='submit'>Submit your changes</button>
    </form>
  );
};

export default EditProfile;
