<template>
  <div>
    <div class="messages" v-if="!isBattleStarting">
      <div class="message">{{ message }}</div>
      <div class="actions" v-if="!isBattleAlmostStarting">
        <button v-if="!chooseBattle" @click="talk()">Talk</button>
        <button v-if="!chooseBattle" @click="tryToBuyTicket()">
          Buy Ticket
        </button>
        <button v-if="!chooseBattle" @click="startChoosingToBattle()">
          Battle
        </button>
        <button v-if="chooseBattle" @click="cancelChoosingToBattle()">
          None Thanks
        </button>
        <button v-if="chooseBattle" @click="startBattle(1)">
          Caterpillar
        </button>
        <button
          v-if="chooseBattle && selectedCharacter.rankBeaten >= 1"
          @click="startBattle(2)"
        >
          Snake
        </button>
        <button
          v-if="chooseBattle && selectedCharacter.rankBeaten >= 2"
          @click="startBattle(3)"
        >
          Aliens
        </button>
        <button
          v-if="chooseBattle && selectedCharacter.rankBeaten >= 3"
          @click="startBattle(4)"
        >
          Robot
        </button>
        <button
          v-if="chooseBattle && selectedCharacter.rankBeaten >= 4"
          @click="startBattle(5)"
        >
          Dragon
        </button>
        <button
          v-if="chooseBattle && selectedCharacter.rankBeaten >= 5"
          @click="startBattle(6)"
        >
          Demon
        </button>
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
      isBattleStarting: false,
      isBattleAlmostStarting: false,
      chooseBattle: false
    };
  },
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  },
  methods: {
    ...mapActions("characters", ["buyTicket"]),
    tryToBuyTicket() {
      try {
        this.buyTicket();
        this.message = "You can use that ticket to enter the battle";
      } catch (err) {
        this.message = err.message;
      }
    },
    talk(character) {
      if (this.message === "Do you like to fight? I do.") {
        this.message =
          "Don't worry if you get defeated you can just try again later.";
      } else {
        this.message = "Do you like to fight? I do.";
      }
    },
    startBattle(enemyRank) {
      if (this.message === "You need a weapon and armour to fight.") {
        this.message = "Go and talk to the blacksmith";
      } else if (
        !this.selectedCharacter.armourLevel ||
        !this.selectedCharacter.weaponLevel
      ) {
        this.message = "You need a weapon and armour to fight.";
      } else {
        try {
          this.message = "Get ready for battle!";
          this.isBattleAlmostStarting = true;
          setTimeout(() => {
            this.isBattleStarting = true;
            setTimeout(() => {
              router.push(`/enemy/${enemyRank}`);
            }, 1000);
          }, 2000);
        } catch (err) {
          this.message = err.message;
        }
      }
    },
    startChoosingToBattle() {
      this.message =
        "Are you strong enough? What creature do you want to battle?";
      this.chooseBattle = true;
    },
    cancelChoosingToBattle() {
      this.message = "You can battle anytime.. if you have a ticket.";
      this.chooseBattle = false;
    }
  }
};
</script>
