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
                const viewsData=response.data.map(el=>{
                     return el.views;
                    })
               
               const allAvg=[];
               
               viewsData.forEach((elem)=>{
                   elem.forEach((el)=>{
                       allAvg.push(el.averageEmotion)
                   })
               })
               let neutralityArr=[];
               allAvg.forEach((elem)=>{
                   neutralityArr.push(elem.neutralAvg)
               })
               let sumNet=neutralityArr.reduce((acum,val)=>{
                   return acum+=val;
               },0) 
               let emotionalImpact=(100-(sumNet/neutralityArr.length)).toFixed(2);
               console.log(emotionalImpact);
               console.log(neutralityArr)

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
            let ageAverage=[];
            console.log("Hola!! ", viewsData)
            viewsData.forEach((elem)=>{
                elem.forEach(el=>{
                    ageAverage.push(el.age);
                })
            })
            let sum=ageAverage.reduce((acum,elem)=>{
                return acum+=elem;
                 ;
            },0);


            let genderArr=[];
            
            viewsData.forEach((elem)=>{
                elem.forEach(el=>{
                    genderArr.push(el.gender);
                })
            })
            let male=genderArr.filter(el=>{
                if (el==="male")return el;
            })
            const malePercent=(male.length/genderArr.length*100).toFixed(2);
            const femalePercent=((genderArr.length-male.length)/genderArr.length*100).toFixed(2)
            const views=genderArr.length;
            
            
            const age=Math.floor(sum/ageAverage.length)
            const emotionsCount={
                angry:getEmotion("angryAvg"),
                disgusted:getEmotion("disgustedAvg"),
                fearful:getEmotion("fearfulAvg"),
                happy:getEmotion("happyAvg"),
                sad:getEmotion("sadAvg"),
                surprised:getEmotion("surprisedAvg")
           }
           console.log(emotionsCount)
           
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
               content: allContent
            
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
