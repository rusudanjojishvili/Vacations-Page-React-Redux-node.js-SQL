import React,{useState } from 'react'
import { connect } from 'react-redux'
import { setModalIsOpen,updateVacations } from "../actions"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function UpdateForm(props) {
     
     const [destination,setDestination]=useState(props.vacation.destination)
     const [description,setDescription]=useState(props.vacation.description)
     const [img,setImg]=useState(props.vacation.img)
     
     const [fromdate,setFromdate]=useState(props.vacation.fromdate)
     
     const [todate,setTodate]=useState(props.vacation.todate)
     const [price,setPrice]=useState(props.vacation.price)
    
     
     
    
      
     function closeModal(){
      props.setIsOpen(false)
    }
    
     async function updateVac(e){
        e.preventDefault()
        console.log({description,destination, img,fromdate,todate,price})
        const data = await fetch("http://localhost:1000/vacations/"+props.id, 
        {method:"put",
        headers:{'Content-Type':'application/json','token':sessionStorage.token},
        body: JSON.stringify({description,destination, img,fromdate,todate,price})
        
    })
    if(data.ok){
        
        props.updateVacations()
        closeModal()
       
      }
     }
    
    return (
      
           <div id="updatediv">
            <Form onSubmit={updateVac} className="updateform" > 
            <span id="close" className="close" onClick={closeModal}>close</span>
            <Form.Group>
    
    <Form.Control className="input" type="text" placeholder="destination" value={destination} required onChange={(e=>setDestination(e.target.value))}/>
    <Form.Control className="input"  as="textarea" rows="5" placeholder="description" value={description} required onChange={(e=>setDescription(e.target.value))}/>
    <Form.Control className="input" as="textarea" rows="2" placeholder="img_url" value={img} required onChange={(e=>setImg(e.target.value))}/>
    <Form.Control className="input" type="date" placeholder="from date" value={fromdate} required onChange={(e=>setFromdate(e.target.value))}/>
    <Form.Control className="input" type="date" placeholder="to date"  value={todate} required onChange={(e=>setTodate(e.target.value))}/>
    <Form.Control className="input" type="text" placeholder="price" value={price} required onChange={(e=>setPrice(e.target.value))}/>
  </Form.Group>
  <Button className="input" variant="dark" type="submit">
    update
  </Button>
            </Form>
           </div>
    )
}

const mapStateToProps = state => {
    return {
      vacationData: state.vacations,
      modalIsOpen:state.modalIsOpen.boolean
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
      updateVacations: () => dispatch(updateVacations()),
      setModalIsOpen:() => dispatch(setModalIsOpen(false))
    }
  }
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateForm)
  