
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getVacations,setModalIsOpen} from "../actions"
import AdminCard from './AdminCard';
import AddVacForm from './AddVacForm'
import { Link } from 'react-router-dom'
import loading from '../images/loading.gif'

const AdminList=({vacationData, getVacations,setModalIsOpen,modalIsOpen })=> {

  
   useEffect(() => {
   getVacations()
   }, [])
    function openModal(){
        setModalIsOpen()
     }
 
     
    return vacationData.loading ? (
        <h2><img src={loading}/></h2>
      ) : vacationData.error ? (
        <h2>{vacationData.error}</h2>
      ) : ( 
        <div className="maindiv">
          <h2>Vacations List</h2>
          <Link to={`/reports`}>Get Reports</Link>
          <div className="container">
          <button className="btnn" onClick={openModal}>Add Vacation</button> 
            {vacationData && vacationData.vacations && vacationData.vacations.map(vacation =>(
              <AdminCard id={vacation.id} key={vacation.id} vacation={vacation}/>
              ))} 
                 </div>
               {modalIsOpen? (<AddVacForm/>) :null }
               
          
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
      getVacations: () => dispatch(getVacations()),
      setModalIsOpen:() => dispatch(setModalIsOpen(true))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminList)
  
  
  