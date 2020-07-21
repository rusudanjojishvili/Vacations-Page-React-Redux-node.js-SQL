import React, {useState}from 'react'
import { connect } from "react-redux"
import { NavLink } from 'react-router-dom'
import { setSignStatus } from "../actions"
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,Form,FormControl,Button}from 'react-bootstrap';
import {search,updateVacations,updateUserVacs} from "../actions"
import logo from '../images/image1.png'


const NavBar=(props) =>{
  const [description,setDescription]=useState("")
  const [fromdate,setFromdate]=useState(0)
  const [todate,setTodate]=useState(0)
    
 
    let history = useHistory()
    
    const logout=()=>{
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("isAdmin")
        sessionStorage.removeItem("id")
        sessionStorage.removeItem("status")
        sessionStorage.removeItem("u")
        props.dispatch(setSignStatus(false))
        history.push("/login") 

      }
    
    const userLinks=(
       <li id="logoutbt" onClick={logout}>Logout</li>
    )

    const guestLinks = (
        <span id="loginlogout">
        
        <Nav.Item as="li"><NavLink id="home" exact className="inactive" activeClassName="active" to="/login">Login</NavLink></Nav.Item>
        
        <Nav.Item as="li"><NavLink exact className="inactive" activeClassName="active" to="/register">Register</NavLink></Nav.Item>
         </span>
    )
    return (
      
      
        <Navbar collapseOnSelect fixed="top" bg="dark"  expand="lg" >
      
        <Navbar.Brand><img id="logo" alt="Brand" src={logo}/></Navbar.Brand>
        {sessionStorage.status && sessionStorage.isAdmin==="1"?(<span className="homespan"><NavLink id="home" exact className="inactive" activeClassName="active" to="/vacations">
        Home</NavLink></span>):null}
        
         <Navbar.Toggle  aria-controls="responsive-navbar-nav" />
        {sessionStorage.status?(<Navbar.Collapse id="responsive-navbar-nav">
         <Nav>
              <Form inline onSubmit={e => {
                e.preventDefault()
                    props.dispatch(search({description,fromdate,todate}))
            }}>
      <span className="labels">By description:</span><FormControl type="text" placeholder="By description" className="mr-sm-2" onChange={(e=>setDescription(e.target.value))}/>
      <span className="labels">From Date:</span><FormControl type="date"  className="mr-sm-2" onChange={(e=>setFromdate(e.target.value))} />
      <span className="labels">To Date:</span> <FormControl type="date"  className="mr-sm-2" onChange={(e=>setTodate(e.target.value))}/>
      <Button id="search"variant="outline-info" type="submit">Search</Button>
      <Button variant="outline-success"  onClick={()=>{
        sessionStorage.isAdmin==="1"?
        props.dispatch(updateVacations()):props.dispatch(updateUserVacs())}}>Clear Searches</Button>
    </Form> 
    </Nav>
    </Navbar.Collapse>):null}
    {sessionStorage.status?<div id="hellomessage"><span>Signed in as:  {sessionStorage.u}</span> <span>{userLinks} </span></div>:guestLinks}
        
          </Navbar>
         
    )
}





export default connect()
    (NavBar);

