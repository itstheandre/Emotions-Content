import React, { Component } from "react";
import * as faceapi from "face-api.js";

export default class FaceApi extends Component {
  // state = {
  //   happy: 
  // }
  
  componentDidMount = async () => {
    const video = document.getElementById("video");

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/assets"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/assets"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/assets"),
      faceapi.nets.faceExpressionNet.loadFromUri("/assets")
    ]).then(startVideo);
    function startVideo() {
      navigator.getUserMedia(
        { video: {} },
        stream => (video.srcObject = stream),
        err => console.error(err)
      );
    }

    video.addEventListener("play", async () => {
      const canvas = await faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      const displaySize = { width: video.width, height: video.height };
      await faceapi.matchDimensions(canvas, displaySize);
      console.log("webcam loaded");

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        if (detections[0] === undefined) {
          console.log("UNDEFINED: NOTHING TO SEE HERE ");
        } else if (detections[0].expressions) {
          if (detections[0].expressions.angry > 0.3) {
            console.log("angry: ", detections[0].expressions.angry);
          }
          if (detections[0].expressions.disgusted > 0.3) {
            console.log("disgusted: ", detections[0].expressions.disgusted);
          }
          if (detections[0].expressions.fearful > 0.3) {
            console.log("fearful: ", detections[0].expressions.fearful);
          }
          if (detections[0].expressions.happy > 0.3) {
            console.log("happy: ", detections[0].expressions.happy);
          }
          if (detections[0].expressions.neutral > 0.3) {
            console.log("neutral: ", detections[0].expressions.neutral);
          }
          if (detections[0].expressions.sad > 0.3) {
            console.log("sad: ", detections[0].expressions.sad);
          }
          if (detections[0].expressions.surprised > 0.3) {
            console.log("surprised: ", detections[0].expressions.surprised);
          }
        }
        const resizedDetections = await faceapi.resizeResults(
          detections,
          displaySize
        );

        await canvas
          .getContext("2d")
          .clearRect(0, 0, canvas.width, canvas.height);
        await faceapi.draw.drawDetections(canvas, resizedDetections);
        await faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        await faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }, 100);
    });
  };

  render() {
    return (
      <div>
        <video
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
