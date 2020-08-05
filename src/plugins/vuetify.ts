import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Store from '../store/index';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: Store.state.darkMode,
    themes: {
      light: {
        primary: '#42b883',
        secondary: '#34495e',
        accent: '#222222',
        error: '#42b883',
      },
      dark: {
        primary: '#42b883',
        secondary: '#34495e',
        accent: '#F2F2F2',
        error: '#42b883',
      },
    },
  },
});
