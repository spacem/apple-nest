<template>
  <div>
    <h1>Select Character</h1>
    <div class="character-list cool-links" v-if="!selecting">
      <div v-for="character in characters" :key="character.name">
        <button class="character-button" @click="selectCharacter(character)">
          {{ character.name }}
        </button>
      </div>
      <br />
      <br />
      <div>
        <router-link to="/create-character">Create Character</router-link>
      </div>
      <div>
        <router-link to="/">Log Out</router-link>
      </div>
    </div>
    <img v-if="!selecting" :src="coverImage" class="character-list-image" />
    <img v-if="selecting" :src="movingImage" class="character-list-image" />
    <img v-show="false" :src="movingImage" />
  </div>
</template>
<style scoped lang="scss">
.character-list {
  background-color: #462d0d;
  border: solid 5px black;
  border-radius: 20px;
  padding: 15px;
  float: left;
  clear: both;
  position: absolute;
}
.character-button {
  width: 12em;
  margin-bottom: 0.5em;
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
      coverImage: require("../assets/start-screen.jpeg"),
      movingImage: require("../assets/start-screen.gif")
    };
  },
  computed: {
    ...mapGetters("characters", ["characters"])
  },
  methods: {
    ...mapActions("characters", ["select"]),
    selectCharacter(character) {
      this.selecting = true;
      setTimeout(() => {
        this.select(character);
        router.push("/town");
      }, 3500);
    }
  },
  created: function() {
    this.select(undefined);
  }
};
</script>
