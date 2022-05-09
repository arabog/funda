const initialState = {
          status: 'All',
          colors: [],
}


export default function filterReducer(state = initialState, action) {
          switch(action.type) {
                    case 'filters/statusFilterChanged': 
                              return {
                                        ...state,

                                        status: action.payload
                              }

                    default:
                              return state;
          }
}