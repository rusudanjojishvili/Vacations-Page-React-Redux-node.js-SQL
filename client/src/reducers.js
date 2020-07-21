
const initialState = {
  loading: false,
  vacations: [],
  error: ''
}


export const vacations = (state = initialState, action) => {

  switch (action.type) {
    case "FETCH_VACATIONS_REQUEST": 
    return {
      ...state,
        loading: true
      }
    case "FETCH_VACATIONS_SUCCESS":
      return  {
        loading: false,
        vacations: action.payload,
        error: ''
      }
    case "FETCH_VACATIONS_FAILURE":
      return  {
        ...state,
        loading: false,
        vacations: [],
        error: action.payload
      }
    case "FETCH_USER_VACATIONS_REQUEST": 
    return {
      ...state,
        loading: true
      }
    case "FETCH_USER_VACATIONS_SUCCESS":
      return  {
        loading: false,
        vacations: action.payload,
        error: ''
      }
    case "FETCH_USER_VACATIONS_FAILURE":
      return  {
        ...state,
        loading: false,
        vacations: [],
        error: action.payload
      }
      case "SEARCH_VACATIONS_SUCCESS":
        return  {
          loading: false,
          vacations: action.payload,
          error: ''
        }
    
    default: return state
  }
}


  export const modalIsOpen= (status= false, action) => {
    switch (action.type) {
        case "OPEN_CLOSE_MODAL":
            return action.payload
        default:
            return status
    }
}




