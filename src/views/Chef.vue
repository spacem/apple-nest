<template>
  <div>
    <div class="messages">
      <div class="message">
        {{ message }}
      </div>
      <div class="actions">
        <button @click="talk()">Talk</button>
        <button @click="tryMakPie()">
          Make Pie
        </button>
        <button @click="tryMakPizza()">
          Make Pizza
        </button>
        <div class="back-link">
          <router-link to="/city">Back to the City</router-link>
        </div>
      </div>
    </div>
    <div class="image chef"></div>
  </div>
</template>
<style scoped lang="scss">
.chef {
  background-image: url("~@/assets/Chef.jpg");
}
</style>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import router from "../router";

export default {
  data: () => {
    return {
      message: "Hello I am the Chef. I can make food if you give me apples."
    };
  },
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  },
  methods: {
    ...mapActions("characters", ["makePie", "makePizza"]),
    tryMakPie() {
      try {
        this.makePie();
        this.message = "Here you go... A delicious Apple Pie.";
      } catch (err) {
        this.message = err.message;
      }
    },
    tryMakPizza() {
      try {
        this.makePizza();
        this.message =
          "I bet you never heard of an apple pizza. It takes lots of apples to make.";
      } catch (err) {
        this.message = err.message;
      }
    },
    talk(character) {
      if (this.message === "Do you like Apple Pie? Everyone does.") {
        this.message = "My Apple Pie recipe uses up lots of apples.";
      } else {
        this.message = "Do you like Apple Pie? Everyone does.";
      }
    }
  }
};
</script>
