<template>
  <div>
    <div class="messages">
      <div class="message">
        {{ message }}
      </div>
      <div class="actions">
        <button v-if="!startFeed" @click="talk()">Talk</button>
        <button v-if="!startFeed" @click="feed()">Feed</button>
        <button v-if="startFeed" @click="cancelFeed()">Nothing</button>
        <button v-if="startFeed" @click="tryToSellApple()">Apple</button>
        <button v-if="startFeed" @click="tryToSellPie()">Pie</button>
        <button v-if="startFeed" @click="tryToSellPizza()">Pizza</button>
        <div class="back-link">
          <router-link to="/town">Back to Town</router-link>
        </div>
      </div>
    </div>
    <div class="image appleosouras"></div>
  </div>
</template>
<style scoped lang="scss">
.appleosouras {
  background-image: url("~@/assets/Appleosouras.jpg");
}
</style>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import router from "../router";

export default {
  data: () => {
    return {
      message: "Hello, I am the Appleosouras. I will pay you if you feed me.",
      startFeed: false
    };
  },
  methods: {
    ...mapActions("characters", ["sellApple", "sellPie", "sellPizza"]),
    feed() {
      this.startFeed = true;
      this.message = "What have you got that I can eat. I will pay you!";
    },
    cancelFfeed() {
      this.startFeed = false;
      this.message = "Please come back when you have food for me.";
    },
    tryToSellApple() {
      try {
        this.sellApple();
        this.message = "Yum.. Yum.. here is some money. Spend it wisely.";
      } catch (err) {
        this.message = err.message;
      }
    },
    tryToSellPie() {
      try {
        this.sellPie();
        this.message = "I love Pie. Here, have some money.";
      } catch (err) {
        this.message = err.message;
      }
    },
    tryToSellPizza() {
      try {
        this.sellPizza();
        this.message = "Pizza is my favorite. Here, have some money.";
      } catch (err) {
        this.message = err.message;
      }
    },
    talk(character) {
      if (this.message === "Do you like apples? I do.") {
        this.message = "I am done talking - go farm me some apples.";
      } else {
        this.message = "Do you like apples? I do.";
      }
    }
  }
};
</script>
