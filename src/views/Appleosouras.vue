<template>
  <div>
    <h1>Appleosouras NPC</h1>
    <div>
      Hello I am the Appleosouras. I will pay you if you feed me.
    </div>
    <div>
      {{ message }}
    </div>
    <div>
      <button @click="talk()">Talk</button>
    </div>
    <div>
      <button @click="tryToSellApple()">Feed an Apple</button>
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
  methods: {
    ...mapActions("characters", ["sellApple"]),
    tryToSellApple() {
      try {
        this.sellApple();
        this.message = "Yum.. Yum.. here is some money. Spend it wisely.";
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
