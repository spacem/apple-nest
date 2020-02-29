<template>
  <div>
    <h1>Town</h1>
    <div>
      <router-link to="/event-planner">Event Planner</router-link>
      |
      <router-link to="/blacksmith">Blacksmith</router-link>
      |
      <router-link to="/appleosouras">Appleosouras</router-link>
      |
      <router-link to="/chef">Chef</router-link>
      |
      <router-link to="/storage">Storage</router-link>
      |
      <router-link to="/farm">Farm</router-link>
    </div>
    <div class="image town"></div>
    <div>
      <router-link to="/select-character">Switch Character</router-link>
    </div>
  </div>
</template>
<style scoped lang="scss">
.town {
  background-image: url("~@/assets/Town.jpg");
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  }
};
</script>
