import React from 'react'
import { connect } from "react-redux"
import { setSignStatus } from "./actions"

export default function Logout(props) {
  const logout=()=>{
    localStorage.removeItem()
    props.dispatch(setSignStatus(false))
  }

    return (
        <div>
            
        </div>
    )
}

export default connect()(LoginForm);
