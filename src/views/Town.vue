<template>
  <div>
    <h1>Town</h1>
    <router-link to="/select-character">Switch Character</router-link>
    |
    <router-link to="/event-planner">Event Planner</router-link>
    |
    <router-link to="/blacksmith">Blacksmith</router-link>
    |
    <router-link to="/appleosouras">Appleosouras</router-link>
    |
    <router-link to="/storage">Storage</router-link>
    |
    <router-link to="/farm">Farm</router-link>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  }
};
</script>
