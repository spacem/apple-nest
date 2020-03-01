<template>
  <div>
    <h1>Chef</h1>
    <div class="messages">
      <div class="message">
        {{ message }}
      </div>
      <div class="actions">
        <button @click="talk()">Talk</button>
        <button @click="tryMakPie()">
          Ask For Pie
        </button>
        <div class="back-link">
          <router-link to="/town">Back to Town</router-link>
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
      message: "Hello I am the Chef. I can make pies if you give me apples."
    };
  },
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  },
  methods: {
    ...mapActions("characters", ["makePie"]),
    tryMakPie() {
      try {
        this.makePie();
        this.message = "Here you go... A delicious Apple Pie.";
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
