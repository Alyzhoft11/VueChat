import React from 'react';

const channelHeight = {
  height: 'calc(100vh - 4.22rem)',
};

function Channels() {
  return (
    <div>
      <div className=" min-h-screen shadow w-16 border-r-4 bg-gray-900 border-gray-900">
        <div className="flex justify-center">
          <button className="mt-2 rounded-full h-12 w-12 bg-gray-800 outline-none text-red-900 hover:bg-red-900 hover:text-white">
            <div className="flex content-center justify-center">
              <svg className="w-8 h-8  fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Channels;
