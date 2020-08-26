<template>
  <div class="hello">
    <div class="row">
      <div class="col-md-6">
        <div class="d-flex">
          <h1 class="primary--text neue-text col-md-12">Welcome to RecordBook.gg!</h1>
        </div>
        <p class="col-md-9 pt-0 text--primary">
          Find and submit records for your favorite video games like Call of Duty: Warzone, Fortnite,
          and many more! Sign up to start breaking records today!
        </p>
        <div class="col-md-12">
          <v-btn color="primary" large to="/new-record" v-if="$store.state.loggedInUserId">
            Submit a New Record
          </v-btn>
          <v-btn color="primary" large to="/login" v-if="!$store.state.loggedInUserId">
            Login to Submit a New Record
          </v-btn>
        </div>
      </div>
      <div class="col-md-6">
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
        >
          <v-carousel-item
            v-for="(slide, i) in images"
            :key="i"
            :src="slide.url"
          >
            <div class="neue-text slide-header">{{ slide.header }}</div>
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
    <div>
      <div class="trending pt-2 pb-2 text--primary">What's Trending</div>
      <div class="empty-records col-md-12 text-center" v-if="recordBook.length === 0">
        <span> Uh oh. Nothing here yet.</span><br />
        <span class="display-4"><v-icon x-large color="secondary">far fa-frown-open</v-icon></span>
      </div>
      <div v-if="recordBook.length > 0">
        <v-card v-for="record in recordBook" v-bind:key="record._id.$oid" class="mx-auto mb-2">
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Axios from "axios";
import MockData from '@/fixtures/mock_records';

export default Vue.component('SplashComponent', {
  data() {
    return {
      recordBook: [],
      images: [
        { url: '/assets/cod.jpg', header: 'Warzone Records' },
        { url: '/assets/fortnite.jpg', header: 'Fortnite Records' },
        { url: '/assets/fall_guys.jpg', header: 'Fall Guys!' }
      ],
    };
  },
  mounted() {
    this.getRecords();
  },
  methods: {
    getRecords(): void {
      Axios.get(
        "https://webhooks.mongodb-realm.com/api/client/v2.0/app/rb-api-hvrjj/service/rb-api/incoming_webhook/get_official_records?limit=2"
      ).then((records: any) => {
        this.recordBook = records.data;
      });
    },
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
.v-window {
  -webkit-clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
  clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
}
.slide-header {
  position: absolute;
  font-size: 5em;
  bottom: 10px;
  right: 20px;
}
.trending {
  font-size: 2em;
}
</style>
