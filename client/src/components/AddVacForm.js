import React,{useState} from 'react'
import { connect } from 'react-redux'
import {setModalIsOpen, updateVacations} from "../actions"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function AddVacForm(props) {
     const [description,setDescription]=useState("")
     const [destination,setDestination]=useState("")
     const [img,setImg]=useState("")
     const [fromdate,setFromdate]=useState(0)
     const [todate,setTodate]=useState(0)
     const [price,setPrice]=useState(0)


  console.log('props history',props.history)

     function closeModal(){
       props.dispatch(setModalIsOpen(false))
    }
    console.log({description,destination, img,fromdate,todate,price})
  
     async function addVac(e){
        e.preventDefault()
        console.log({description,destination, img,fromdate,todate,price})
        const data = await fetch("http://localhost:1000/vacations", 
        {method:"post",
        headers:{'Content-Type':'application/json','token':sessionStorage.token},
        body: JSON.stringify({description,destination, img,fromdate,todate,price})
        
    })
    if(data.ok){
        props.dispatch(updateVacations())
        closeModal()
      }
     }
    
   
    return (
        <div className="modal-bg">
        <div id="form">
        <Form className="addform" onSubmit={addVac}>
        <span className="close" onClick={closeModal}>X</span>
        <h3>Add Vacation</h3>
  <Form.Group>
    
    <Form.Control className="input" type="text" placeholder="destination" required onChange={(e=>setDestination(e.target.value))}/>
    <Form.Control className="input"  as="textarea" rows="5" placeholder="description" required onChange={(e=>setDescription(e.target.value))}/>
    <Form.Control className="input" type="text" placeholder="img_url" required onChange={(e=>setImg(e.target.value))}/>
    <Form.Control className="input" type="date" placeholder="from date" required onChange={(e=>setFromdate(e.target.value))}/>
    <Form.Control className="input" type="date" placeholder="to date" required onChange={(e=>setTodate(e.target.value))}/>
    <Form.Control className="input" type="text" placeholder="price" required onChange={(e=>setPrice(e.target.value))}/>
   
    
  </Form.Group>
  <Button  variant="dark" type="submit">
    add
  </Button>
  
</Form>
           
            </div>
        </div>
    )
}

  
export default connect(
  )(AddVacForm)
