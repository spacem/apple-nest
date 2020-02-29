<template>
  <div>
    <h1>Select Character</h1>
    <div class="character-list">
      <div v-for="character in characters" :key="character.name">
        <button class="character-button" @click="selectCharacter(character)">{{ character.name }}</button>
      </div>
      <br />
      <br />
      <router-link to="/create-character">Create Character</router-link>
    </div>
    <div class="character-list-image"></div>
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
}
.character-button {
  width: 100px;
}
.character-list-image {
  height: 400px;
  background-image: url("~@/assets/Trees1.jpeg");
  background-position: top;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import router from "../router";

export default {
  computed: {
    ...mapGetters("characters", ["characters"])
  },
  methods: {
    ...mapActions("characters", ["select"]),
    selectCharacter(character) {
      this.select(character);
      router.push("/town");
    }
  },
  created: function() {
    this.select(undefined);
  }
};
</script>
