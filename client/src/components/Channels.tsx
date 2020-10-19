import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CreateChannel from './CreateChannel';

function Channels() {
  const [showModal, setShowModal] = useState(false);
  const servers = useStoreState((state) => state.user.servers);
  const selectedServer = useStoreState((state) => state.user.selectedServer);

  let channels = [];
  if (servers.length > 0) {
    channels = servers.filter((server: any) => {
      return server.id == selectedServer;
    })[0].channels;
  }

  let modal: any;
  if (showModal) {
    modal = (
      <CreateChannel
        onClose={() => {
          setShowModal(false);
        }}
      />
    );
  }

  return (
    <>
      {modal}
      <div className="bg-gray-800 w-56">
        <div className="flex justify-end mt-4 mr-4">
          <button onClick={() => setShowModal(true)} className="outline-none hover:text-red-900">
            <svg className="w-8 h-8  fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
        </div>
        {channels.map((channel: any) => (
          <div className="flex justify-start">
            <button className="text-lg text-gray-600 w-full mx-3 outline-none rounded-md hover:bg-gray-700 hover:text-gray-200">{channel.channelName}</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Channels;
