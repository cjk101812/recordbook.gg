<template>
  <div class="about">
    <div class="header neue-text text--primary">{{ activeRecord.game }}</div>
    <div class="sub-header text--secondary">{{ activeRecord.record }}</div>
    <p class="text--primary">Description: {{ activeRecord.recordDescription || 'N/A' }}</p>
    <p class="text--primary">Submitted by: {{ activeRecord.firstname }} {{ activeRecord.lastname }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MockData from '@/fixtures/mock_records';
import Axios from 'axios';

export default Vue.component('RecordPage', {
  data() {
    return {
      activeRecord: {},
      recordBook: MockData,
    };
  },
  mounted() {
    this.getActiveRecord(this.$route.params.id);
  },
  methods: {
    getActiveRecord(id: string) {
      console.log('Attempting to submit a new record. ', id);
      return Axios.get('https://webhooks.mongodb-realm.com/api/client/v2.0/app/rb-api-hvrjj/service/rb-api/incoming_webhook/get_record?id='+ id)
        .then((recordDetails) => {
          this.activeRecord = recordDetails.data;
        });
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
    font-size: 2em;
  }
}
</style>
