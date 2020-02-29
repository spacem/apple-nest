<template>
  <div>
    <h1>Create Character</h1>
    <div>
      {{ message }}
    </div>
    <div>
      <input
        v-model="characterName"
        placeholder="Character Name"
        v-on:keyup.enter="doCreate(characterName)"
      />
      <button @click="doCreate(characterName)">Create Character</button>
    </div>
    <router-link to="/select-character">Cancel</router-link>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";
import router from "../router";

export default {
  data: () => {
    return {
      characterName: "",
      message: ""
    };
  },
  methods: {
    ...mapActions("characters", ["create"]),
    doCreate(name) {
      try {
        this.create({ name: name });
        router.push("/select-character");
      } catch (err) {
        this.message = err.message;
      }
    }
  }
};
</script>
