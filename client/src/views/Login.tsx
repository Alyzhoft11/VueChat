import React from 'react';
import { Link } from '@reach/router';
import { useQuery, gql } from '@apollo/client';
import { useStoreState } from 'easy-peasy';

const USER = gql`
  query test {
    userByUserName(userName: "Alex") {
      id
      userName
    }
  }
`;

function Login() {
  const user = useStoreState((state) => state.user);

  console.log(user);

  return (
    <div className="flex justify-center my-16">
      <div className="bg-white shadow-md sm:w-5/6 md:w-5/6 lg:w-1/4 xl:w-1/4 h-l rounded-md">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold mt-5">Account Login</h1>
        </div>
        <form>
          <div className="flex justify-center">
            <input className="rounded-md px-2 mt-10 bg-gray-200 w-4/6 h-10" type="text" placeholder="Username" />
          </div>
          <div className="flex justify-center">
            <input className="rounded-md px-2 mt-5 bg-gray-200 w-4/6 h-10" type="password" placeholder="Password" />
          </div>
          <div className="flex justify-center">
            <button className="bg-red-900 rounded-md px-2 mt-5 w-4/6 h-10 text-white text-xl font-bold">Login</button>
          </div>
          <div className="flex justify-center mt-2">
            <p className=" text-lg">
              Don't have an account?
              <span>
                <Link to="signup">
                  <a className=" text-red-900 text-xl cursor-pointer hover:underline"> Sign Up</a>
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
