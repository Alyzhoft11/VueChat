import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CreateServer from './CreateServer';
import Server from './Server';

type Props = {
  onClose(): void;
};

const channelHeight = {
  height: 'calc(100vh - 3.25rem)',
};

const letters = ['a', 'b'];

const SERVER = gql`
  query getServers($id: [String!]!) {
    servers(id: $id) {
      imageURL
      id
      ownerId
      serverName
    }
  }
`;

function Servers() {
  const servers = useStoreState((state) => state.user.user.servers);

  const [showModal, setShowModal] = useState(false);

  const { loading, data } = useQuery(SERVER, {
    variables: { id: servers },
  });

  if (loading) return <div>Loading</div>;

  console.log(data);

  let test: any;
  if (showModal) {
    test = <CreateServer onClose={() => setShowModal(false)} />;
  }

  return (
    <div className="relative">
      {test}
      <div style={channelHeight} className=" shadow w-16 border-r-4 bg-gray-900 border-gray-900">
        {data.servers.map((server: any) => (
          <Server imageUrl={server.imageURL} key={server.id} />
        ))}

        <div className="flex justify-center">
          <button onClick={() => setShowModal(true)} className="mt-2 rounded-full h-12 w-12 bg-gray-800 outline-none text-red-900 hover:bg-red-900 hover:text-white">
            <div className="flex content-center justify-center">
              <svg className="w-8 h-8  fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Servers;
