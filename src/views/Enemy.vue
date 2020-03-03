<template>
  <div>
    <div class="cool-links" style="float:left; position:absolute">
      <router-link to="/city">Quit Battle</router-link>
    </div>
    <div>Your HP: {{ playerHp }}</div>
    <div>Enemy HP: {{ enemyHp }}</div>
    <div class="messages" v-if="message">
      <div class="message">{{ message }}</div>
      <div class="actions" v-if="isFinished">
        <div class="back-link">
          <router-link to="/city">Back to City</router-link>
        </div>
      </div>
    </div>
    <div
      v-if="!isFinished"
      class="image enemy"
      :class="{ ['show-enemy']: showEnemy }"
    ></div>
  </div>
</template>
<style scoped lang="scss">
.enemy {
  background-image: url("~@/assets/Enemy.jpg");
  opacity: 0;
  transition: opacity 0.8s linear;
}
.show-enemy {
  opacity: 1;
}
</style>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions, mapState } from "vuex";
import router from "../router";

export default {
  data: () => {
    return {
      message: "",
      isFinished: false,
      intervalId: undefined,
      showEnemy: false,
      enemyHp: 100,
      playerHp: 100,
      attackIndex: 0,
      attackFactor: 1
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
    stopTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
    startTimer() {
      this.intervalId = setInterval(() => {
        const powerUpRoll = Math.random();
        this.attackIndex++;
        if (this.showEnemy && this.attackIndex > 4 && powerUpRoll > 0.5) {
          this.attackIndex = 0;
          this.showEnemy = true;
          this.attackFactor++;
          this.message =
            "The enemy has powered up it's attack making it stronger";
        } else {
          this.showEnemy = !this.showEnemy || this.message;
          if (this.showEnemy) {
            this.message = "";
          } else {
            setTimeout(() => {
              const roll = Math.random();
              if (roll > 0.8) {
                const hpLost =
                  (this.attackFactor * 200) /
                  this.selectedCharacter.armourLevel;
                this.playerHp -= hpLost;
                this.message = `You were attacked with a critical hit and lost ${hpLost} hp.`;
              } else if (roll > 0.5) {
                const hpLost =
                  (this.attackFactor * 100) /
                  this.selectedCharacter.armourLevel;
                this.playerHp -= hpLost;
                this.message = `You were attacked and lost ${hpLost} hp.`;
              } else if (roll > 0.4) {
                const hpLost = this.selectedCharacter.weaponLevel * 2;
                this.enemyHp -= hpLost;
                this.message = `You hit the enemy with a critical hit and dealt ${hpLost} damage.`;
              } else {
                const hpLost = this.selectedCharacter.weaponLevel;
                this.enemyHp -= hpLost;
                this.message = `You hit the enemy and dealt ${hpLost} damage.`;
              }

              if (this.playerHp <= 0) {
                this.playerHp = 0;
                this.isFinished = true;
                this.message += " You lost... Try upgrading your equipment.";
                this.stopTimer();
              } else if (this.enemyHp <= 0) {
                this.enemyHp = 0;
                this.isFinished = true;
                this.message += " You have won the battle.";
                this.stopTimer();
              }
            }, 300);
          }
        }
      }, 3000);
    }
  },
  created: function() {
    this.startTimer();
  },
  destroyed: function() {
    this.stopTimer();
  }
};
</script>
