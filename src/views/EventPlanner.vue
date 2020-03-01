<template>
  <div>
    <h1>Event Planner</h1>
    <div class="messages">
      <div class="message">
        {{ message }}
      </div>
      <div class="actions">
        <button @click="talk()">Talk</button>
        <button @click="collectReward()">Collect Reward</button>
        <div class="back-link">
          <router-link to="/town">Back to Town</router-link>
        </div>
      </div>
    </div>
    <div class="image eventplanner"></div>
  </div>
</template>
<style scoped lang="scss">
.eventplanner {
  background-image: url("~@/assets/EventPlanner.jpg");
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
        "Hello I am the event planner. We have a login event. I will give you free money every hour!"
    };
  },
  methods: {
    ...mapActions("characters", ["collectEventReward"]),
    collectReward() {
      try {
        this.collectEventReward();
        this.message = "Hope you enjoyed the event";
      } catch (err) {
        this.message = err.message;
      }
    },
    talk(character) {
      if (this.message === "Do you like rewards? I do.") {
        this.message = "If you need more money you should sell some apples.";
      } else {
        this.message = "Do you like rewards? I do.";
      }
    }
  }
};
</script>
