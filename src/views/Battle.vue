<template>
  <div>
    <div class="messages" v-if="!isBattleStarting">
      <div class="message">{{ message }}</div>
      <div class="actions">
        <button @click="talk()">Talk</button>
        <button @click="startBattle()">Battle</button>
        <div class="back-link">
          <router-link to="/city">Back to City</router-link>
        </div>
      </div>
    </div>
    <div class="image battle"></div>
  </div>
</template>
<style scoped lang="scss">
.battle {
  background-image: url("~@/assets/Battle.jpg");
}
</style>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import router from "../router";

export default {
  data: () => {
    return {
      message: "You want to battle? I hope you have what it takes",
      isBattleStarting: false
    };
  },
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  },
  methods: {
    ...mapActions("characters", []),
    talk(character) {
      if (this.message === "Do you like to fight? I do.") {
        this.message =
          "Don't worry if you get defeated you can just try again later.";
      } else {
        this.message = "Do you like to fight? I do.";
      }
    },
    startBattle() {
      if (this.message === "You need a weapon and armour to fight.") {
        this.message = "Go and talk to the blacksmith";
      } else if (
        !this.selectedCharacter.armourLevel ||
        !this.selectedCharacter.weaponLevel
      ) {
        this.message = "You need a weapon and armour to fight.";
      } else {
        this.message = "Get ready for battle!";
        setTimeout(() => {
          this.isBattleStarting = true;
          setTimeout(() => {
            router.push("/enemy");
          }, 1000);
        }, 1000);
      }
    }
  }
};
</script>
