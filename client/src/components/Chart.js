import React, {Component} from "react";
import {Bar} from "react-chartjs-2";
import axios from "axios"
import ContentInfo from "./ContentInfo"
export default class Chart extends Component{
   
        state={
            chartData:{},
            emotionalImpact:0,
            malePercent:0,
            femalePercent:0,
            age:0,
            views:0,
            content : []
            
        }
componentDidMount=()=>{
    this.getData()
}
        getData(){
            const {user} =this.props.match.params
            axios.get(`http://localhost:5005/api/chart/all/${user}`).then(response=>{
                const allContent = response.data
                const viewsArr=[];
                const viewsData=response.data.map(el=>{
                     return el.views;
                    })
                viewsData.forEach(elem=>{
                    elem.forEach(el=>{
                        viewsArr.push(el);
                    })
                })
                const averageEmotion=  viewsArr.map(el=>{
                    return el.averageEmotion;
                 })
                const maxEmotion=viewsArr.map(el=>{
                    return el.maxEmotion;
                 })


                function getEmotion(emotion){
                   const sum= averageEmotion.reduce((acum,value)=>{
                        if(value && value[emotion]){
                             acum++;
                        }
                        return acum
                    },0)
                    return sum;
                }
          

               function getAverage(array){
                let sum = array.reduce((previous, current) => current += previous);
                 let avg = sum / array.length;
                 return avg;
               }
               
             let neutralityArr=[];
              averageEmotion.forEach((elem)=>{
                  neutralityArr.push(elem.neutralAvg)
              })
            let emotionalImpact=(100-getAverage(neutralityArr)).toFixed(2)
            let ageAverage=[]
            viewsArr.forEach((elem)=>{
                    ageAverage.push(elem.age);
            })
            let age=Math.floor(getAverage(ageAverage));

           

            let genderArr=[];
            viewsArr.forEach((elem)=>{
                
                    genderArr.push(elem.gender);
                
            })
            let male=genderArr.filter(el=>{
                 if (el==="male")return el;
             })
            const malePercent=(male.length/genderArr.length*100).toFixed(2);
             const femalePercent=((genderArr.length-male.length)/genderArr.length*100).toFixed(2)
            const views=viewsArr.length;

            const emotionsCount={
                angry:getEmotion("angryAvg"),
                disgusted:getEmotion("disgustedAvg"),
                fearful:getEmotion("fearfulAvg"),
                happy:getEmotion("happyAvg"),
                sad:getEmotion("sadAvg"),
                surprised:getEmotion("surprisedAvg")
           }
           
          const chartData = {
            labels:["Angry", 'Disgusted', 'Fearful', 'Happy', 'Sad', 'Surprised'],
            datasets:[{
                label:"Emotions detected",
                data:[
                        emotionsCount.angry,
                        emotionsCount.disgusted,
                        emotionsCount.fearful,
                        emotionsCount.happy,
                        emotionsCount.sad,
                        emotionsCount.surprised
                ],
                backgroundColor:[
                    'rgba(255, 95, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ]
            }]
        }
    

           this.setState({
             chartData,
             age,
             femalePercent,
             malePercent,
            emotionalImpact,
            views,
            //    content: allContent
            
           })
                
        
        
        })     
        }
    
        render(){
            console.log(this.state.content)
            return(
                <div className="chart">
                    <Bar
                        data={this.state.chartData}
                        options={{ maintainAspectRatio: false }}
                        />
                   
                    <div style={{display: "flex", justifyContent:"space-around"}}>
                    <h5>Emotional Impact: {this.state.emotionalImpact}%</h5>
                    <h5>Average Age: {this.state.age}  </h5>
                    <h5>Male:{this.state.malePercent}%</h5>
                    <h5>Female:{this.state.femalePercent}%</h5>
                    <h5>Total views:{this.state.views}</h5>
                    </div>
                    {this.state.content.map(el => {
                        return <ContentInfo content={el} />
                    })}
                    {/* <ContentInfo user={this.props.match.params.user}/> */}
                  
                </div>
            )
        }
}
