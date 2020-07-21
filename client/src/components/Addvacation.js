import React,{useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchVacations,setModalIsOpen,addVac } from "../actions"
import { useHistory} from "react-router-dom";
import { withRouter } from 'react-router-dom';

function Addvacation(props) {
    const [description,setDescription]=useState("")
    const [destination,setDestination]=useState("")
    const [img,setImg]=useState("")
    const [fromdate,setFromdate]=useState(0)
    const [todate,setTodate]=useState(0)
    const [price,setPrice]=useState(0)


   let vac=(description,destination, img,fromdate,todate,price)
    return (
        <div id="modal-bg">
        <div id="form">
        {/* <span className="close" onClick={closeModal}>X</span> */}
            <form onSubmit={props.dispatch(addVac(vac))}>
                <input type="text" placeholder="destination" onChange={(e=>setDestination(e.target.value))}/>
                <input type="text" placeholder="description" onChange={(e=>setDescription(e.target.value))}/>
                <input type="text" placeholder="img_url" onChange={(e=>setImg(e.target.value))}/>
                {/* <label for="img">Select image:</label>
                <input type="file" id="img" name="img" accept="image/*"/> */}
                <input type="date" name="bday" onChange={(e=>setFromdate(e.target.value))}/>
                {/* <input type="date" name="bday" max="1979-12-31"/> */}
                <input type="date" name="bday" onChange={(e=>setTodate(e.target.value))}/>
                {/* <input type="date" name="bday" min="2000-01-02"/> */}
                <input type="number" placeholder="price" onChange={(e=>setPrice(e.target.value))}/>
                <input type="submit" value="add"/>
            </form>
            </div>
        </div>
    )
}
// const mapDispatchToProps = dispatch => {
//     return {
//       onAddVac: vac => {
//         dispatch(addVac(vac));
//       }
//     };
//   };
  
// Addvacation = withRouter(Addvacation);
export default connect(
//     null,
//   mapDispatchToProps
  )(Addvacation)

