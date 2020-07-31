<template>
  <div class="home">
    <SplashPage/>
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: 1em;
  font-weight: bold;
}
</style>

<script>
// @ is an alias to /src
import SplashPage from '@/components/Splash.vue';

export default {
  name: 'Home',
  components: {
    SplashPage,
  },
};
</script>
