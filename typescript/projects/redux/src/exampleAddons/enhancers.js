
export const sayHiOnDispatch = (configureStore) => {

          return(rootReducer, preloadedState, enhancers) => {
                    const store = configureStore(rootReducer, preloadedState, enhancers);

                    function newDispatch(action) {
                              const result  = store.dispatch(action);
                              console.log('Hi');
                              return result;
                    }

                    return {...store, dispatch: newDispatch}
          }
}

export const includeMeaningOfLife = (configureStore) => {

          return(rootReducer, preloadedState, enhancers) => {
                    const store = configureStore(rootReducer, preloadedState, enhancers);

                    function newGetState() {
                              return {
                                        ...store.getState(),
                                        meaningOfLife: 42,
                              }
                    }

                    return {...store, getState: newGetState}
          }
}