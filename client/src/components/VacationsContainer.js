import { connect } from 'react-redux'
import React from 'react'
import AdminList from './AdminList';
import UserList from './UserList';


function VacationsContainer() {
     return (
    sessionStorage.isAdmin==="1"?<AdminList/>:<UserList/>
  )
}
export default connect()( VacationsContainer);

