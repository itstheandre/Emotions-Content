import React, {Component} from "react";
import {Bar} from "react-chartjs-2";
import axios from "axios"
export default class Chart extends Component{
   
      

        getDato(){
            const {user} =this.props.match.params
            axios.get(`http://localhost:5005/api/chart/${user}`).then(response=>{
                const viewsData=response.data.map(el=>{
                     return el.views;
                    })
               console.log("Conten info!!! ",viewsData)
               const allAvg=[];
               
               viewsData.forEach((elem,index)=>{
                   elem.forEach((el,index)=>{
                       allAvg.push(el.averageEmotion)
                   })
               })
               let neutralityArr=[];
               allAvg.forEach((elem,index)=>{
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
            viewsData.forEach((elem,index)=>{
                elem.forEach(el=>{
                    ageAverage.push(el.age);
                })
            })
            let sum=ageAverage.reduce((acum,elem)=>{
                return acum+=elem;
                 ;
            },0);


            let genderArr=[];
            
            viewsData.forEach((elem,index)=>{
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
           
         

                
        
        
        })     
        }
    
        render(){
            console.log(this.props.content)
            // this.getDato();
            return(<div>
<h4>Number of views {this.props.content.views.length} </h4>
<h1>Hello</h1>
            </div>
                // <div className="chart">
                //    content name
                //    neutrality
                //    views.
                //    type of
                //    Avg time
                    
                  
                // </div>
            )

        }

    }

