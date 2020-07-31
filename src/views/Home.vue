<template>
  <div class="home">
    <HelloWorld msg="changing input"/>
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: 1em;
  font-size: 2em;
  font-weight: bold;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
