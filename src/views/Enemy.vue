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
      :class="{ ['show-enemy']: showEnemy, [imageClass]: true }"
    ></div>
  </div>
</template>
<style scoped lang="scss">
.enemy {
  opacity: 0;
  transition: opacity 0.8s linear;
}
.caterpillar {
  background-image: url("~@/assets/Caterpillar.jpg");
}
.snake {
  background-image: url("~@/assets/Snake.jpg");
}
.aliens {
  background-image: url("~@/assets/Aliens.jpg");
}
.robot {
  background-image: url("~@/assets/Robot.jpg");
}
.dragon {
  background-image: url("~@/assets/Dragon.jpg");
}
.demon {
  background-image: url("~@/assets/Demon.jpg");
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
      enemyRank: 0,
      enemyHurt: 0
    };
  },
  computed: {
    ...mapGetters("characters", ["selectedCharacter"]),
    enemyHp() {
      return Math.max(
        Math.ceil(Math.pow(5, this.enemyRank + 1) / 100) * 100 - this.enemyHurt,
        0
      );
    },
    enemyDps() {
      return Math.pow(5, this.enemyRank + 1);
    },
    imageClass() {
      switch (this.enemyRank) {
        case 1:
          return "caterpillar";
        case 2:
          return "snake";
        case 3:
          return "aliens";
        case 4:
          return "robot";
        case 5:
          return "dragon";
        default:
          return "demon";
      }
    }
  },
  methods: {
    ...mapActions("characters", ["deafeatEnemy", "payForBattle"]),
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
        if (this.showEnemy && this.attackIndex > 6 && powerUpRoll > 0.5) {
          this.attackIndex = 0;
          this.showEnemy = true;
          this.attackFactor++;
          this.message =
            "The enemy has powered up. It now does stronger attacks.";
        } else {
          this.showEnemy = !this.showEnemy || this.message;
          if (this.showEnemy) {
            this.message = "";
          } else {
            setTimeout(() => {
              const roll = Math.random();
              let critMessage = "";
              let critFactor = 1;

              if (roll > 0.8 || roll < 0.1) {
                critFactor++;
                critMessage = " with a critical hit";
              }

              if (roll > 0.5) {
                // attack player
                const hpLost = Math.ceil(
                  (Math.pow(this.attackFactor + 0.2, 2) *
                    this.enemyDps *
                    critFactor) /
                    this.selectedCharacter.armourLevel
                );
                this.playerHp -= hpLost;
                this.message = `You were attacked${critMessage} and lost ${hpLost} hp.`;
              } else {
                // attack enemy
                const hpLost = Math.ceil(
                  this.selectedCharacter.weaponLevel * 10 * critFactor
                );
                this.enemyHurt += hpLost;
                this.message = `You hit the enemy${critMessage} and dealt ${hpLost} damage.`;
              }

              if (this.playerHp <= 0) {
                this.playerHp = 0;
                this.isFinished = true;
                this.message += " You lost... Try upgrading your equipment.";
                this.stopTimer();
              } else if (this.enemyHp <= 0) {
                this.isFinished = true;
                const previousApples = this.selectedCharacter.bag.apples;
                this.deafeatEnemy(this.enemyRank);
                const earnings =
                  this.selectedCharacter.bag.apples - previousApples;
                this.message += ` You have won the battle and earned ${earnings} apples.`;
                this.stopTimer();
              }
            }, 300);
          }
        }
      }, 3000);
    }
  },
  created: function() {
    this.enemyRank = Number(this.$route.params.enemyRank);
    try {
      this.payForBattle();
      this.startTimer();
    } catch (err) {
      this.message = err.message;
      this.isFinished = true;
    }
  },
  destroyed: function() {
    this.stopTimer();
  }
};
</script>
