import React from 'react';

import './App.css';
import {
  Switch,
  Route,
  Router,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';
import Login from './Login';
import Listings from './Listings';

function App() {
  return (
    <div className='app-routes'>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              return <Redirect to='/login' />;
            }}
          />
          <Route path='/login' component={Login} exact />
          <Route path='/listings' component={Listings} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
