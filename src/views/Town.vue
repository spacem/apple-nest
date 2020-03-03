<template>
  <div v-if="!moving">
    <h1>Town</h1>
    <div class="cool-links">
      <router-link to="/event-planner">Event Planner</router-link>
      <router-link to="/blacksmith">Blacksmith</router-link>
      <router-link to="/appleosouras">Appleosouras</router-link>
      <router-link to="/chef">Chef</router-link>
      <router-link to="/storage">Storage</router-link>
      <a href="#" @click="moveToFarm()">Farm</a>
    </div>
    <div class="image town"></div>
  </div>
  <div v-else>
    <h1>
      ...<br />
      <small>Moving to the Farm</small>
    </h1>
    <div class="image travel"></div>
  </div>
</template>
<style scoped lang="scss">
.town {
  background-image: url("~@/assets/Town.jpg");
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
    moveToFarm() {
      this.moving = true;
      setTimeout(() => {
        router.push("/farm");
      }, 2500);
    }
  }
};
</script>
