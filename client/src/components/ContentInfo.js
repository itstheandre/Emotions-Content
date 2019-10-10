import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { MDBBtn } from "mdbreact";
export default class Chart extends Component {
  state = {
    chartData: {},
    emotionalImpact: 0,
    malePercent: 0,
    femalePercent: 0,
    age: 0,
    views: 0,
    content: []
  };

  componentDidMount = () => {
    this.getData(this.props.content.views);
  };

  getData = viewsArr => {
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
      genderArr.push(elem.gender);
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

    const chartData = {
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
    this.setState({
      chartData: chartData,
      age: age,
      femalePercent: femalePercent,
      malePercent: malePercent,
      emotionalImpact: emotionalImpact,
      views: views
      //   content: content
    });
  };
  //   componentDidMount = () => {
  //     this.props.getData(this.props.content.views);
  //   };

  render() {
    console.log("ANOTHER: ", this.props);
    console.log("THIS IS STATE: ", this.state);
    // this.getDato();
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h4>Number of views {this.props.content.views.length} </h4>
          <h4>{this.props.content.title}</h4>
          <MDBBtn
            onClick={() =>
              this.props.updateState(
                this.state.chartData,
                this.state.emotionalImpact,
                this.state.malePercent,
                this.state.femalePercent,
                this.state.age,
                this.state.views
              )
            }
          >
            Show
          </MDBBtn>
        </div>
      </div>
    );
  }
}
