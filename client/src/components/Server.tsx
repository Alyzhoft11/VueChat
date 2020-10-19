import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

type serverProp = {
  imageUrl: string;
  id: string;
  selected: boolean;
};

function Server({ imageUrl, id, selected }: serverProp) {
  const setSelectedServer = useStoreActions<any, any>((actions) => actions.user.setSelectedServer);

  let selectedClass = selected ? 'shadow-outline' : 'hover:shadow-outline';

  return (
    <div className="flex justify-center">
      <button onClick={() => setSelectedServer(id)} className={`mt-2 rounded-full h-12 w-12 bg-gray-800 outline-none ${selectedClass}`}>
        <div className="flex justify-center">
          <img className="rounded-full object-fill w-full max-h-full" src={imageUrl} alt="" />
          {/* <h1 className="text-white">{serverName}</h1> */}
        </div>
      </button>
    </div>
  );
}

export default Server;
