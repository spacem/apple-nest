<template>
  <div v-if="!moving">
    <h1>Town</h1>
    <div class="cool-links">
      <router-link to="/town/event-planner">Event Planner</router-link>
      <router-link to="/town/appleosouras">Appleosouras</router-link>
      <router-link to="/town/storage">Storage</router-link>
      <a href="#" @click="moveToFarm()">Farm</a>
      <a href="#" @click="moveToCity()">City</a>
    </div>
    <div class="image town"></div>
  </div>
  <div v-else>
    <h1>
      ...<br />
      <small>Moving to the {{ moving }}</small>
    </h1>
    <div v-if="moving == 'Farm'" class="image farm-travel"></div>
    <div v-if="moving == 'City'" class="image city-travel"></div>
  </div>
</template>
<style scoped lang="scss">
.town {
  background-image: url("~@/assets/Town.jpg");
}
.farm-travel {
  background-image: url("~@/assets/Loading.jpg");
  margin-top: 20px;
  width: 100%;
  height: 450px;
  background-size: contain;
}
.city-travel {
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
      moving: undefined
    };
  },
  methods: {
    moveToFarm() {
      this.moving = "Farm";
      setTimeout(() => {
        router.push("/farm");
      }, 2500);
    },
    moveToCity() {
      this.moving = "City";
      setTimeout(() => {
        router.push("/city");
      }, 2500);
    }
  }
};
</script>
