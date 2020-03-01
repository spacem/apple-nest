<template>
  <div>
    <div class="messages">
      <div class="message">
        {{ message }}
      </div>
      <div class="actions">
        <button @click="talk()">Talk</button>
        <button @click="tryToSellApple()">Feed an Apple</button>
        <button @click="tryToSellPie()">Feed a Pie</button>
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
      message: "Hello, I am the Appleosouras. I will pay you if you feed me."
    };
  },
  methods: {
    ...mapActions("characters", ["sellApple", "sellPie"]),
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
        this.message = "Pies are my favorite. Here, have some money.";
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
