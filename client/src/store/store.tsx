import { Action, action, createStore } from 'easy-peasy';

interface userObject {
  name: string;
}

interface UserModel {
  user: userObject;
  add: Action<UserModel, string>;
}

interface StoreModel {
  user: UserModel;
}

const userModel: UserModel = {
  user: {
    name: '',
  },
  add: action((state, payload) => {
    state.user.name = payload;
  }),
};

const storeModel: StoreModel = {
  user: userModel,
};

const store = createStore(storeModel);

export default store;
