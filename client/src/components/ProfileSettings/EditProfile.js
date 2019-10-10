import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBLabel
} from "mdbreact";

const EditProfile = ({ setUser, handleSubmit, onImageUpload, user }) => {
  return (
    // <form onSubmit={handleSubmit}>
    //   <label htmlFor='fullName'>Name</label>
    //   <input
    //     type='text'
    //     name='fullName'
    //     id='fullName'
    //     value={user.fullName}
    //     onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
    //   />
    //   <label htmlFor='username'>Username</label>
    //   <input
    //     type='text'
    //     name='username'
    //     id='username'
    //     value={user.username}
    //     onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
    //   />
    //   <label htmlFor='oldPasswordTest'>Old Password</label>
    //   <input
    //     type='password'
    //     name='oldPasswordTest'
    //     id='oldPasswordTest'
    //     value={user.oldPasswordTest}
    //     onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
    //   />
    //   <label htmlFor='newPasswordTest'>Password</label>
    //   <input
    //     type='password'
    //     name='newPasswordTest'
    //     id='newPasswordTest'
    //     value={user.newPasswordTest}
    //     onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
    //   />
    //   <label htmlFor='file'>Profile Picture</label>
    //   <input
    //     type='file'
    //     name='profilePicture'
    //     id='profilePicture'
    //     onChange={onImageUpload}
    //   />
    //   <button type='submit'>Submit your changes</button>
    // </form>
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            {/* <label htmlFor="fullName">Name</label> */}
            <MDBInput
              label='name'
              type='text'
              name='fullName'
              id='fullName'
              value={user.fullName}
              onChange={({ target: { name, value } }) =>
                setUser({ ...user, [name]: value })
              }
            />
            {/* <label htmlFor="username">Username</label> */}
            <MDBInput
              label='username'
              type='text'
              name='username'
              id='username'
              value={user.username}
              onChange={({ target: { name, value } }) =>
                setUser({ ...user, [name]: value })
              }
            />
            {/* <label htmlFor="oldPasswordTest">Old Password</label> */}
            <MDBInput
              label='oldpassword'
              type='password'
              name='oldPasswordTest'
              id='oldPasswordTest'
              value={user.oldPasswordTest}
              onChange={({ target: { name, value } }) =>
                setUser({ ...user, [name]: value })
              }
            />
            {/* <label htmlFor="newPasswordTest">Password</label> */}
            <MDBInput
              label='new password'
              type='password'
              name='newPasswordTest'
              id='newPasswordTest'
              value={user.newPasswordTest}
              onChange={({ target: { name, value } }) =>
                setUser({ ...user, [name]: value })
              }
            />
            {/* <label htmlFor="file">Profile Picture</label>
            <input
              type="file"
              name="profilePictureTest"
              id="profilePictureTest"
              onChange={onImageUpload}
            /> */}
            {/* <div className='input-group'>
              <div className='custom-file'>
                <input
                  type='file'
                  name='profilePictureTest'
                  id='profilePictureTest'
                  onChange={onImageUpload}
                  className='custom-file-input'
                  aria-describedby='inputGroupFileAddon01'
                />
                <label className='custom-file-label grey-text' htmlFor='file'>
                  choose file
                </label>
              </div>
            </div> */}
            <div className='text-center'>
              <MDBBtn type='submit'>Save</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default EditProfile;
