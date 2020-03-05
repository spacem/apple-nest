<template>
  <div>
    <div class="messages">
      <div class="message">
        {{ message }}
      </div>
      <div class="actions">
        <button v-if="!buying" @click="talk()">Talk</button>
        <button v-if="!buying" @click="startToBuy()">Buy a Seed</button>
        <button v-if="buying" @click="tryToBuySeed()">Normal Seed</button>
        <button v-if="buying" @click="tryToBuyMegaSeed()">
          Mega-Seed
        </button>
        <button v-if="buying" @click="tryToBuyLegendarySeed()">
          Legendary-Seed
        </button>
        <div class="back-link">
          <router-link to="/farm">Back to Farm</router-link>
        </div>
      </div>
    </div>
    <div class="image farmer"></div>
  </div>
</template>
<style scoped lang="scss">
.farmer {
  background-image: url("~@/assets/Farmer.jpg");
}
</style>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import router from "../router";

export default {
  data: () => {
    return {
      message: "Hello I am the farmer. You can buy seeds from me.",
      buying: false
    };
  },
  methods: {
    ...mapActions("characters", ["buySeed", "buyMegaSeed", "buyLegendarySeed"]),
    startToBuy() {
      this.buying = true;
      this.message = "What sort of seed do you want?";
    },
    tryToBuySeed() {
      try {
        this.buySeed();
        this.message = "Here you go. Have fun farming";
        this.buying = false;
      } catch (err) {
        this.message = err.message;
      }
    },
    tryToBuyMegaSeed() {
      try {
        this.buyMegaSeed();
        this.message =
          "Those things take several minutes to grow but it is worth the wait";
        this.buying = false;
      } catch (err) {
        this.message = err.message;
      }
    },
    tryToBuyLegendarySeed() {
      try {
        this.buyLegendarySeed();
        this.message =
          "You might want to make another character to use while you wait for that to grow. It will take a whole hour!";
        this.buying = false;
      } catch (err) {
        this.message = err.message;
      }
    },
    talk(character) {
      if (this.message === "Do you like apples? I do.") {
        this.message =
          "You can only plant one type of seed at a time per character... but you can make many characters.";
      } else {
        this.message = "Do you like apples? I do.";
      }
    }
  }
};
</script>
