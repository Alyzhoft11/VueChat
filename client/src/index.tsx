import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, RouteComponentProps } from '@reach/router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql } from '@apollo/client';
import './styles/tailwind.css';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

let LoginRoute = (props: RouteComponentProps) => <Login />;
let SignUpRoute = (props: RouteComponentProps) => <SignUp />;

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Navbar />
      <Router>
        <LoginRoute path="/" />
        <SignUpRoute path="/signup" />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
