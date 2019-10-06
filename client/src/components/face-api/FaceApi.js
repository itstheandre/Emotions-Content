import React, { Component } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default class FaceApi extends Component {
  state = {
    angryMaxValue: 0,
    disgustedMaxValue: 0,
    fearfulMaxValue: 0,
    happyMaxValue: 0,
    neutralMaxValue: 0,
    sadMaxValue: 0,
    surprisedMaxValue: 0,
    angryAvgValue: 0,
    disgustedAvgValue: 0,
    fearfulAvgValue: 0,
    happyAvgValue: 0,
    neutralAvgValue: 0,
    sadAvgValue: 0,
    surprisedAvgValue: 0,
    gender: "",
    age: 0,
    time: 0
  };

  // FACEAPI Detections
  angryValues = [];
  disgustedValues = [];
  fearfulValues = [];
  happyValues = [];
  neutralValues = [];
  sadValues = [];
  surprisedValues = [];
  ageValues = [];
  genderValues = [];

  // CALCULATE MAX AND AVG VALUES OF THE EMOTIONS ---- GENDER ---- AGE AVG
  MaxAndAvg = () => {
    this.setState({
      angryMaxValue: Math.max(...this.angryValues),
      disgustedMaxValue: Math.max(...this.disgustedValues),
      disgustedMaxValue: Math.max(...this.disgustedValues),
      fearfulMaxValue: Math.max(...this.fearfulValues),
      happyMaxValue: Math.max(...this.happyValues),
      neutralMaxValue: Math.max(...this.neutralValues),
      sadMaxValue: Math.max(...this.sadValues),
      surprisedMaxValue: Math.max(...this.surprisedValues),
      angryAvgValue:
        this.angryValues.reduce((x, y) => x + y, 0) / this.angryValues.length,
      disgustedAvgValue:
        this.disgustedValues.reduce((x, y) => x + y, 0) /
        this.disgustedValues.length,
      fearfulAvgValue:
        this.fearfulValues.reduce((x, y) => x + y, 0) /
        this.fearfulValues.length,
      happyAvgValue:
        this.happyValues.reduce((x, y) => x + y, 0) / this.happyValues.length,
      neutralAvgValue:
        this.neutralValues.reduce((x, y) => x + y, 0) /
        this.neutralValues.length,
      sadAvgValue:
        this.sadValues.reduce((x, y) => x + y, 0) / this.sadValues.length,
      surprisedAvgValue:
        this.surprisedValues.reduce((x, y) => x + y, 0) /
        this.surprisedValues.length,
      age: this.ageValues.reduce((x, y) => x + y, 0) / this.ageValues.length,
      gender: this.genderValues
    });
  };

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
    // JUST WAIT A BIT THE CAMERA IS OFF BUT THE LED ON
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
          console.log("DETECTION FAILED... ");
        } else if (detections[0].expressions) {
          console.log("STORING EMOTIONS...");
          if (detections[0].expressions.angry) {
            // console.log("angry: ", detections[0].expressions.angry.toFixed(4));
            //store ANGRY values in the array angryValues
            this.angryValues.push(detections[0].expressions.angry);
          }
          if (detections[0].expressions.disgusted) {
            // console.log("disgusted: ", detections[0].expressions.disgusted);
            //store DISGUSTED values in the array disgustedValues
            this.disgustedValues.push(detections[0].expressions.disgusted);
          }
          if (detections[0].expressions.fearful) {
            // console.log("fearful: ", detections[0].expressions.fearful);
            //store FEARFUL values in the array fearfulValues
            this.fearfulValues.push(detections[0].expressions.fearful);
          }
          if (detections[0].expressions.happy) {
            // console.log("happy: ", detections[0].expressions.happy);
            //store HAPPY values in the array happyValues
            this.happyValues.push(detections[0].expressions.happy);
          }
          if (detections[0].expressions.neutral) {
            // console.log("neutral: ", detections[0].expressions.neutral);
            //store NEUTRAL values in the array neutralValues
            this.neutralValues.push(detections[0].expressions.neutral);
          }
          if (detections[0].expressions.sad) {
            // console.log("sad: ", detections[0].expressions.sad);
            //store SAD values in the array sadValues
            this.sadValues.push(detections[0].expressions.sad);
          }
          if (detections[0].expressions.surprised) {
            // console.log("surprised: ", detections[0].expressions.surprised);
            //store SURPRISED values in the array surprisedValues
            this.surprisedValues.push(detections[0].expressions.surprised);
          }
          // console.log("age: ", detections[0].age);
          this.ageValues.push(detections[0].age);
          // console.log("gender: ", detections[0].gender);
          this.genderValues.push(detections[0].gender);
        }
      }, 100);
    });
  };

  //////////////////////COMPONENTS-MOUNT////////////////////////
  componentDidMount = () => {
    this.faceApi();
  };
  /////////////////////////FEATURE TO IMPLEMENT ///////////////////////////
  // SEND DATA TO THE SERVER IF CLOSE TAB/REFRESH TAB/ADD TAB

  componentWillUnmount = () => {
    clearInterval(this.myDetection);
    this.webcam();

    // CALCULATE MAX AND AVG VALUES OF EMOTIONS DURING THE SESSION
    this.MaxAndAvg();

    // STORE THE MAX AND AVG VALUES IN faceDetection Object
    let faceDetection = {
      angry: [this.state.angryMaxValue, this.state.angryAvgValue],
      disgusted: [this.state.disgustedMaxValue, this.state.disgustedAvgValue],
      fearful: [this.state.fearfulMaxValue, this.state.fearfulAvgValue],
      happy: [this.state.happyMaxValue, this.state.happyAvgValue],
      neutral: [this.state.neutralMaxValue, this.state.neutralAvgValue],
      sad: [this.state.sadMaxValue, this.state.sadAvgValue],
      surprised: [this.state.surprisedMaxValue, this.state.surprisedAvgValue],
      age: Math.ceil(this.state.age),
      gender: this.state.gender[10]
    };
    console.log("FaceDetectionOBJ------", faceDetection);
    console.log("STATE AFTER UNMOUNT-------", this.state);

    // SEND faceDetection Object to the DB
    axios
      .post("/u/api/5d97107f221235d09862a990", faceDetection)
      .then(detectionValues => {
        console.log(detectionValues);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <video
          // ref={this.videoTag}
          id="video"
          width="720"
          height="560"
          autoPlay
          muted
        ></video>
        <button
          onClick={() => {
            this.MaxAndAvg();
            console.log("ANGRYVALUES", this.angryValues);
            console.log("STATE DURING THE SESSION -----------", this.state);
          }}
        >
          CHECK STATE
        </button>
      </div>
    );
  }
}
