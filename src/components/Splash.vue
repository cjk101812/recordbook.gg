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
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui odio omnis labore id asperiores
       animi minus eligendi impedit temporibus est rem deserunt soluta, et maxime? Laudantium est
       ratione quidem quae?
    </p>
    <div>
      <v-card
        class="mx-auto"
      >
        <v-card-text>
          <div>Call of Duty: Warzone</div>
          <p class="display-1 text--primary">
            Solos: Most Kills
          </p>
          <p>Most kills in a solos match. Video ferification required.</p>
          <div class="text--primary">
            Current Recordholder: N/A
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="accent"
          >
            Learn More
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        class="mx-auto mt-2"
      >
        <v-card-text>
          <div>Call of Duty: Warzone</div>
          <p class="display-1 text--primary">
            Solos: Most Kills
          </p>
          <p>Most kills in a solos match. Video ferification required.</p>
          <div class="text--primary">
            Current Recordholder: N/A
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="accent"
          >
            Learn More
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SplashPage extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-size: 4em;
}
</style>
