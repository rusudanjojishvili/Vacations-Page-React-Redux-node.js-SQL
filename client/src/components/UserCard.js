import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {updateUserVacs,getUserVacs } from "../actions"



function UserCard(props) {
  const [status, setStatus] = useState(!!props.vacation.status)


    const vacations_id = props.vacation.id
    
    const users_id = sessionStorage.id
    
    async function followVac(){
         
        const data = await fetch("http://localhost:1000/vacations/follow", 
        {method:"post",
        headers:{'Content-Type':'application/json','token':sessionStorage.token},
        body: JSON.stringify({users_id,vacations_id})
    })
    //  if(data.ok){
    //   props.getUserVacs()
    //  }
     }
    async function unfollowVac(){
         console.log(users_id)
        const data2 = await fetch("http://localhost:1000/vacations/unfollow", 
        {method:"post",
        headers:{'Content-Type':'application/json','token':sessionStorage.token},
        body: JSON.stringify({users_id,vacations_id})
    })
    // if(data2.ok){
    //   props.getUserVacs()
    // }
  
     }
     const fromdate = props.vacation.fromdate.split('-')[2]+"/"+props.vacation.fromdate.split('-')[1]+"/"+props.vacation.fromdate.split('-')[0]
     const todate = props.vacation.todate.split('-')[2]+"/"+props.vacation.todate.split('-')[1]+"/"+props.vacation.todate.split('-')[0]
    return (
        
            <div className="item"> 
           <Card style={{ width: '20rem' }}>
           <Card.Img variant="top" src={props.vacation.img} />
             <Card.Body id="ucardbody">
              <Card.Title>{props.vacation.destination}</Card.Title>
               <Card.Text className="description">
                {props.vacation.description}
               </Card.Text>
                  <FormControlLabel className="like"
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={status} onClick={((e=>{
                     
              setStatus(e.target.checked)
               props.updateUserVacs()
              if(status){
              unfollowVac()
              props.updateUserVacs()
              }if(!status){
                followVac()
                props.updateUserVacs()
              }else{
               props.updateUserVacs()
              }
              }))}/>}
                  />
             <span style={{fontWeight: '600'}}>Dates: {fromdate} - {todate}</span>
            <p style={{fontWeight: '600'}}>{props.vacation.price}$</p>
             </Card.Body>  
              <Card.Footer>
           <small className="text-muted">{props.vacation.followersN} followers </small>
           </Card.Footer>
          </Card>
           </div>
        
    )
}
const mapStateToProps = state => {
  return {
    vacationData: state.vacations
  }
}
export default connect(
  mapStateToProps,
  {getUserVacs,updateUserVacs}
)(UserCard)
  