<template>
  <div v-if="!moving">
    <h1>City</h1>
    <div class="cool-links">
      <router-link to="/city/chef">Chef</router-link>
      <router-link to="/city/blacksmith">Blacksmith</router-link>
      <router-link to="/city/battle">Battle</router-link>
      <a href="#" @click="moveToTown()">Town</a>
    </div>
    <div class="image city"></div>
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
.city {
  background-image: url("~@/assets/City.jpg");
}
.travel {
  background-image: url("~@/assets/CityLoading.jpg");
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
