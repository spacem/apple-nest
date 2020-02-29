<template>
  <div>
    <h1>Blacksmith NPC</h1>
    <div class="messages">
      <div class="message">
        {{ message }}
      </div>
      <div class="actions">
        <button @click="talk()">Talk</button>
        <button
          @click="tryMakeWeapon()"
          v-if="selectedCharacter && !selectedCharacter.weaponLevel"
        >
          Make a weapon
        </button>
        <button
          @click="tryUpgradeWeapon()"
          v-if="selectedCharacter && selectedCharacter.weaponLevel > 0"
        >
          Upgrade your weapon
        </button>
      </div>
    </div>
    <div class="image blacksmith"></div>
    <router-link to="/town">Town</router-link>
  </div>
</template>
<style scoped lang="scss">
.blacksmith {
  background-image: url("~@/assets/Blacksmith.jpg");
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
        "Hello I am the blacksmith. I can make weapons and enhance them. For a fee."
    };
  },
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  },
  methods: {
    ...mapActions("characters", ["makeWeapon", "upgradeWeapon"]),
    tryMakeWeapon() {
      try {
        this.makeWeapon();
        this.message =
          "Here you go... This weapon might be useful in the future.";
      } catch (err) {
        this.message = err.message;
      }
    },
    tryUpgradeWeapon() {
      try {
        const previousLevel = this.selectedCharacter.weaponLevel;
        this.upgradeWeapon();
        if (this.selectedCharacter.weaponLevel > previousLevel) {
          this.message = "You are getting stronger.";
        } else if (this.selectedCharacter.weaponLevel < previousLevel) {
          this.message =
            "Sorry... Your weapon actually got weaker. That was very unlucky.";
        } else {
          this.message =
            "Wow unlucky. Nothing happened. Sorry, no refunds. Better luck next time.";
        }
      } catch (err) {
        this.message = err.message;
      }
    },
    talk(character) {
      if (this.message === "Do you like weapons? I do.") {
        this.message =
          "If you have enough money I will be able to make you a weapon.";
      } else {
        this.message = "Do you like weapons? I do.";
      }
    }
  }
};
</script>
