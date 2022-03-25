import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import FirstStep from '../components/FirstStep';
import Header from '../components/Header';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';


const AppRouter = () => {
          return (
                    <BrowserRouter>
                              <div className="container">
                                        <Header />

                                        <Switch>
                                                  <Route component={FirstStep} path="/" exact={true} />

                                                  <Route component={SecondStep} path="/second" />

                                                  <Route component={ThirdStep} path="/third" />

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

*/ 