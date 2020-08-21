<template>
  <v-app
    id="app"
    v-bind:class="{ 'theme--dark': $store.state.darkMode, 'theme--light': !$store.state.darkMode }"
  >
    <div id="nav">
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/search">Official Records</router-link>
      <router-link class="nav-link" to="/validate">Validate Records</router-link>
      <v-switch
        v-on:click="toggleDarkMode"
        class="float-right nav-switch"
        v-model="$vuetify.theme.dark"
        hide-details
        inset
        label="Dark Mode"
      ></v-switch>
      <div class="logged-in float-right" v-if="$store.state.loggedInUserId" v-on:click="logoutUser()">
        <div class="fake-link text--primary">Logout</div>
      </div>
      <div class="logged-in float-right" v-if="!$store.state.loggedInUserId">
        <router-link class="nav-link" to="/login">Login</router-link>
      </div>
    </div>
    <router-view/>
  </v-app>
</template>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.theme--light {
  #nav a {
    font-weight: bold;
    color: #222222;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.theme--dark {
  #nav a {
    font-weight: bold;
    color: #FFFFFF;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#nav {
  margin-top: 1em;
  .nav-link {
    margin: 1em 2em;
    text-decoration: none;
  }
  .nav-switch {
    margin: 0 1em;
  }
  a {
    font-weight: bold;
    color: #222222;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .fake-link {
    cursor: pointer;
    margin: 0em 2em;
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.neue-text {
  font-family: 'Bebas Neue';
}
</style>

<script>
export default {
  name: 'Home',
  methods: {
    toggleDarkMode() {
      this.$store.commit('toggleDarkMode');
      this.$vuetify.theme.dark = this.$store.state.darkMode;
    },
    logoutUser() {
      this.$store.commit('logoutUser');
    }
  },
};
</script>
