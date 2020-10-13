import React from 'react';
import Login from '../components/Login';
import { useStoreState } from 'easy-peasy';

function Home() {
  const user = useStoreState((state) => state.user);
  let isLoggedIn = false;

  if (user.user.name != '') {
    isLoggedIn = true;
  }
  return <div>{isLoggedIn ? <h1>Logged In {user.user.name}</h1> : <Login />}</div>;
}

export default Home;
