<template>
  <div class="row pt-3">
    <div class="about col-md-4" v-if="activeRecord">
      <div class="header neue-text text--primary">{{ activeRecord.game }}</div>
      <div class="sub-header text--secondary">{{ activeRecord.record }}</div>
      <div class="mt-5">Record Description</div>
      <h3 class="text--primary">{{ activeRecord.recordDescription || "N/A" }}</h3>
      <div class="mt-5">Submitted By</div>
      <h3 class="text--primary">{{ activeRecord.firstname }} {{ activeRecord.lastname }}</h3>
      <div class="mt-5">Notes</div>
      <h3 class="text--primary">{{ activeRecord.notes }}</h3>
      <div>
        <v-btn class="ma-2" text color="green lighten-2" @click="validateRecord(activeRecord._id.$oid, true)">
          <v-icon x-large class="mr-1">mdi-thumb-up</v-icon>{{ activeRecord.upVotes.$numberLong }}
        </v-btn>

        <v-btn class="ma-2" text color="red lighten-2" @click="validateRecord(activeRecord._id.$oid, false)">
          <v-icon x-large class="mr-1">mdi-thumb-down</v-icon>&nbsp;&nbsp;{{ activeRecord.downVotes.$numberLong }}
        </v-btn>
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
      activeRecord: null,
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
      const payload = { recordId: id, verify: verified };
      return Axios.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/rb-api-hvrjj/service/rb-api/incoming_webhook/add_rating', payload)
        .then((updatedRecord: any) => {
          this.activeRecord = updatedRecord.data;
        });
    },
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
</style>
