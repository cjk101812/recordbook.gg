<template>
  <div class="login-container col-md-4 offset-md-4">
    <div class="header neue-text">
      Register for recordbook.gg
    </div>
    <div class="login-form">
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="userDetails.username"
                label="Username"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="userDetails.password"
                label="Password"
                required
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="userDetails.firstName"
                label="First Name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="userDetails.lastName"
                label="Last Name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="userDetails.email"
                label="Email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          
          <v-btn color="primary" v-on:click="register(userDetails)">
            Sign Up
          </v-btn><br />
          <v-btn class="mt-4" text color="primary" to="/login">
            Back to Login
          </v-btn>
          <div class="error mt-4 text-left" v-if="error">
            <v-alert
              border="top"
              elevation="2"
              type="error"
            >
              {{ error }}
            </v-alert>
          </div>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Axios from "axios";

export default Vue.component("RecordPage", {
  data() {
    return {
      valid: false,
      userDetails: {
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null
      },
      error: ""
    };
  },
  methods: {
    register(userDetails): void {
      console.log('Testing Register: ', userDetails);
      Axios.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/rb-api-hvrjj/service/rb-api/incoming_webhook/register_user', userDetails)
        .then((user: any) => {
          if (!user.data) {
            this.error = "User not found.";
          } else {
            this.error = "";
            console.log(user.data);
            this.$store.commit('setLoggedInUser', { userId: user.data.insertedId.$oid });
            this.$router.push({ path: `/` });
          }
        })
    },
  }
});
</script>

<style scoped lang="scss">
.login-container {
  text-align: center;
  border: 3px solid #34495e;
  border-radius: 3px;
  padding: 0px;
  margin-top: 3em;
  .header {
    background-color: #34495e;
    color: #FFF;
    padding: 1em;
    font-size: 1.5em;
  }
  .login-form {
    padding: 2em;
  }
}
</style>