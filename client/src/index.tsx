import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, RouteComponentProps } from '@reach/router';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split, ApolloLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { StoreProvider } from 'easy-peasy';
import './styles/tailwind.css';
import store from './store/store';
import Login from './components/Login';
import SignUp from './views/SignUp';
import Home from './views/Home';
import Navbar from './components/Navbar';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([splitLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

let LoginRoute = (props: RouteComponentProps) => <Login />;
let SignUpRoute = (props: RouteComponentProps) => <SignUp />;
let HomeRoute = (props: RouteComponentProps) => <Home />;

ReactDOM.render(
  <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <Navbar />
      <Router>
        <HomeRoute path="/" />
        <LoginRoute path="/login" />
        <SignUpRoute path="/signup" />
      </Router>
    </StoreProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
