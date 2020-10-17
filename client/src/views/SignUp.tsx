import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useStoreActions } from 'easy-peasy';
import { navigate } from '@reach/router';

const CREATE_USER = gql`
  mutation CreateUser($userName: String!, $password: String!, $email: String!) {
    createUser(userName: $userName, password: $password, email: $email) {
      id
      userName
      email
    }
  }
`;

function SignUp() {
  let userName: HTMLInputElement | null;
  let password: HTMLInputElement | null;
  let email: HTMLInputElement | null;

  const setUser = useStoreActions<any, any>((actions) => actions.user.add);
  const [createUser, { loading, data }] = useMutation(CREATE_USER);

  if (!loading) {
    if (data != undefined) {
      if (data.createUser != null) {
        setUser(data.createUser);
        navigate('/');
      }
    }
  }

  return (
    <div>
      <div className="flex justify-center my-10">
        <div className="bg-white shadow-md sm:w-5/6 md:w-5/6 lg:w-1/4 xl:w-1/4 h-signup rounded-md">
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold mt-5">Sign Up</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createUser({ variables: { userName: userName!.value, password: password!.value, email: email!.value } });

              userName!.value = '';
              password!.value = '';
              email!.value = '';
            }}
          >
            <div className="flex justify-center">
              <input
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
                  email = node;
                }}
                className="rounded-md px-2 mt-5 bg-gray-200 w-4/6 h-10"
                type="email"
                placeholder="Email"
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
              <button type="submit" className="bg-red-900 rounded-md px-2 mt-5 w-4/6 h-10 text-white text-xl font-bold">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
