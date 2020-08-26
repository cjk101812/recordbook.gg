<template>
  <div class="row pt-3">
    <div class="about col-md-4" v-if="activeRecord">
      <div class="header neue-text text--primary">{{ activeRecord.game.title }}</div>
      <div class="sub-header text--secondary">{{ activeRecord.record.title }}</div>
      <div class="mt-5">Record Description</div>
      <h3 class="text--primary">{{ activeRecord.record.description || "N/A" }}</h3>
      <div class="mt-5">Submitted By</div>
      <h3 class="text--primary">{{ activeRecord.userDetails.firstName }} {{ activeRecord.userDetails.lastName }}</h3>
      <div class="mt-5">Notes</div>
      <h3 class="text--primary">{{ activeRecord.notes }}</h3>
      <div class="mt-5">Game Description</div>
      <h3 class="text--primary">{{ activeRecord.game.description || "Not Available" }}</h3>
      <div class="mt-10" v-if="!activeRecord.official">
        <v-alert
          border="top"
          elevation="2"
          type="secondary"
        >
          We need your help to verify this record! Watch the VOD and vote below on whether the record is legit or not.
          <div class="already-voted mt-4" v-if="!canVote($store.state.loggedInUserId)">
            <v-icon class="mr-1">fas fa-vote-yea</v-icon>&nbsp;&nbsp;
            You've already voted on this record.
          </div>
          <div v-if="$store.state.loggedInUserId">
            <v-btn :disabled="!canVote($store.state.loggedInUserId)" class="ma-2" text color="green lighten-2" @click="validateRecord(activeRecord._id.$oid, true)">
              <v-icon class="mr-1">mdi-thumb-up</v-icon>&nbsp;&nbsp;
              <span v-if="activeRecord.upVotes">{{ activeRecord.upVotes.length }}</span>
              <span v-if="!activeRecord.upVotes">0</span>
            </v-btn>
            <v-btn :disabled="!canVote($store.state.loggedInUserId)" class="ma-2" text color="red lighten-2" @click="validateRecord(activeRecord._id.$oid, false)">
              <v-icon class="mr-1">mdi-thumb-down</v-icon>&nbsp;&nbsp;
              <span v-if="activeRecord.downVotes">{{ activeRecord.downVotes.length }}</span>
              <span v-if="!activeRecord.downVotes">0</span>
            </v-btn>
          </div>
          <div v-if="!$store.state.loggedInUserId">
            <v-btn class="ma-2" color="error" to="/login">
              Login to Validate Records
            </v-btn>
          </div>
        </v-alert>
      </div>
    </div>
    <div class="vod col-md-8">
      <iframe
        :src="sourceUrl"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true">
      </iframe>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MockData from '@/fixtures/mock_records';
import Axios from 'axios';

export default Vue.component('RecordPage', {
  data() {
    return {
      activeRecord: {
        upVotes: [],
        downVotes: []
      },
      sourceUrl: "",
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
          if (recordDetails.data.link.length === 9){
            this.sourceUrl = "https://player.twitch.tv/?video=" + recordDetails.data.link + "&html5&parent=localhost&autoplay=false";
          } else {
            this.sourceUrl = "https://player.twitch.tv/?video=" + recordDetails.data.link + "&html5&parent=localhost&autoplay=false";
          }
        });
    },
    validateRecord(id: string, verified: boolean) {
      const payload = { recordId: id, verify: verified, userId: this.$store.state.loggedInUserId };
      return Axios.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/rb-api-hvrjj/service/rb-api/incoming_webhook/add_rating', payload)
        .then((updatedRecord: any) => {
          this.activeRecord = updatedRecord.data;
        });
    },
    canVote(id: string) {
      const up = this.activeRecord.upVotes || [];
      const down = this.activeRecord.downVotes || [];
      const upVote = up.filter(vote => vote === id);
      const downVote = down.filter(vote => vote === id);
      if (downVote.length > 0 || upVote.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  },
});
</script>

<style scoped lang="scss">
.about, .vod {
  padding: 2em;
  font-weight: bold;
  .header {
    font-size: 4em;
  }
  .sub-header {
    font-size: 2em;
  }
  
  iframe {
    width: 100%;
  }
}
.vod {
  max-width:100%;
  max-height:80vh;
  width:100%;
  margin:0 auto;
  
  iframe {
    width:100%;
    height:100%;
  }
}
.already-voted {
  font-size: 1.2em;
  color: #f2f2f2;
}
</style>
