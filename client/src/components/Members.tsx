import React from 'react';

const channelHeight = {
  height: 'calc(100vh - 3.25rem)',
};

function Members() {
  return (
    <div style={channelHeight} className="bg-gray-800 w-56 shadow-md">
      <div className="flex justify-center">Members</div>
    </div>
  );
}

export default Members;
