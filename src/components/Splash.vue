<template>
  <div class="hello">
    <div class="d-flex">
      <h1 class="primary--text neue-text col-md-9">Welcome to RecordBook.gg!</h1>
      <div class="col-md-3 text-right align-self-center">
        <v-btn small color="primary" to="/new-record">
          Submit a New Record
        </v-btn>
      </div>
    </div>
    <p class="col-md-9 pt-0 text--primary">
      Find and submit records for your favorite video games like Call of Duty: Warzone, Fortnite,
      and many more! Sign up to start breaking records today!
    </p>
    <div>
      <v-card v-for="record in recordBook" v-bind:key="record._id" class="mx-auto mb-2">
        <v-card-text>
          <div>{{ record.gameTitle }}</div>
          <p class="display-1 text--primary">
            {{ record.record }}
          </p>
          <p>{{ record.recordDescription }}</p>
          <div class="text--primary">Current Recordholder: {{ record.recordHolder || "N/A" }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="accent" v-on:click="viewRecord(record._id)">
            Learn More
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MockData from '@/fixtures/mock_records';

export default Vue.component('SplashComponent', {
  data() {
    return {
      recordBook: MockData,
    };
  },
  methods: {
    viewRecord(recordId: string) {
      this.$router.push({ path: `/record/${recordId}` });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-size: 4em;
}
</style>
