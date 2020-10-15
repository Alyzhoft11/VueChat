import React from 'react';
import Login from '../components/Login';
import Servers from '../components/Servers';
import { useStoreState } from 'easy-peasy';

function Home() {
  const user = useStoreState((state) => state.user);
  let isLoggedIn = false;

  console.log(user);

  if (user.user.userName != '') {
    isLoggedIn = true;
  }
  return <div>{isLoggedIn ? <Servers /> : <Login />}</div>;
}

export default Home;
