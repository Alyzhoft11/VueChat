import React from 'react';

function SignUp() {
  return (
    <div>
      <div className="flex justify-center my-10">
        <div className="bg-white shadow-md sm:w-5/6 md:w-5/6 lg:w-1/4 xl:w-1/4 h-signup rounded-md">
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold mt-5">Sign Up</h1>
          </div>
          <form action="">
            <div className="flex justify-center">
              <input className="rounded-md px-2 mt-10 bg-gray-200 w-4/6 h-10" type="text" placeholder="Username" />
            </div>
            <div className="flex justify-center">
              <input className="rounded-md px-2 mt-5 bg-gray-200 w-4/6 h-10" type="email" placeholder="Email" />
            </div>
            <div className="flex justify-center">
              <input className="rounded-md px-2 mt-5 bg-gray-200 w-4/6 h-10" type="password" placeholder="Password" />
            </div>
            <div className="flex justify-center">
              <button className="bg-red-900 rounded-md px-2 mt-5 w-4/6 h-10 text-white text-xl font-bold">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
