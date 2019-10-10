import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import ContentInfo from "./ContentInfo";
import { MDBBtn } from "mdbreact";
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
      console.log(response);
      const allContent = response.data;
      const viewsArr = [];
      const viewsData = response.data.map(el => {
        return el.views;
      });
      viewsData.forEach(elem => {
        elem.forEach(el => {
          viewsArr.push(el);
        });
      });
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

      // console.log("Time-----", time);
      let age = Math.floor(getAverage(ageAverage));
      let genderArr = [];
      viewsArr.forEach(elem => {
        if (elem.gender) {
          genderArr.push(elem.gender);
        } else {
          return;
        }
      });
      console.log(genderArr);
      let male = genderArr.filter(el => {
        if (el === "male") return el;
      });
      const malePercent = genderArr.length
        ? ((male.length / genderArr.length) * 100).toFixed(2)
        : 0;
      const femalePercent = genderArr.length
        ? (((genderArr.length - male.length) / genderArr.length) * 100).toFixed(
            2
          )
        : 0;
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
    // GENDER DOUGHNUT
    const gender = {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [this.state.malePercent, this.state.femalePercent],
          backgroundColor: ["#36A2EB", "#ff8173"],
          hoverBackgroundColor: ["#36A2EB", "#ff8173"]
        }
      ]
    };

    const emotions = {
      labels: ["No", "Yes"],
      datasets: [
        {
          data: [100 - this.state.emotionalImpact, this.state.emotionalImpact],
          backgroundColor: ["#cfcfcf", "#000000"],
          hoverBackgroundColor: ["#cfcfcf", "#000000"]
        }
      ]
    };
    console.log("look", this.state.title);
    return (
      <>
        <br />
        <br />
        {!this.state.title && (
          <h1 style={{ textAlign: "center" }}>
            Try sharing your content with more people. We still need to check
            more analytics
          </h1>
        )}
        <h1 style={{ textAlign: "center" }} className="h1">
          {this.state.title}
        </h1>
        {this.state.content.length && (
          <div>
            <div className="chart">
              <Bar
                data={this.state.chartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>

            <hr width="80%" />

            <div className="displayPie">
              <div className="doughnut">
                <h5 className="h5" style={{ textAlign: "center" }}>
                  Gender
                </h5>
                <Doughnut
                  data={gender}
                  options={{ maintainAspectRatio: true }}
                />
              </div>

              <div className="doughnut">
                <h5 className="h5" style={{ textAlign: "center" }}>
                  Emotional Impact
                </h5>
                <Doughnut
                  data={emotions}
                  options={{ maintainAspectRatio: true }}
                />
              </div>
            </div>

            <hr width="80%" />

            <div className="textChart">
              <div>
                <h5 className="h5">Views</h5>
                <p>{this.state.views}</p>
              </div>
              <div>
                <h5 className="h5">Time spent</h5>
                <p>{this.state.time}</p>
              </div>
            </div>

            <hr width="80%" />

            <div style={{ textAlign: "center", marginRight: "5%" }}>
              <MDBBtn onClick={() => this.resetData()}>Show all Data</MDBBtn>
            </div>

            <hr width="95%" />

            <div className="headingTable">
              <h5 style={{ width: "100px" }} className="h5 text-center">
                Title
              </h5>
              <h5 style={{ width: "100px" }} className="h5 text-center">
                Type
              </h5>
              <h5 style={{ width: "100px" }} className="h5 text-center">
                Views
              </h5>
              <h5 style={{ width: "100px" }} className="h5 text-center">
                Created
              </h5>
              <h5 style={{ width: "100px" }} className="h5 text-center">
                Overview
              </h5>
              <h5 style={{ width: "100px" }} className="h5 text-center">
                Peaks
              </h5>
            </div>

            {this.state.content.map(el => {
              return (
                <>
                  <ContentInfo updateState={this.updateState} content={el} />
                </>
              );
            })}
          </div>
        )}
      </>
    );
  }
}
