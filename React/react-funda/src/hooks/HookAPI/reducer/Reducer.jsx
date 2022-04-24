const InitialState = {count: 0, user: ''};

/*
Actions may contain other values, which are 
typically stored in the action.payload field
*/


function Reducer(state, action) {

          switch (action.type) {
                    case 'increment':
                              return {count: state.count + 1, user: state.user};

                    case 'decrement':
                              return action.payload;

                    default:
                              throw new Error();
          }
}

export {Reducer, InitialState};

/*

function init(initialCount) {
          return {count: initialCount};
}

function Reducer(state, action) {
          switch (action.type) {
                    case 'increment':
                              // return {count: state.count + 1};
                              return action.payload;
                    
                    case 'decrement':
                              return {count: state.count - 1};
                    
                    case 'reset':
                              return init(action.payload);
                    
                    default:
                              throw new Error();
          }
}


export { Reducer, init };

*/