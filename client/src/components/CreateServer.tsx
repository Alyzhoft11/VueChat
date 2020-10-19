import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { gql, useMutation } from '@apollo/client';

type Props = {
  onClose(): void;
};

const ADD_SERVER = gql`
  mutation addServer($ownerId: String!, $imageURL: String!, $serverName: String!) {
    addServer(ownerId: $ownerId, imageURL: $imageURL, serverName: $serverName) {
      serverName
      ownerId
      id
      imageURL
    }
  }
`;

function CreateServer({ onClose }: Props) {
  const ownerId = useStoreState((state) => state.user.user.id);
  const addServerState = useStoreActions<any, any>((actions) => actions.user.addServer);

  const [serverName, setServerName] = useState('');
  const [imageURL, setImageURL] = useState('');

  const [addServer, { loading, data, error }] = useMutation(ADD_SERVER);

  if (!loading) {
    if (data != undefined) {
      addServerState(data.addServer);
      onClose();
    }
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className=" sm:w-5/6 md:w-5/6 lg:w-2/4 xl:w-1/4 my-2 mx-auto ">
          <div className="flex justify-center">
            <div className="bg-white shadow-md w-full h-l rounded-md">
              <div className="flex justify-end mt-4 mr-4">
                <button onClick={onClose} className="outline-none hover:text-red-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-center -mt-5">
                <h1 className="text-3xl font-bold mt-5">Create a Server</h1>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addServer({ variables: { serverName: serverName, imageURL: imageURL, ownerId: ownerId } });

                  setImageURL('');
                  setServerName('');
                }}
              >
                <div className="flex justify-center">
                  <input onChange={(e) => setServerName(e.target.value)} required autoFocus className="rounded-md px-2 mt-10 bg-gray-200 w-4/6 h-10" type="text" placeholder="Server Name" />
                </div>
                <div className="flex justify-center">
                  <input onChange={(e) => setImageURL(e.target.value)} required className="rounded-md px-2 mt-5 bg-gray-200 w-4/6 h-10" type="url" placeholder="Image Url" />
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="bg-red-900 rounded-md px-2 mt-5 w-4/6 h-10 text-white text-xl font-bold">
                    Create Server
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default CreateServer;
