<template>
  <div>
    <h1>Select Character</h1>
    <div class="character-list">
      <div v-for="character in characters" :key="character.name">
        <button
          :disabled="selecting"
          class="character-button"
          @click="selectCharacter(character)"
        >
          {{ character.name }}
        </button>
      </div>
      <br />
      <br />
      <router-link to="/create-character">Create Character</router-link>
    </div>
    <img :src="coverImage" class="character-list-image" />
    <router-link to="/login">Log Out</router-link>
  </div>
</template>
<style scoped lang="scss">
.character-list {
  background-color: burlywood;
  border: solid 5px black;
  border-radius: 20px;
  padding: 15px;
  float: left;
  clear: both;
  position: absolute;
}
.character-button {
  width: 100px;
}
.character-list-image {
}
</style>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import router from "../router";

export default {
  data: () => {
    return {
      selecting: false,
      coverImage: require("../assets/start-screen.jpeg")
    };
  },
  computed: {
    ...mapGetters("characters", ["characters"])
  },
  methods: {
    ...mapActions("characters", ["select"]),
    selectCharacter(character) {
      this.selecting = true;
      this.coverImage = require("../assets/start-screen.gif");
      setTimeout(() => {
        this.select(character);
        router.push("/town");
      }, 3000);
    }
  },
  created: function() {
    this.select(undefined);
  }
};
</script>
