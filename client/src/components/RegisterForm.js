import React,  {useState}  from 'react'
import { connect } from "react-redux"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {TiDelete} from "react-icons/ti";


const RegisterForm = (props) => { 
    const [fname,setFname] = useState("")
    const [lname,setLname] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [show, setShow] = useState(false);


     
  
    async function register(e){
        e.preventDefault()
        console.log({fname,lname,username,password})
        const data = await fetch("http://localhost:1000/user/register",{
        method:"post",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({fname,lname,username,password})
        
    })

    if(data.ok){
        const res = await data.json()
        sessionStorage.token = res.token 
        sessionStorage.isAdmin = res.isAdmin
        sessionStorage.id = res.id
        sessionStorage.status = true
        sessionStorage.u = username
        props.history.push('/vacations')
        
      }else{
         
        setShow(true)
      }
}
function close(){
  setShow(false)
}
 
    return (
        <div className="main">
       
        <div id="registerform">
        <h1>Register</h1>
        <Form onSubmit={register}>
  <Form.Group>
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="enter your name" required onChange={(e=>setFname(e.target.value))}/>
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder="enter your last name" required onChange={(e=>setLname(e.target.value))}/>
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="enterusername" required onChange={(e=>setUsername(e.target.value))} />
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" required onChange={(e=>setPassword(e.target.value))}/>
  </Form.Group>
  
   <Alert variant="danger" style={{display: show? 'block' : 'none'} }>
   <TiDelete className="alertclose" onClick={close}/>
              <p>Username already exists</p>
              
            </Alert> 
             <Button variant="primary" type="submit">
    register
  </Button>
</Form>
          
        </div>
        </div>
     
    )

}
 
export default connect()(RegisterForm);
