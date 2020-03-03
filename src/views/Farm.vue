<template>
  <div v-if="!moving">
    <h1>Farm</h1>
    <div class="cool-links">
      <router-link to="/farmer">Farmer</router-link>
      <router-link to="/plot">Plot</router-link>
      <a href="#" @click="moveToTown()">Town</a>
    </div>
    <div class="image farm"></div>
  </div>
  <div v-else>
    <h1>
      ...
      <br />
      <small>
        Moving to Town
      </small>
    </h1>
    <div class="image travel"></div>
  </div>
</template>
<style scoped lang="scss">
.farm {
  background-image: url("~@/assets/Farm.jpg");
}
.travel {
  background-image: url("~@/assets/Loading.jpg");
  margin-top: 20px;
  width: 100%;
  height: 450px;
  background-size: contain;
}
</style>
<script>
import router from "../router";

export default {
  data: () => {
    return {
      moving: false
    };
  },
  methods: {
    moveToTown() {
      this.moving = true;
      setTimeout(() => {
        router.push("/town");
      }, 2500);
    }
  }
};
</script>
