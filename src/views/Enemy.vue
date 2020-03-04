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
      playerHp: 1000,
      attackIndex: 0,
      attackFactor: 1,
      enemyRank: 2,
      enemyHurt: 0
    };
  },
  computed: {
    ...mapGetters("characters", ["selectedCharacter"]),
    enemyHp() {
      return Math.max(0, Math.pow(10, this.enemyRank + 1) - this.enemyHurt);
    },
    enemyDps() {
      return Math.pow(10, this.enemyRank + 1);
    }
  },
  methods: {
    ...mapActions("characters", ["deafeatEnemy"]),
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
                // attack player with crit
                const hpLost = Math.ceil(
                  (this.attackFactor * this.enemyDps * 2) /
                    this.selectedCharacter.armourLevel
                );
                this.playerHp -= hpLost;
                this.message = `You were attacked with a critical hit and lost ${hpLost} hp.`;
              } else if (roll > 0.5) {
                // attack player
                const hpLost = Math.ceil(
                  (this.attackFactor * this.enemyDps) /
                    this.selectedCharacter.armourLevel
                );
                this.playerHp -= hpLost;
                this.message = `You were attacked and lost ${hpLost} hp.`;
              } else if (roll > 0.4) {
                // attack enemy with crit
                const hpLost = this.selectedCharacter.weaponLevel * 10;
                this.enemyHurt += hpLost;
                this.message = `You hit the enemy with a critical hit and dealt ${hpLost} damage.`;
              } else {
                // attack enemy
                const hpLost = this.selectedCharacter.weaponLevel * 5;
                this.enemyHurt += hpLost;
                this.message = `You hit the enemy and dealt ${hpLost} damage.`;
              }

              if (this.playerHp <= 0) {
                this.playerHp = 0;
                this.isFinished = true;
                this.message += " You lost... Try upgrading your equipment.";
                this.stopTimer();
              } else if (this.enemyHp <= 0) {
                this.isFinished = true;
                const previousMoney = this.selectedCharacter.bag.money;
                this.deafeatEnemy(1);
                const earnings =
                  this.selectedCharacter.bag.money - previousMoney;
                this.message += ` You have won the battle and earned ${enemyRank} money.`;
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
