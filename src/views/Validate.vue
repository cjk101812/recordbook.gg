<template>
  <div class="about">
    <div class="header row primary--text">
      <div class="col-md-6 neue-text">Search Records</div>
      <div class="col-md-6 align-self-md-end">
        <v-text-field
          v-model="searchText"
          v-on:change="searchRecords(searchText)"
          label="Search by game..."
          required
        ></v-text-field>
      </div>
    </div>
    <div>
      <v-alert
        dark
        outlined
        dense
        icon="fas fa-vote-yea"
        border="bottom"
        colored-border
        prominent
      >
        We rely on you, the people, to validate records.  You can check out potential new records by watching the 
        VOD and rating the video with a 
        &nbsp;<v-icon small color="green lighten-2">fas fa-thumbs-up</v-icon>&nbsp; or 
        &nbsp;<v-icon small color="red lighten-2">fas fa-thumbs-down</v-icon>.
      </v-alert>
    </div>
    <v-card v-for="record in filteredRecords" v-bind:key="record._id.$oid" class="mx-auto mb-2">
      <v-card-text>
        <div>{{ record.game.title }}</div>
        <p class="display-1 text--primary">
          {{ record.record.title }}
        </p>
        <p>{{ record.notes }}</p>
        <div class="text--primary">
          Submitted By: {{ record.userDetails.firstName || "N/A" }} {{ record.userDetails.lastName }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="accent" v-on:click="viewRecord(record._id.$oid)">
          View Record
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Axios from "axios";

export default Vue.component("RecordPage", {
  data() {
    return {
      searchText: null,
      records: [],
      filteredRecords: []
    };
  },
  mounted() {
    this.getRecords();
  },
  methods: {
    getRecords(): void {
      Axios.get(
        "https://webhooks.mongodb-realm.com/api/client/v2.0/app/rb-api-hvrjj/service/rb-api/incoming_webhook/get_unofficial_records"
      ).then((records: any) => {
        this.records = records.data;
        this.filteredRecords = this.records;
      });
    },
    viewRecord(recordId: string) {
      this.$router.push({ path: `/record/${recordId}` });
    },
    searchRecords(searchText: string) {
      this.filteredRecords = this.records.filter((rec: any) => rec.game.title.toLowerCase().includes(searchText.toLowerCase()));
    }
  },
  watch: {
    searchText(newText) {
      this.searchRecords(newText);
    }
  }
});
</script>

<style scoped lang="scss">
.about {
  padding: 2em;
  font-weight: bold;
  .header {
    font-size: 4em;
  }
}
</style>
