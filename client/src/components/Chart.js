import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import ContentInfo from "./ContentInfo";
import { Link, Switch, Route } from "react-router-dom";

export default class Chart extends Component {
  state = {
    chartData: {},
    emotionalImpact: 0,
    malePercent: 0,
    femalePercent: 0,
    age: 0,
    views: 0,
    content: [],
    viewsArr: [],
    title: "",
    time: ""
  };
  componentDidMount = () => {
    const user = this.props.user.username;
    axios.get(`/api/chart/all/${user}`).then(response => {
      const allContent = response.data;
      console.log(allContent);
      const viewsArr = [];
      const viewsData = response.data.map(el => {
        return el.views;
      });
      viewsData.forEach(elem => {
        elem.forEach(el => {
          viewsArr.push(el);
        });
      });
      console.log("views Data", viewsData);
      this.getData(viewsArr);
      this.setState({ content: allContent.reverse(), viewsArr });
    });

    // this.getData();
  };

  getData = viewsArr => {
    if (!viewsArr.length) {
      return;
    } else {
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

      const getAverage = array => {
        let sum = array.reduce((previous, current) => (current += previous));
        let avg = sum / array.length;
        return avg;
      };

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

      console.log("Time-----", time);
      let age = Math.floor(getAverage(ageAverage));
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

      const title = "All";
      //console.log("CHECKING STUFF", time, title);
      this.updateState(
        chartData,
        emotionalImpact,
        malePercent,
        femalePercent,
        age,
        views,
        title,
        time
      );
    }
  };
  updateState = (
    chartData,
    emotionalImpact,
    malePercent,
    femalePercent,
    age,
    views,
    title = "All",
    time

    // content
  ) => {
    this.setState({
      chartData: chartData,
      age: age,
      femalePercent: femalePercent,
      malePercent: malePercent,
      emotionalImpact: emotionalImpact,
      views: views,
      title: title,
      time: time
      //   content: content
    });
  };

  resetData = () => {
    this.setState({ title: "All" });
    this.getData(this.state.viewsArr);
  };

  render() {
    console.log("SCARY SHIT INDEED, ", this.state.time);
    return (
      <>
        <h1>{this.state.title} </h1>
        {this.state.content.length && (
          <div className="chart">
            <Bar
              data={this.state.chartData}
              options={{ maintainAspectRatio: false }}
            />

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h5>Emotional Impact: {this.state.emotionalImpact}%</h5>
              <h5>Average Age: {this.state.age} </h5>
              <h5>Male:{this.state.malePercent}%</h5>
              <h5>Female:{this.state.femalePercent}%</h5>
              <h5>Total views:{this.state.views}</h5>
              <h5>Time: {this.state.time}</h5>
            </div>

            <button onClick={() => this.resetData()}>Show all Data</button>

            {this.state.content.map(el => {
              return (
                <div>
                  <h1>{el.title}</h1>
                  <ContentInfo
                    updateState={this.updateState}
                    content={el}
                    //   getData={this.getData}
                  />
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
}
