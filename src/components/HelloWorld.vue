<template>
  <div class="hello">
    <p class="primary--text">Welcome to RecordBook.gg!</p>
    <router-link class="nav-link" to="/new-record">
      <div class="my-2">
        <v-btn small color="primary">Primary</v-btn>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button {
}
</style>
