import React from 'react';
import './App.css';
import Login from './Pages/Login';
import Panel from './Pages/Panel';
import { Route, Redirect } from 'react-router';
import Cookies from 'universal-cookie';

function App()
{
  const cookies = new Cookies();

  // (function() {
  //   var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  //   link.type = 'image/x-icon';
  //   link.rel = 'shortcut icon';
  //   link.href = require("./Assets/favicon.ico");
  //   document.getElementsByTagName('head')[0].appendChild(link);
  // })();

  Object.assign(document.body.style,
    {
      "background-color":"#131313",
      "color":"white"
    });

  return (
    <div className="App">
      <Route exact path="/login" component={()=>{return (<Login cookies={cookies} />);}}></Route>
      <Route exact path="/panel" component={()=><Redirect to="/panel/users" />} />
      <Route path="/panel/:path/:id?" component={()=>{return (<Panel cookies={cookies} />);}}></Route>
    </div>
  );
}

export default App;
