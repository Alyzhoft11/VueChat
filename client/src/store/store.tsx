import { Action, action, createStore } from 'easy-peasy';

interface userObject {
  id: string;
  userName: string;
  email: string;
  servers: string[];
}

interface serverObject {
  id: string;
  serverName: string;
  imageURL: string;
  ownerId: string;
}

interface UserModel {
  user: userObject;
  servers: serverObject[];
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
    servers: [],
  },
  servers: [],
  add: action((state, payload) => {
    state.user.id = payload.id;
    state.user.userName = payload.userName;
    state.user.email = payload.email;
    state.user.servers = payload.servers;
  }),
};

const storeModel: StoreModel = {
  user: userModel,
};

const store = createStore(storeModel);

export default store;
