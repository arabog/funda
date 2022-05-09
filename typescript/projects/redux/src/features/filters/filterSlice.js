export const StatusFilters ={
          All: 'all',
          Active: 'active',
          Completed: 'completed',
}

const initialState = {
          status: StatusFilters,

          colors: [],
}


export default function filterReducer(state = initialState, action) {
          switch(action.type) {
                    case 'filters/statusFilterChanged': 
                              return {
                                        ...state,

                                        status: action.payload
                              }

                    case 'filters/colorFilterChanged':
                              const {color, changeType } = action.payload;
                              const {colors} = state;

                              switch (changeType) {
                                        case 'added': 
                                                  if( colors.includes(color)) {
                                                            return state
                                                  }

                                                  return {
                                                            ...state,

                                                            colors: state.colors.concat(color)
                                                  }

                                        case 'removed' :
                                                  return {
                                                            ...state,

                                                            colors: state.colors.map(existingColor => existingColor !== color)
                                                  }

                                        default:
                                                  return state
                              }
                              
                    default:
                              return state;
          }
}

