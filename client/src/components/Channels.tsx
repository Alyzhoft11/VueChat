import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

function Channels() {
  const servers = useStoreState((state) => state.user.servers);
  const selectedServer = useStoreState((state) => state.user.selectedServer);

  let channels = [];
  if (servers.length > 0) {
    channels = servers.filter((server: any) => {
      return server.id == selectedServer;
    })[0].channels;
  }

  return (
    <div className="bg-gray-800 w-56">
      {channels.map((channel: any) => (
        <div className="flex justify-center mt-3">
          <button className="text-lg text-gray-600 outline-none">{channel.channelName}</button>
        </div>
      ))}
    </div>
  );
}

export default Channels;
