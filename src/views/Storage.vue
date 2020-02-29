<template>
  <div>
    <h1>
      Storage<br />
      <small> {{ storage }} money in storage </small>
    </h1>
    <div class="messages">
      <div class="message">
        <div>{{ message }}</div>
      </div>
      <div class="actions">
        <button @click="talk()">Talk</button>
        <button @click="tryToStore()">Store Money</button>
        <button @click="tryToTake()">Take Money</button>
      </div>
    </div>
    <div class="image storage"></div>
    <router-link to="/town">Town</router-link>
  </div>
</template>
<style scoped lang="scss">
.storage {
  background-image: url("~@/assets/Storage.jpg");
}
</style>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import router from "../router";

export default {
  data: () => {
    return {
      message:
        "Hello I am the storage person. I will hold your things and share them with your other characters."
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
