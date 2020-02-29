<template>
  <div>
    <h1>Farmer NPC</h1>
    <div class="messages">
      <div class="message">
        {{ message }}
      </div>
      <div class="actions">
        <button @click="talk()">Talk</button>
        <button @click="tryToBuySeed()">Buy a Seed</button>
        <button @click="tryToBuyMegaSeed()">Buy a Mega-Seed</button>
      </div>
    </div>
    <div class="image farmer"></div>
    <router-link to="/farm">Farm</router-link>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import router from "../router";

export default {
  data: () => {
    return {
      message:
        "Hello I am the farmer. If you had money you could buy seeds from me."
    };
  },
  methods: {
    ...mapActions("characters", ["buySeed", "buyMegaSeed"]),
    tryToBuySeed() {
      try {
        this.buySeed();
        this.message = "Here you go. Have fun farming";
      } catch (err) {
        this.message = err.message;
      }
    },
    tryToBuyMegaSeed() {
      try {
        this.buyMegaSeed();
        this.message =
          "Those things take a while to grow but it is worth the wait";
      } catch (err) {
        this.message = err.message;
      }
    },
    talk(character) {
      if (this.message === "Do you like apples? I do.") {
        this.message = "Growing apples can be a lot of fun.";
      } else {
        this.message = "Do you like apples? I do.";
      }
    }
  }
};
</script>
