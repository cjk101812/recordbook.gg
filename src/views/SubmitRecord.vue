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
            <v-select
              return-object
              v-model="formFields.game"
              :items="games"
              item-text="title"
              label="Game Title"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-select
              return-object
              v-model="formFields.record"
              :items="getRecords(formFields.game)"
              item-text="title"
              label="Record"
            ></v-select>
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
    games: [
      {
        title: 'Warzone',
        records: [
          { title: "Solos: Most Kills", description: "test desc" },
          { title: "Duos: Most Kills", description: "test desc" }
        ]
      },
      {
        title: 'Fortnite',
        records: [
          { title: "Solos: Most Kills", description: "fort test desc" },
          { title: "Squad: Most Kills", description: "fort test desc" }
        ]
      },
      {
        title: 'Fall Guys',
        records: [
          { title: "Most Crowns", description: "fg test desc" },
          { title: "Most Games without a Crown", description: "fg test desc" }
        ]
      }
    ],
    valid: false,
    formFields: {
      game: {},
      record: {},
      link: '',
      notes: '',
      official: false,
      upVotes: 0,
      downVotes: 0
    },
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    submitRecord(recordDetails: any) {
      const newRecord = {
        ...recordDetails,
        official: false,
        userId: this.$store.state.loggedInUserId
      };
      Axios.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/rb-api-hvrjj/service/rb-api/incoming_webhook/add_record', newRecord)
        .then((response: any) => {
          this.$router.push({ path: '/record/' + response.data._id.$oid });
        });
    },
    getRecords(activeGame: any) {
      const game = this.games.filter(game => game.title === activeGame.title);
      if (game.length > 0) {
        return game[0].records;
      } else {
        return [];
      }
    }
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
