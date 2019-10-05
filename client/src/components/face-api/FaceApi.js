import React, { Component } from "react";
import * as faceapi from "face-api.js";
export default class FaceApi extends Component {
  // variable for detection, to stop the detection when the component is unmounted
  myDetection = 0;

  // stop all the webcams
  webcam = () => {
    const video = document.getElementById("video");
    navigator.getUserMedia(
      { video: {} },
      stream =>
        (video.srcObject = stream.getVideoTracks().forEach(x => x.stop())),
      err => console.error(err)
    );
  };
  // Face API
  faceApi = () => {
    const video = document.getElementById("video");
    //Load Neural Networks models
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/assets"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/assets"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/assets"),
      faceapi.nets.faceExpressionNet.loadFromUri("/assets"),
      faceapi.nets.ageGenderNet.loadFromUri("/assets")
    ]).then(startVideo);
    // start webcam
    function startVideo() {
      navigator.getUserMedia(
        { video: {} },
        stream => (video.srcObject = stream),
        err => console.error(err)
      );
    }
    // append canvas on the video tag for the skeleton
    video.addEventListener("play", async () => {
      const canvas = await faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      const displaySize = { width: video.width, height: video.height };
      await faceapi.matchDimensions(canvas, displaySize);
      console.log("WEBCAM LOADED");

      this.myDetection = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender()
          .withFaceDescriptors();

        if (detections[0] === undefined) {
          console.log("Detection failed... ");
        } else if (detections[0].expressions) {
          if (detections[0].expressions.angry) {
            console.log("angry: ", detections[0].expressions.angry);
          }
          if (detections[0].expressions.disgusted) {
            console.log("disgusted: ", detections[0].expressions.disgusted);
          }
          if (detections[0].expressions.fearful) {
            console.log("fearful: ", detections[0].expressions.fearful);
          }
          if (detections[0].expressions.happy) {
            console.log("happy: ", detections[0].expressions.happy);
          }
          if (detections[0].expressions.neutral) {
            console.log("neutral: ", detections[0].expressions.neutral);
          }
          if (detections[0].expressions.sad) {
            console.log("sad: ", detections[0].expressions.sad);
          }
          if (detections[0].expressions.surprised) {
            console.log("surprised: ", detections[0].expressions.surprised);
          }
          console.log("Age: ", detections[0].age);
          console.log("Gender: ", detections[0].gender);
        }
      }, 100);
    });
  };

  componentDidMount = () => {
    this.faceApi();
  };

  // JUST WAIT A BIT THE CAMERA IS OFF BUT THE LED ON
  componentWillUnmount = () => {
    clearInterval(this.myDetection);
    this.webcam();
    console.log(document.querySelector("video"));
  };

  render() {
    return (
      <div>
        <video
          ref={this.videoTag}
          id="video"
          width="720"
          height="560"
          autoPlay
          muted
        ></video>
      </div>
    );
  }
}
