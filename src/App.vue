<template>
  <v-app id="app">
    <div id="nav">
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/new-record">Submit New Record</router-link>
       <v-switch
        class="float-right nav-switch"
        v-model="$vuetify.theme.dark"
        hide-details
        inset
        label="Theme Dark"
      ></v-switch>
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
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
