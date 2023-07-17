const initialState = {
    dogs: [],
    allDogs: [],
    temps: [],
    detail: []
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case `GET_DOGS`:
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case `POST_DOG`:
            return{
                ...state
            }
        case `GET_TEMPS`:
            return{
                ...state,
                temps: action.payload
            }

        case "GET_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        
        case "GET_FILTER_TEMPERAMENTS":
            const allDogs = state.allDogs;
            let filteredDogs = [];
            if (action.payload === "Todos") {
              filteredDogs = allDogs;
            } else {
              for (let i = 0; i < allDogs.length; i++) {
                let found = allDogs[i].temperaments.find((t) => t === action.payload);
                if (found) {
                  filteredDogs.push(allDogs[i]);
                } 
              }
            }
            return {
              ...state,
              dogs: filteredDogs,
            };

        case "FILTER_CREATED":
            const dogByOrigin = state.allDogs;
            const createdFilter = action.payload === "created" ? 
                dogByOrigin.filter((p)=>p.createdInDb) : dogByOrigin.filter((p)=>!p.createdInDb)
            return{
                ...state,
                dogs: action.payload === "all" ? 
                    dogByOrigin : createdFilter.length ? createdFilter : createdFilter
            }
        case "GET_DOG_BY_NAME":
            return{
                ...state,
                dogs: action.payload
            }

        case "ORDER_BY_NAME":
            const sorted = action.payload === "asc" ?
                state.dogs.sort(function(a, b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.dogs.sort(function(a, b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: sorted
            }

            default:
                return state;
    }
}

export default rootReducer;