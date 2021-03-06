import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Store from '../store/index';
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa',
  },
  theme: {
    dark: Store.state.darkMode,
    themes: {
      light: {
        primary: '#42b883',
        secondary: '#34495e',
        accent: '#222222'
      },
      dark: {
        primary: '#42b883',
        secondary: '#34495e',
        accent: '#F2F2F2'
      },
    },
  },
});
