<template>
  <div>
    <h1>Storage NPC</h1>
    <div>{{ storage }} money in storage</div>
    <div>
      Hello I am the storage person. I will hold your things and share them with
      your other characters.
    </div>
    <div>{{ message }}</div>
    <div>
      <button @click="talk()">Talk</button>
    </div>
    <div>
      <button @click="tryToStore()">Store Money</button>
    </div>
    <div>
      <button @click="tryToTake()">Take Money</button>
    </div>
    <router-link to="/town">Town</router-link>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import router from "../router";

export default {
  data: () => {
    return {
      message: ""
    };
  },
  computed: {
    ...mapGetters("characters", ["storage"])
  },
  methods: {
    ...mapActions("characters", ["storeMoney", "takeMoney"]),
    tryToStore() {
      this.storeMoney();
      this.message = "I will look after it for you";
    },
    tryToTake() {
      this.takeMoney();
      this.message = "Here.. Take it all";
    },
    talk(character) {
      if (
        this.message === "If you make more characters you can grow more apples"
      ) {
        this.message =
          "Do not worry. I will only give money to your characters.";
      } else {
        this.message = "If you make more characters you can grow more apples";
      }
    }
  }
};
</script>
