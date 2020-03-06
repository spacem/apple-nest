<template>
  <div class="cool-links">
    <img :src="coverImage" />
    <div>
      <router-link to="/select-character">Login</router-link>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data: () => {
    return {
      selecting: false,
      coverImage: require("../assets/AppleNest.jpg")
    };
  },
  methods: {
    ...mapActions("characters", ["select"])
  },
  created: function() {
    this.select(undefined);
  }
};
</script>
