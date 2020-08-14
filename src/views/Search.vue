<template>
  <div class="about">
    <div class="header neue-text primary--text">Search Records</div>
    <v-card v-for="record in records" v-bind:key="record._id" class="mx-auto mb-2">
      <v-card-text>
        <div>{{ record.game }}</div>
        <p class="display-1 text--primary">
          {{ record.record }}
        </p>
        <p>{{ record.notes }}</p>
        <div class="text--primary">
          Submitted By: {{ record.firstname || "N/A" }} {{ record.lastname }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="accent" v-on:click="viewRecord(record._id)">
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
      records: null
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
      });
    },
    viewRecord(recordId: string) {
      this.$router.push({ path: `/record/${recordId}` });
    },
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
