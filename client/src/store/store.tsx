import { Action, action, createStore } from 'easy-peasy';

interface userObject {
  id: string;
  userName: string;
  email: string;
}

interface UserModel {
  user: userObject;
  add: Action<UserModel, userObject>;
}

interface StoreModel {
  user: UserModel;
}

const userModel: UserModel = {
  user: {
    id: '',
    userName: '',
    email: '',
  },
  add: action((state, payload) => {
    state.user.id = payload.id;
    state.user.userName = payload.userName;
    state.user.email = payload.email;
  }),
};

const storeModel: StoreModel = {
  user: userModel,
};

const store = createStore(storeModel);

export default store;
