<template>
  <div>
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
          Make a Weapon
        </button>
        <button
          @click="tryMakeArmour()"
          v-if="selectedCharacter && !selectedCharacter.armourLevel"
        >
          Make Armour
        </button>
        <button
          @click="tryUpgradeWeapon()"
          v-if="selectedCharacter && selectedCharacter.weaponLevel > 0"
        >
          Upgrade Weapon
        </button>
        <button
          @click="tryUpgradeArmour()"
          v-if="selectedCharacter && selectedCharacter.armourLevel > 0"
        >
          Upgrade Armour
        </button>
        <div class="back-link">
          <router-link to="/city">Back to the City</router-link>
        </div>
      </div>
    </div>
    <div class="image blacksmith"></div>
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
    ...mapActions("characters", [
      "makeWeapon",
      "upgradeWeapon",
      "makeArmour",
      "upgradeArmour"
    ]),
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
    tryMakeArmour() {
      try {
        this.makeArmour();
        this.message =
          "Here you go... This armour might be useful in the future.";
      } catch (err) {
        this.message = err.message;
      }
    },
    tryUpgradeArmour() {
      try {
        const previousLevel = this.selectedCharacter.armourLevel;
        this.upgradeArmour();
        if (this.selectedCharacter.armourLevel > previousLevel) {
          this.message =
            "You are getting stronger. Level " +
            this.selectedCharacter.armourLevel +
            " now!";
        } else if (this.selectedCharacter.armourLevel < previousLevel) {
          this.message =
            "Sorry... Your armour actually got weaker. That was very unlucky.";
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
          "If you have enough money I will be able to make you a weapon or some armour.";
      } else {
        this.message = "Do you like weapons? I do.";
      }
    }
  }
};
</script>
