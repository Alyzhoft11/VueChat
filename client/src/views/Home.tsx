import React from 'react';
import Login from '../components/Login';
import Channgels from '../components/Channels';
import { useStoreState } from 'easy-peasy';

function Home() {
  const user = useStoreState((state) => state.user);
  let isLoggedIn = false;

  if (user.user.name != '') {
    isLoggedIn = true;
  }
  return <div>{isLoggedIn ? <Channgels /> : <Login />}</div>;
}

export default Home;
