import React, {useEffect}from 'react'
import { connect } from 'react-redux'
import  {getUserVacs}  from "../actions"
import UserCard from './UserCard'
import loading from '../images/loading.gif'



const UserList=(props)=> {
  
      console.log('arrayfromUserlist',props.vacationData)

    useEffect(() => {
        props.dispatch(getUserVacs())
       
    }, [])
    
 
    return props.vacationData.loading ? (
        <h2><img src={loading}/></h2>
      ) : props.vacationData.error ? (
        <h2>{props.vacationData.error}</h2>
      ) : ( 
        <div className="maindiv">
          <h2 id="titleuser">Plan your next vacation</h2>
          <div className="container">
            {props.vacationData && props.vacationData.vacations &&
              props.vacationData.vacations.map(vacation =>(
               <UserCard id={vacation.id} key={vacation.id} vacation={vacation}/>
              ))} 
                 </div>
               
        </div>
      )
}
const mapStateToProps = state => {
    return {
      vacationData: state.vacations
    }
  }

export default connect(
    mapStateToProps
  )(UserList)
  
  
  
