import { 
    CHANGE_SEARCH_FIELD, 
    REQUEST_ROBOTS_PENDING, 
    REQUEST_ROBOTS_SUCCESS, 
    REQUEST_ROBOTS_FAILED 
} from './constants'

/*
export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})
*/

export const setSearchField = (text) => {
    console.log(text)
    return {
        type: CHANGE_SEARCH_FIELD,
        payload: text
    }
}

export const requestRobots = () => (dispatch) => {
    dispatch({
        type: REQUEST_ROBOTS_PENDING
    })
    fetch('https://atsoft.com.mx:8443/demo-0.0.1-SNAPSHOT/teamMembers')
        .then(response => response.json())
        .then(data => dispatch({
            type: REQUEST_ROBOTS_SUCCESS, 
            payload: data
        }))
        .catch(error => dispatch({
            type: REQUEST_ROBOTS_FAILED,
            payload: error
        }))
}