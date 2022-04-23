const InitialState = {count: 0};


function Reducer(state, action) {

          switch (action.type) {
                    case 'increment':
                              return {count: state.count + 1};

                    case 'decrement':
                              return {count: state.count - 1};

                    default:
                              throw new Error();
          }
}

export {Reducer, InitialState};