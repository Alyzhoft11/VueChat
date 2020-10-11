import { createStore } from 'easy-peasy';

interface UserModel {
  user: string;
}

interface StoreModel {
  user: UserModel;
}

const userModel: UserModel = {
  user: 'Alex',
};

const storeModel: StoreModel = {
  user: userModel,
};

const store = createStore(storeModel);

export default store;
