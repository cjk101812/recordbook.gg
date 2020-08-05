<template>
  <div class="about">
    <div class="header neue-text text--primary">{{ activeRecord.gameTitle }}</div>
    <div class="sub-header text--secondary">{{ activeRecord.record }}</div>
    <p class="text--primary">{{ activeRecord.recordDescription }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MockData from '@/fixtures/mock_records';

export default Vue.component('RecordPage', {
  data() {
    return {
      activeRecord: {},
      recordBook: MockData,
    };
  },
  mounted() {
    this.activeRecord = this.getActiveRecord(this.$route.params.id);
  },
  methods: {
    getActiveRecord(id: string) {
      console.log(id);
      return this.recordBook[Number(id) - 1];
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
