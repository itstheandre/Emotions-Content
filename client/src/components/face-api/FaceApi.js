import React, { Component } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import { Beforeunload } from "react-beforeunload";

// MEDIAN FUNCTION to have more accurate result from the emotions
const median = values => {
  if (values.length === 0) return 0;

  values.sort((a, b) => {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};
//-------------------------------------------------------------------

//_______________________CHECK TAB FOCUS_____________________________
let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
// __________________________________________________________________

export default class FaceApi extends Component {
  // SAVE TAB FOCUS
  state = {
    actions: []
  };

  handleVisibilityChange = () => {
    if (document[hidden]) {
      this.setState({ actions: [...this.state.actions, "hide"] });
    } else {
      this.setState({ actions: [...this.state.actions, "show"] });
    }
  };

  // MANAGES THE FACE DETECTION OBJ, STORE INFO TO DB, STOP FACEAPI DETECTION, CALCULATE MEDIAN AND MAX DETECTION VALUES, STOP WEBCAMS
  dataManager = () => {
    clearInterval(this.myDetection);
    this.webcam();

    // CALCULATE MAX AND AVG VALUES OF EMOTIONS DURING THE SESSION
    const values = this.MaxAndAvg();
    const getTime = this.timeSessionCalculation();
    // STORE THE MAX AND AVG VALUES IN faceDetection Object
    let faceDetection = {
      angry: [values.angryMaxValue, values.angryAvgValue],
      disgusted: [values.disgustedMaxValue, values.disgustedAvgValue],
      fearful: [values.fearfulMaxValue, values.fearfulAvgValue],
      happy: [values.happyMaxValue, values.happyAvgValue],
      neutral: [values.neutralMaxValue, values.neutralAvgValue],
      sad: [values.sadMaxValue, values.sadAvgValue],
      surprised: [values.surprisedMaxValue, values.surprisedAvgValue],
      age: Math.ceil(values.age),
      gender: values.gender,
      time: {
        fullTime: values.time,
        min: getTime.min,
        sec: getTime.sec
      }
    };

    console.log("FaceDetectionOBJ------", faceDetection);
    console.log("STATE AFTER UNMOUNT-------", values);

    // SEND faceDetection Object to the DB
    axios
      .put(`/u/api/${this.props.id}`, faceDetection)
      .then(detectionValues => {
        console.log(detectionValues);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //_____________________TIME SESSION MANAGER____________________
  timeElapsed = [];

  timeSession = () => {
    let currTime = "";
    let startEndSession = [];
    let date = new Date().toString().split(" ");
    let day = date[2];
    let month = date[1];
    let year = date[3];
    let time = date[4].toString().split("");
    // let gmt = date[5];

    let hour = time[0] + time[1];
    let min = time[3] + time[4];
    let sec = time[6] + time[7];
    currTime = `${day} ${month} ${year} ${hour}:${min}:${sec}`;
    // console.log(day, month, year, hour, min, sec);
    startEndSession = this.timeElapsed.push(currTime);
    return startEndSession;
  };

  timeSessionCalculation = () => {
    let minStart = parseInt(this.timeElapsed[0].split(" ")[3].split(":")[1]);
    let secStart = parseInt(this.timeElapsed[0].split(" ")[3].split(":")[2]);
    let minEnd = parseInt(this.timeElapsed[1].split(" ")[3].split(":")[1]);
    let secEnd = parseInt(this.timeElapsed[1].split(" ")[3].split(":")[2]);

    let minElapsed = () => {
      return minEnd - minStart;
    };
    let secElapsed = () => {
      if (minEnd - minStart > 0) {
        let secInit = 60 - secStart;
        return secInit + secEnd;
      } else {
        return secEnd - secStart;
      }
    };
    return { min: minElapsed(), sec: secElapsed() };
  };

  //_______________________________________________________________

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

  // DETECTS THE EXACT GENDER
  maleCount = 0;
  femaleCount = 0;

  exactGender = gender => {
    gender &&
      gender.forEach(x => {
        if (x === "male") {
          this.maleCount++;
        } else if (x === "female") {
          this.femaleCount++;
        }
      });
    if (this.maleCount > this.femaleCount) {
      return "male";
    } else if (this.femaleCount > this.maleCount) {
      return "female";
    } else {
      return "";
    }
  };

  // CALCULATE MAX AND AVG VALUES OF THE EMOTIONS ---- GENDER ---- AGE AVG
  MaxAndAvg = () => {
    return {
      angryMaxValue: Math.max(...this.angryValues),
      disgustedMaxValue: Math.max(...this.disgustedValues),
      fearfulMaxValue: Math.max(...this.fearfulValues),
      happyMaxValue: Math.max(...this.happyValues),
      neutralMaxValue: Math.max(...this.neutralValues),
      sadMaxValue: Math.max(...this.sadValues),
      surprisedMaxValue: Math.max(...this.surprisedValues),
      angryAvgValue: median(this.angryValues),
      // this.angryValues.reduce((x, y) => x + y, 0) / this.angryValues.length,
      disgustedAvgValue: median(this.disgustedValues),
      // this.disgustedValues.reduce((x, y) => x + y, 0) /
      // this.disgustedValues.length,
      fearfulAvgValue: median(this.fearfulValues),
      // this.fearfulValues.reduce((x, y) => x + y, 0) /
      // this.fearfulValues.length,
      happyAvgValue: median(this.happyValues),
      // this.happyValues.reduce((x, y) => x + y, 0) / this.happyValues.length,
      neutralAvgValue: median(this.neutralValues),
      // this.neutralValues.reduce((x, y) => x + y, 0) /
      // this.neutralValues.length,
      sadAvgValue: median(this.sadValues),
      // this.sadValues.reduce((x, y) => x + y, 0) / this.sadValues.length,
      surprisedAvgValue: median(this.surprisedValues),
      // this.surprisedValues.reduce((x, y) => x + y, 0) /
      // this.surprisedValues.length,2
      age: median(this.ageValues),
      ageArray: this.ageValues,
      // mostOccurredAge: this.exactAge(this.ageValues),
      // this.ageValues.reduce((x, y) => x + y, 0) / this.ageValues.length,
      // gender: this.genderValues[10],
      gender: this.exactGender(this.genderValues),
      genderArray: this.genderValues,
      maleNum: this.maleCount,
      femaleNum: this.femaleCount,
      time: this.timeElapsed
    };
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

  //__________________________Face API________________________//
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
    // JUST WAIT A BIT: THE CAMERA IS OFF, BUT THE LED WILL STAY ON FOR A FEW SECs
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
  //__________________________________________________________//

  //////////////////////COMPONENTS-MOUNT////////////////////////
  componentDidMount = () => {
    this.timeSession();
    this.faceApi();
    //TAB FOCUS
    document.addEventListener(
      visibilityChange,
      this.handleVisibilityChange,
      false
    );
  };
  //_____________________________________________________________

  //////////////////////COMPONENTS-UNMOUNT////////////////////////
  componentWillUnmount = () => {
    // TAB FOCUS
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);

    this.timeSession();
    this.timeSessionCalculation();
    this.dataManager();
  };
  //______________________________________________________________

  ///////////////////////////RENDER///////////////////////////////
  render() {
    //CHECK THE FOCUS OF THE TAB AND EITHER SEND DATA TO DB OR RESTART DETECTION
    if (this.state.actions[this.state.actions.length - 1] === "hide") {
      console.log("TAB FOCUS IS HIDDEN");
      this.timeSession();
      this.timeSessionCalculation();
      this.dataManager();
    } else if (this.state.actions[this.state.actions.length - 1] === "show") {
      this.timeElapsed = [];
      this.timeSession();
      this.faceApi();
    }
    return (
      <div class="faceApi">
        <Beforeunload
          onBeforeunload={() => {
            console.log("DISPLAY PROPS: ----", this.props);
            this.timeSession();
            this.timeSessionCalculation();
            this.dataManager();
            return false;
          }}
        />
        <video
          // ref={this.videoTag}
          id="video"
          width="720"
          height="560"
          autoPlay
          muted
        ></video>
        {/* <button
          onClick={() => {
            this.setState(this.MaxAndAvg());
            // console.log("ANGRYVALUES", this.angryValues);
            console.log("STATE DURING THE SESSION -----------", this.state);
          }}
        >
          CHECK STATE
        </button> */}
      </div>
    );
  }
}
