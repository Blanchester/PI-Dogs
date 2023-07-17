import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        const dogs = await axios.get('http://localhost:3001/dogs',{
        });
        
        return dispatch({
            type: 'GET_DOGS',
            payload: dogs.data
        })
    }
}

export function getTemperaments(){
    return async function(dispatch){
        const temps = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: 'GET_TEMPS',
            payload: temps.data
        })
    }
}

export function postDog(payload){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/dogs', payload);
        
        return response
    }
}



export function filterCreated(payload){
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            let dog = await axios.get(`http://localhost:3001/dogs/`+id);
            return dispatch({
                type: "GET_DETAIL",
                payload: dog.data
            })
        } catch (error) {
            alert(error)
        }
    }
}

export function FilterByTemperament(payload) {
    return{
        type: "GET_FILTER_TEMPERAMENTS",
        payload
    }
};

export function getDogByName(name){
    return async function(dispatch){
        try {
            let dog = await axios.get('http://localhost:3001/dogs?name='+name);
            return dispatch ({
                type: "GET_DOG_BY_NAME",
                payload: dog.data
            })
        } catch (error) {
            alert(error)
        }
    }
}

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}