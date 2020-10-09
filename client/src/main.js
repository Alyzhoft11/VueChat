import Vue, { createApp } from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/index.css';

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'http://localhost:4001',
  }),
});

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider, // add option
  render: (h) => h(App),
});
