import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, RouteComponentProps } from '@reach/router';
import './styles/tailwind.css';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Navbar from './components/Navbar';

let LoginRoute = (props: RouteComponentProps) => <Login />;
let SignUpRoute = (props: RouteComponentProps) => <SignUp />;

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Router>
      <LoginRoute path="/" />
      <SignUpRoute path="/signup" />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
