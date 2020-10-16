import React from 'react';

type serverProp = {
  imageUrl: string;
};

function Server({ imageUrl }: serverProp) {
  return (
    <div className="flex justify-center">
      <button className="mt-2 rounded-full h-12 w-12 bg-gray-800 outline-none hover:shadow-outline">
        <div className="flex justify-center">
          <img className="rounded-full object-fill w-full max-h-full" src={imageUrl} alt="" />
          {/* <h1 className="text-white">{serverName}</h1> */}
        </div>
      </button>
    </div>
  );
}

export default Server;
