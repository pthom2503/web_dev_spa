import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import "./App.scss";
import UsersList from "./Users/List";
import UsersNew from "./Users/New";
import Nav from "./Nav";
import Feed from "./Feed";
import PostsNew from "./Posts/New";

function App() {
  return (
    <Container>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Feed />
        </Route>
        <Route path="/posts/new" exact>
	  <PostsNew />
	</Route>
	<Route path="/users" exact>
          <UsersList />
        </Route>
        <Route path="/users/new">
          <UsersNew />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
