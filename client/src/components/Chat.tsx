import React from 'react';
const channelHeight = {
  height: 'calc(100vh - 3.25rem)',
};

function Chat() {
  return (
    <div className="w-full">
      <div style={channelHeight} className="flex flex-col justify-between">
        <div></div>
        <div className="flex justify-center align-middle">
          <div className="w-11/12 border-t border-gray-600 pt-4">
            <input required autoFocus className="rounded-md mb-4 px-2 bg-gray-600 w-full h-10" type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
