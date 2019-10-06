// api/service.js

import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5005/api',
  // withCredentials: true // => you might need this when having the users in the app 
});

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    console.log('file in service: ', theFile)
    return axios.post('/upload', theFile)
      .then(res => {
        console.log(res)
        return res.data
      })
      .catch(errorHandler);
  },

  saveNewThing (newThing) {
    // console.log('new thing is: ', newThing)
    return axios.post('/upload', newThing)
      .then(res => res.data)
      .catch(errorHandler);
  }
}