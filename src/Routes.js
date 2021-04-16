import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/container/Home';
import Detail from './pages/detail/container/Detail';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/detail/:owner/:repo" component={Detail} />
      </Switch>
    </BrowserRouter>
  );
}
