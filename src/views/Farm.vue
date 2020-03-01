<template>
  <div>
    <h1>Farm</h1>
    <div>
      <router-link to="/farmer">Farmer</router-link>
      |
      <router-link to="/plot">Plot</router-link>
      |
      <router-link to="/town">Town</router-link>
    </div>
    <div class="image farm"></div>
  </div>
</template>
<style scoped lang="scss">
.farm {
  background-image: url("~@/assets/Farm.jpg");
}
</style>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import router from "../router";

export default {
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  }
};
</script>
