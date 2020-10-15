import React from 'react';

type serverProp = {
  letter: string;
};

function Server({ letter }: serverProp) {
  return (
    <div className="flex justify-center">
      <button className="mt-2 rounded-full h-12 w-12 bg-gray-800 outline-none hover:shadow-outline">
        <div className="flex justify-center">
          <img className="rounded-full object-fill w-full max-h-full" src="https://www.kaaltv.com/kaalimages/repository/2020-06/baseball-generic-photo.jpg" alt="" />
        </div>
      </button>
    </div>
  );
}

export default Server;
