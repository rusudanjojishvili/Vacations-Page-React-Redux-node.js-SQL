import React,  {useState}  from 'react'
import { connect } from "react-redux"
import { Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {TiDelete} from "react-icons/ti";

const LoginForm = (props) => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [show, setShow] = useState(false);
 
     
    async function login(e){
        e.preventDefault()
        const data = await fetch("http://localhost:1000/user/login",{
        method:"post",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({username,password})
        
    })
    if(data.ok){
        console.log('username',username)
        const res = await data.json()
        sessionStorage.token = res.token 
        sessionStorage.isAdmin = res.isAdmin
        sessionStorage.id = res.id
        sessionStorage.status = true
        sessionStorage.u = username
        props.history.push("/vacations") 
        

      }else{
          console.log("user not found")
          setShow(true)
      }

    
}
function close(){
  setShow(false)
}
    return (
        <div className="main">
        <h2 id="titlelogin">Your adventure starts here</h2>
        <div id="loginform">
        <h1>Login</h1>
        <Form onSubmit={login}>
  <Form.Group>
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="Enter username" required onChange={(e=>setUsername(e.target.value))}/>
    <Form.Text className="text-muted">
      NOT USER YET? join us on the link bellow
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" required onChange={(e=>setPassword(e.target.value))}/>
  </Form.Group>
  <Alert variant="danger" style={{display: show? 'block' : 'none'} }>
   <TiDelete class="alertclose" onClick={close}/>
              <p>User not found</p>

            </Alert> 
  <Button variant="primary" type="submit">
    Login
  </Button>
  <Link to={`/register`}><p>Not user? register</p></Link>
</Form>
        
        
        </div>
        </div>
    )
}

export default connect()(LoginForm);
