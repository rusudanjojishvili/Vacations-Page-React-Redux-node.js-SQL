
export function getVacations() {
  
  return function(dispatch) {
    dispatch({ type: "FETCH_VACATIONS_REQUEST"})
    return fetch("http://localhost:1000/vacations",{headers:{'token':sessionStorage.token}})
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "FETCH_VACATIONS_SUCCESS", payload: json })
        
      })
      .catch(error=>{
        dispatch({type: "FETCH_VACATIONS_FAILURE",payload: error})
  })
}
}
export function updateVacations() {
  
  return function(dispatch) {
    
    return fetch("http://localhost:1000/vacations",{headers:{'token':sessionStorage.token}})
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "FETCH_VACATIONS_SUCCESS", payload: json })
        
      })
      .catch(error=>{
        dispatch({type: "FETCH_VACATIONS_FAILURE",payload: error})
  })
}
}


export function getUserVacs() {
  return function (dispatch){
    dispatch({ type: "FETCH_USER_VACATIONS_REQUEST"})
    return fetch('http://localhost:1000/vacations/followedvacs/'+ sessionStorage.id,
    //????? where to store user.id
    {headers:{'token':sessionStorage.token}})
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "FETCH_USER_VACATIONS_SUCCESS", payload: json })
        
      })
      .catch(error=>{
        dispatch({type: "FETCH_USER_VACATIONS_FAILURE",payload: error})
  })
}
}

export function updateUserVacs() {
  return function (dispatch){
    return fetch('http://localhost:1000/vacations/followedvacs/'+ sessionStorage.id,
    {headers:{'token':sessionStorage.token}})
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "FETCH_USER_VACATIONS_SUCCESS", payload: json })
        
      })
      .catch(error=>{
        dispatch({type: "FETCH_USER_VACATIONS_FAILURE",payload: error})
  })
}
}

  
export function search({description,fromdate,todate}){
  return async function(dispatch) {
  console.log({description,fromdate,todate})
  const data = await fetch("http://localhost:1000/vacations/search/"+sessionStorage.id, 
  {method:"post",
  headers:{'Content-Type':'application/json','token':sessionStorage.token},
  body: JSON.stringify({description,fromdate,todate})
  
})
if(data.ok){
const res = await data.json()
console.log(res)
dispatch({ type: "SEARCH_VACATIONS_SUCCESS", payload: res })
}
  }
}

//fetch admin vacations types
export const fetchVacationsRequest = () => {
  return {
    type: "FETCH_VACATIONS_REQUEST"
  }
}

export const fetchVacationsSuccess = vacations => {
  return {
    type: "FETCH_VACATIONS_SUCCESS",
    payload: vacations
  }
}

export const fetchVacationsFailure = error => {
  return {
    type: "FETCH_VACATIONS_FAILURE",
    payload: error
  }
}

//fetch user vacations types
export const fetchUserVacationsRequest = () => {
  return {
    type: "FETCH_USER_VACATIONS_REQUEST"
  }
}

export const fetchUserVacationsSuccess = vacations => {
  return {
    type: "FETCH_USER_VACATIONS_SUCCESS",
    payload: vacations
  }
}

export const fetchUserVacationsFailure = error => {
  return {
    type: "FETCH_USER_VACATIONS_FAILURE",
    payload: error
  }
}

//search vacations types
export const searchVacations = vacations => {
  return {
    type: "SEARCH_VACATIONS_SUCCESS",
    payload: vacations
  }
}

export const setSignStatus = (boolean) => {
  return { 
      type: "SIGN_STATUS",
      payload: {
          boolean
      }
  }
}
export const setModalIsOpen = (boolean) => {
  
  return { 
      type: "OPEN_CLOSE_MODAL",
      payload: {
          boolean
      }
  }
}

export const setUserName = (name) => {
  return {
      type: "USER_NAME",
      payload: {
          name
      }
  }
}



