import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CreateChannel from './CreateChannel';
import Channel from './Channel';
import { gql, useQuery, useSubscription } from '@apollo/client';

const CHANNEL_SUBSCRIPTION = gql`
  subscription subscriptionChannel($topic: String!) {
    subscriptionChannel(topic: $topic) {
      id
      channels {
        channelName
      }
    }
  }
`;

const GET_CHANNELS = gql`
  query getChannels($serverId: String!) {
    getChannels(serverId: $serverId) {
      id
      channels {
        channelName
      }
    }
  }
`;

function Channels() {
  const [showModal, setShowModal] = useState(false);
  const servers = useStoreState((state) => state.user.servers);
  const selectedServer = useStoreState((state) => state.user.selectedServer);
  const selectedChannel = useStoreState((state) => state.user.selectedChannel);
  const setSelectedChannel = useStoreActions<any, any>((action) => action.user.setSelectedChannel);

  // const { data: updatedData, loading } = useSubscription(CHANNEL_SUBSCRIPTION, { variables: { topic: selectedServer } });
  const { data, subscribeToMore } = useQuery(GET_CHANNELS, { variables: { serverId: selectedServer } });

  let channels: any = [];
  if (servers.length > 0) {
    if (data != undefined) {
      channels = data.getChannels.channels;
    }
  }

  useEffect(() =>
    subscribeToMore({
      document: CHANNEL_SUBSCRIPTION,
      variables: { topic: selectedServer },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const data = subscriptionData.data;
        return Object.assign({}, prev, {
          allChannels: [data.subscriptionChannel.channels, ...prev.getChannels.channels].slice(0, 20),
        });
      },
    }),
  );

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
      <div className="bg-gray-800 w-1/4 shadow-md">
        <div className="flex justify-end mt-1 mr-4">
          <button onClick={() => setShowModal(true)} className="outline-none hover:text-red-900">
            <svg className="w-8 h-8  fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
        </div>
        {channels.map((channel: any) => {
          if (!selectedChannel) {
            setSelectedChannel(channels[0].channelName);
          }
          let selected = channel.channelName == selectedChannel ? true : false;
          return <Channel channelName={channel.channelName} selected={selected} key={channel.channelName} />;
        })}
      </div>
    </>
  );
}

export default Channels;
