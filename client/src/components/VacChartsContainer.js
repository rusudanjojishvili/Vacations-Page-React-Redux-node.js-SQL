import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2';
import { connect } from "react-redux"
import axios from 'axios'



class VacChartsContainer extends Component {
    constructor(props) {
        super(props);
        this.state ={ Data:{} }
        console.log(this.state)
      }
       
      componentDidMount(){
            // const data = await fetch('http://localhost:1000/vacations/charts',{headers:{'token':sessionStorage.token}});
            // const chartData = await data.json()
            axios.get('http://localhost:1000/vacations/charts',{headers:{'token':sessionStorage.token}})  
                  .then(res => {  
                     console.log(res);  
                     const chartData = res.data;  
            console.log('chartData',chartData)
            let vacdestinations = [];  
            let followersQ = [];  
            chartData.forEach(vacation => {
              vacdestinations.push(vacation.destination)
              followersQ.push(vacation.followersN)
              
              console.log(followersQ)
            })
    
              this.setState({
                Data:{
                  labels:vacdestinations,
                  datasets:[
                    {label:"Number of followers per vacation",
                    data:followersQ,
                    backgroundColor: 'pink'
                  
                    }
                  ]
                }
              
            });
            });
        }
    
    
      // componentDidMount(){
      //  this.getvacations()
      // }
    
      render() {
        return (
           <div  id="chartscontainer">
             <Bar
               data={this.state.Data}
              //  width={100}
              //  height={50}
               options={{
                 maintainAspectRatio:false,
                  title:{
                    display:true,
                    text:'Followed vacations statistics'
                  },
                 scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                stepSize: 1.0
            }
        }]
    }
               }}>

               </Bar>
             
           </div>
        )
      }
}
export default connect()(VacChartsContainer)
  
  
  