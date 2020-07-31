import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#42b883',
        secondary: '#42b883',
        accent: '#42b883',
        error: '#42b883',
      },
      dark: {
        primary: '#42b883',
        secondary: '#FFFFFF',
        accent: '#42b883',
        error: '#42b883',
      },
    },
  },
});
