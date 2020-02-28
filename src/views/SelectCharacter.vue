<template>
  <div>
    <h1>Select Character</h1>
    <div v-for="character in characters" :key="character.name">
      <button @click="selectCharacter(character)">{{ character.name }}</button>
    </div>
    <router-link to="/login">Log Out</router-link> |
    <router-link to="/create-character">Create Character</router-link>
  </div>
</template>

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
