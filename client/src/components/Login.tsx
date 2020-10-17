import React from 'react';
import { Link } from '@reach/router';
import { useLazyQuery, gql } from '@apollo/client';
import { useStoreActions } from 'easy-peasy';

const USER = gql`
  query getUser($userName: String!, $password: String!) {
    userByUserName(userName: $userName, password: $password) {
      id
      userName
      email
      servers
    }
  }
`;

function Login() {
  let userName: HTMLInputElement | null;
  let password: HTMLInputElement | null;

  const setUser = useStoreActions<any, any>((actions) => actions.user.add);

  const [getUser, { loading, data }] = useLazyQuery(USER);

  if (!loading) {
    if (data != undefined) {
      if (data.userByUserName != null) {
        setUser(data.userByUserName);
      }
    }
  }

  return (
    <div className="flex justify-center my-16">
      <div className="bg-white shadow-md sm:w-5/6 md:w-5/6 lg:w-2/4 xl:w-1/4 h-l rounded-md">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold mt-5">Account Login</h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getUser({ variables: { userName: userName!.value, password: password!.value } });
            userName!.value = '';
            password!.value = '';
          }}
        >
          <div className="flex justify-center">
            <input
              autoFocus
              ref={(node) => {
                userName = node;
              }}
              className="rounded-md px-2 mt-10 bg-gray-200 w-4/6 h-10"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="flex justify-center">
            <input
              ref={(node) => {
                password = node;
              }}
              className="rounded-md px-2 mt-5 bg-gray-200 w-4/6 h-10"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-red-900 rounded-md px-2 mt-5 w-4/6 h-10 text-white text-xl font-bold">Login</button>
          </div>
          <div className="flex justify-center mt-2">
            <p className=" text-lg">
              Don't have an account?
              <span>
                <Link className=" text-red-900 text-xl cursor-pointer hover:underline" to="signup">
                  {' '}
                  Sign Up
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
