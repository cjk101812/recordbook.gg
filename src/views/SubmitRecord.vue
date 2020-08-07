<template>
  <div class="about">
    <div class="header neue-text text--primary">Submit a New Record</div>
    <div class="sub-header text--secondary">
      Please fill out the form below which will be reviewed to verify a new record.
    </div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formFields.firstname"
              label="First Name"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formFields.lastname"
              label="Last Name"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formFields.email"
              label="Email"
              :rules="emailRules"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="formFields.game"
              :items="games"
              label="Game Title"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formFields.record"
              label="Record"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formFields.link"
              label="YouTube or Twitch Video Link"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="12"
          >
            <v-textarea
              v-model="formFields.notes"
              label="Any other notes..."
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <v-btn color="primary" v-on:click="submitRecord(formFields)">
          Submit For Review
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Axios from 'axios';

export default Vue.component('SubmitRecord', {
  data: () => ({
    games: ['Warzone', 'Fortnite'],
    valid: false,
    formFields: {
      game: '',
      record: '',
      link: '',
      notes: '',
      firstname: '',
      lastname: '',
      email: '',
    },
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    submitRecord(recordDetails: any) {
      console.log('Attempting to submit a new record. ', recordDetails);
      Axios.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/rb-api-hvrjj/service/rb-api/incoming_webhook/add_record', recordDetails)
        .then(() => (this.$router.push({ path: '/search' })));
    },
  },
});
</script>

<style scoped lang="scss">
.about {
  padding: 2em;
  font-weight: bold;
  .header {
    font-size: 4em;
  }
  .sub-header {
    font-size: 1.5em;
  }
}
</style>
