import React from 'react';
import Login from '../components/Login';
import Servers from '../components/Servers';
import Channels from '../components/Channels';
import Chat from '../components/Chat';
import Members from '../components/Members';
import { useStoreState } from 'easy-peasy';

function Home() {
  const user = useStoreState((state) => state.user);
  let isLoggedIn = false;

  if (user.user.userName != '') {
    isLoggedIn = true;
  }
  return (
    <div>
      {isLoggedIn ? (
        <div className="flex bg-gray-700">
          <Servers />
          <Channels />
          <Chat />
          <div className=" ml-auto">
            <Members />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
