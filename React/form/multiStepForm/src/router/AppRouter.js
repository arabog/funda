import React, { useState } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import FirstStep from '../components/FirstStep';
import Header from '../components/Header';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';


const AppRouter = () => {
          const [user, setUser] = useState({});

          const updateUser = (data) => {
                    setUser(prevUser => ({...prevUser, ...data}));
          }

          // const resetUser = () => {
          //           setUser('');
          // }


          return (
                    <BrowserRouter>
                              <div className="container">
                                        <Header />

                                        <Switch>
                                                  <Route 
                                                            render={(props) => (
                                                                      <FirstStep 
                                                                                {...props} 
                                                                                user={user} 
                                                                                updateUser={updateUser} 
                                                                      />
                                                            )}
                                                            
                                                            path="/" 
                                                            exact={true} 
                                                  />

                                                  <Route
                                                            render={(props) => (
                                                                      <SecondStep 
                                                                                {...props} 
                                                                                user={user} 
                                                                                updateUser={updateUser} 
                                                                      />
                                                            )}

                                                            path="/second"
                                                  />
                                                  
                                                  <Route
                                                            render={(props) => (
                                                                      <ThirdStep 
                                                                                {...props} 
                                                                                user={user}  />
                                                            )}

                                                            path="/third"
                                                  />

                                        </Switch>
                              </div>
                    </BrowserRouter>
          )
}


export default AppRouter;


/*
When we provide any component for the Route inside 
the BrowserRouter, React Router automatically passes 
3 props to that component, which are:

history
location
match

Out of these, the history object contains a push method that we can use 
to redirect from one component to another.

So this code:

setUser((prevUser) => ({ ...prevUser, ...data }));

is the same as the below code:

setUser((prevUser) => {
          return {
                    ...prevUser,
                    ...data
          };
});

As you can see above, if we want to implicitly return 
an object from an arrow function, we can skip the 
return keyword and enclose the object in round brackets.


So to pass the user and updateUser as props to the components 
connected to the route, we can't pass it like this:

<Route 
          component={FirstStep} 
          path="/" 
          exact={true} 
          user={user} 
          updateUser={updateUser} 
/>

Because this way props will be passed to the Route and not 
to the FirstStep component. So we need to use the following syntax:

<Route
          render={(props) => (
                    <FirstStep 
                              {...props} 
                              user={user} 
                              updateUser={updateUser} 
                    />
          )}

          path="/"
          exact={true}
/>
Here, we're using the render props pattern for passing props. This will correctly pass the props and will also not re-create the FirstStep component on every re-render.


*/ 