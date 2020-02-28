<template>
  <div>
    <h1>Farmer NPC</h1>
    <div>
      Hello I am the farmer. If you had gold you could buy seeds from me.
    </div>
    <div>
      {{ message }}
    </div>
    <div>
      <button @click="talk()">Talk</button>
    </div>
    <div>
      <button @click="tryToBuySeed()">Buy a Seed</button>
    </div>
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
      message: ""
    };
  },
  methods: {
    ...mapActions("characters", ["buySeed"]),
    tryToBuySeed() {
      try {
        this.buySeed();
        this.message = "Have fun farming";
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
