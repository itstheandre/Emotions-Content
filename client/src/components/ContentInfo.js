import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { MDBBtn } from "mdbreact";

export default class Chart extends Component {
  state = {
    avgChartData: {},
    maxChartData: {},
    emotionalImpact: 0,
    malePercent: 0,
    femalePercent: 0,
    age: 0,
    views: 0,
    content: [],
    time: ""
  };

  componentDidMount = () => {
    this.getData(this.props.content.views);
  };

  getData = viewsArr => {
    if (!viewsArr.length) {
      return;
    } else {
      console.log("ARRAY OF VIEWS???", viewsArr);
      const averageEmotion = viewsArr.map(el => {
        return el.averageEmotion;
      });
      const maxEmotion = viewsArr.map(el => {
        return el.maxEmotion;
      });
      function getEmotion(emotion) {
        const sum = averageEmotion.reduce((acum, value) => {
          if (value && value[emotion]) {
            acum++;
          }
          return acum;
        }, 0);
        return sum;
      }
      let timeArr = [];
      viewsArr.forEach(el => {
        timeArr.push(el.time.min * 60);
        timeArr.push(el.time.sec);
      });
      function myTime(time) {
        const hr = ~~(time / 3600);
        const min = ~~((time % 3600) / 60);
        const sec = time % 60;
        let sec_min = "";
        if (hr > 0) {
          sec_min += "" + hr + ":" + (min < 10 ? "0" : "");
        }
        sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
        sec_min += "" + sec;
        return sec_min + " min";
      }
      const secsAvg = Math.round(getAverage(timeArr));
      const time = myTime(secsAvg);

      function getAverage(array) {
        let sum = array.reduce((previous, current) => (current += previous));
        let avg = sum / array.length;
        return avg;
      }
      function getMaxEmotion(emotion) {
        const emotionArr = maxEmotion.map(el => {
          return el[emotion];
        });
        return getAverage(emotionArr);
      }
      let neutralityArr = [];
      averageEmotion.forEach(elem => {
        neutralityArr.push(elem.neutralAvg);
      });
      let emotionalImpact = (100 - getAverage(neutralityArr)).toFixed(2);
      console.log("Emo ", emotionalImpact);
      let ageAverage = [];
      viewsArr.forEach(elem => {
        ageAverage.push(elem.age);
      });
      let age = Math.floor(getAverage(ageAverage));
      console.log("Age ", age);
      let genderArr = [];
      viewsArr.forEach(elem => {
        if (elem.gender) {
          genderArr.push(elem.gender);
        } else {
        }
      });
      let male = genderArr.filter(el => {
        if (el === "male") return el;
      });
      const malePercent = ((male.length / genderArr.length) * 100).toFixed(2);
      const femalePercent = (
        ((genderArr.length - male.length) / genderArr.length) *
        100
      ).toFixed(2);
      const views = viewsArr.length;

      const emotionsCount = {
        angry: getEmotion("angryAvg"),
        disgusted: getEmotion("disgustedAvg"),
        fearful: getEmotion("fearfulAvg"),
        happy: getEmotion("happyAvg"),
        sad: getEmotion("sadAvg"),
        surprised: getEmotion("surprisedAvg")
      };

      const avgChartData = {
        labels: ["Angry", "Disgusted", "Fearful", "Happy", "Sad", "Surprised"],
        datasets: [
          {
            label: "Emotions detected",
            data: [
              emotionsCount.angry,
              emotionsCount.disgusted,
              emotionsCount.fearful,
              emotionsCount.happy,
              emotionsCount.sad,
              emotionsCount.surprised
            ],
            backgroundColor: [
              "rgba(255, 95, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)"
            ]
          }
        ]
      };
      const maxChartData = {
        labels: ["Angry", "Disgusted", "Fearful", "Happy", "Sad", "Surprised"],
        datasets: [
          {
            label: "Max emotion by %",
            data: [
              getMaxEmotion("angryMax") * 100,
              getMaxEmotion("disgustedMax") * 100,
              getMaxEmotion("fearfulMax") * 100,
              getMaxEmotion("happyMax") * 100,
              getMaxEmotion("sadMax") * 100,
              getMaxEmotion("surprisedMax") * 100
            ],
            backgroundColor: [
              "rgba(255, 95, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)"
            ]
          }
        ]
      };

      this.setState({
        avgChartData: avgChartData,
        maxChartData,
        age: age,
        femalePercent: femalePercent,
        malePercent: malePercent,
        emotionalImpact: emotionalImpact,
        views: views,
        time: time
        //   content: content
      });
    }
  };
  //   componentDidMount = () => {
  //     this.props.getData(this.props.content.views);
  //   };

  setNewData = state => {
    this.props.updateState(
      state,
      this.state.emotionalImpact,
      this.state.malePercent,
      this.state.femalePercent,
      this.state.age,
      this.state.views,
      this.props.content.title,
      this.state.time
    );
  };

  render() {
    // this.getDato();
    return (
      <div className='headingTable'>
        {/* Title */}
        <div style={{ width: "100px" }} className='h5 text-center'>
          <h5>{this.props.content.title} </h5>
        </div>
        {/* Type */}
        <div style={{ width: "100px" }} className='h5 text-center'>
          <h5>{this.props.content.contentType} </h5>
        </div>
        {/* views */}
        <div style={{ width: "100px" }} className='h5 text-center'>
          <h5>{this.props.content.views.length} </h5>
        </div>
        {/* date */}
        <div style={{ width: "100px" }} className='h5 text-center'>
          <h5>{this.props.content.date}</h5>
        </div>
        {/* overview */}
        <div style={{ width: "100px" }} className='h5 text-center'>
          <i
            class='fas fa-eye'
            onClick={() => this.setNewData(this.state.avgChartData)}
          ></i>
          {/* <MDBBtn onClick={() => this.setNewData(this.state.avgChartData)}>
            show
          </MDBBtn> */}
        </div>
        {/* peaks */}
        <div style={{ width: "85px" }} className='h5 text-center'>
          <i
            class='fas fa-eye'
            onClick={() => this.setNewData(this.state.maxChartData)}
          ></i>

          {/* <MDBBtn onClick={() => this.setNewData(this.state.maxChartData)}>
            show
          </MDBBtn> */}
        </div>
      </div>
    );
  }
}
