import React from 'react';
import { useStoreActions } from 'easy-peasy';

type channelProp = {
  channelName: string;
  selected: boolean;
};

function Channel({ channelName, selected }: channelProp) {
  const setSelectedChannel = useStoreActions<any, any>((action) => action.user.setSelectedChannel);

  let selectedClass = selected ? 'bg-gray-700 text-gray-200' : 'hover:bg-gray-700 hover:text-gray-200 text-gray-600';

  return (
    <div className="flex justify-start mb-2">
      <button onClick={() => setSelectedChannel(channelName)} className={`text-lg w-full mx-3 outline-none rounded-md ${selectedClass}`}>
        {channelName}
      </button>
    </div>
  );
}

export default Channel;
