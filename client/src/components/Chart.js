import React, {Component} from "react";
import {Bar} from "react-chartjs-2";
import axios from "axios"
export default class Chart extends Component{
   
        state={
            chartData:{},
            neutral:0,

        }
componentDidMount=()=>{
    this.getData()
}
        getData(){
            const {user} =this.props.match.params
            axios.get(`http://localhost:5005/api/chart/${user}`).then(response=>{
                const viewsData=response.data.map(el=>{
                     return el.views;
                    })
               
               const allAvg=[];
               viewsData.forEach((elem,index)=>{
                   elem.forEach((el,index)=>{
                       allAvg.push(el.averageEmotion)
                   })
               })
               function getEmotion(emotion){
                //    for (let i=0;i<allAvg.length;i++){
                //        console.log(allAvg[i])
                //    }

                  const emotionArr= allAvg.reduce((acc,curr)=>{
                    if(curr && curr[emotion]) acc++
                    return acc
                  } ,0)
                   return emotionArr
            }

            const emotionsCount={
                angry:getEmotion("angryAvg"),
                disgusted:getEmotion("disgustedAvg"),
                fearful:getEmotion("fearfulAvg"),
                happy:getEmotion("happyAvg"),
                sad:getEmotion("sadAvg"),
                surprised:getEmotion("surprisedAvg")
           }
           console.log(emotionsCount)
           
          const chartData0 = {
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
               chartData:chartData0
            
           })
                
        
        
        })     
        }
    
        render(){
            return(
                <div className="chart">
                    <Bar
                        data={this.state.chartData}
                       
                        options={{ maintainAspectRatio: false }}
                        />
                </div>
            )
        }
}
