import React, {useState}from 'react'
import { connect } from 'react-redux'
import { Card} from 'react-bootstrap';
import {TiPencil} from "react-icons/ti";
import {TiDelete} from "react-icons/ti";
import UpdateForm from './UpdateForm'
import {getVacations,updateVacations} from "../actions"

 function AdminCard(props) {
      
     const [isOpen,setIsOpen] = useState(false)
    
     async function del(){
      const result = await fetch("http://localhost:1000/vacations/"+ props.vacation.id,{
        method:"delete",
         headers:{'token':sessionStorage.token}
        })
      
      if(result.ok){
         props.updateVacations()
      }
     }
  function openUpdateModal(){
    setIsOpen(true)
 }
 const fromdate = props.vacation.fromdate.split('-')[2]+"/"+props.vacation.fromdate.split('-')[1]+"/"+props.vacation.fromdate.split('-')[0]
 const todate = props.vacation.todate.split('-')[2]+"/"+props.vacation.todate.split('-')[1]+"/"+props.vacation.todate.split('-')[0]
    
 return (
       
            <div className="item"> 
           <Card style={{ width: '20rem' }}>
           <Card.Img variant="top" src={props.vacation.img} /> 
           <TiPencil className="icon" onClick={openUpdateModal}/>
            <TiDelete id="delete" onClick={del}/>
             <Card.Body id="cardbody">
              <Card.Title>{props.vacation.destination}</Card.Title>
               <Card.Text className="description">
                {props.vacation.description}
               </Card.Text>
            <span style={{fontWeight: '600'}}>Dates: {fromdate} - {todate}</span>
          
            <p style={{fontWeight: '600'}}>{props.vacation.price}$</p>
                </Card.Body>
               <Card.Footer>
           <small className="text-muted">{props.vacation.followersN} followers </small>
           </Card.Footer>
            
           </Card>

           {isOpen ? (<UpdateForm setIsOpen={setIsOpen} id={props.vacation.id} vacation={props.vacation}/>) :null } 
           </div>
          
           
      
    )
}
  
      
export default connect(
   null,
   {getVacations,updateVacations}
  )(AdminCard)
  
  
