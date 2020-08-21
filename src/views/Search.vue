<template>
  <div class="about">
    <div class="header primary--text row">
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
    <v-card v-for="record in filteredRecords" v-bind:key="record._id.$oid" class="mx-auto mb-2">
      <v-card-text>
        <div>{{ record.game.title }}</div>
        <p class="display-1 text--primary">
          {{ record.record.title }}
        </p>
        <p>{{ record.notes }}</p>
        <div class="text--primary">
          Submitted By: {{ record.firstname || "N/A" }} {{ record.lastname }}
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
      records: [],
      searchText: null,
      filteredRecords: []
    };
  },
  mounted() {
    this.getRecords();
  },
  methods: {
    getRecords(): void {
      Axios.get(
        "https://webhooks.mongodb-realm.com/api/client/v2.0/app/rb-api-hvrjj/service/rb-api/incoming_webhook/get_official_records"
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
