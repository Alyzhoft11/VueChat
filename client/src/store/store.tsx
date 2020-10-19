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
  channels: channelsObject;
}

interface channelsObject {
  channelName: string;
}

interface UserModel {
  user: userObject;
  servers: serverObject[];
  selectedServer: string;
  add: Action<UserModel, userObject>;
  addServer: Action<UserModel, serverObject>;
  setServers: Action<UserModel, serverObject[]>;
  setSelectedServer: Action<UserModel, string>;
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
  selectedServer: '',
  add: action((state, payload) => {
    state.user.id = payload.id;
    state.user.userName = payload.userName;
    state.user.email = payload.email;
    state.user.servers = payload.servers;
  }),
  addServer: action((state, payload) => {
    state.user.servers.push(payload.id);
  }),
  setServers: action((state, payload) => {
    state.servers = payload;
  }),
  setSelectedServer: action((state, payload) => {
    state.selectedServer = payload;
  }),
};

const storeModel: StoreModel = {
  user: userModel,
};

const store = createStore(storeModel);

export default store;
