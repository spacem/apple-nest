<template>
  <div>
    <div class="messages">
      <div class="message">{{ message }}</div>
      <div class="actions">
        <button @click="talk()">Talk</button>
        <button @click="quest()">Quest</button>
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
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  },
  methods: {
    ...mapActions("characters", ["collectEventReward", "doQuest"]),
    collectReward() {
      try {
        this.collectEventReward();
        this.message = "Hope you enjoyed the event";
      } catch (err) {
        this.message = err.message;
      }
    },
    talk() {
      if (this.message === "Do you like rewards? I do.") {
        this.message = "If you need more money you should sell some apples.";
      } else {
        this.message = "Do you like rewards? I do.";
      }
    },
    quest() {
      switch (this.selectedCharacter.questNumber) {
        case 11:
          if (this.selectedCharacter.rankBeaten > 5) {
            this.message = "You have completed the game.";
          } else {
            this.message =
              "You have to beat the Demon in battle. Come back when you have won.";
          }
          break;
        case 10:
          if (this.selectedCharacter.rankBeaten > 4) {
            this.message = "Time to fight the Demon. Good luck with that.";
            this.doQuest();
          } else {
            this.message =
              "You have to beat the Dragon in battle. Come back when you have won. It is not the final boss you know.";
          }
          break;
        case 9:
          if (this.selectedCharacter.rankBeaten > 3) {
            this.message =
              "Time to fight the Dragon. This is not the last boss but it will be tough.";
            this.doQuest();
          } else {
            this.message =
              "You have to beat the Robot in battle. Come back when you have won.";
          }
          break;
        case 8:
          if (this.selectedCharacter.rankBeaten > 2) {
            this.message =
              "Now fight the Robot. It might be time to start growing legendary apples on your other characters.";
            this.doQuest();
          } else {
            this.message =
              "You have to beat the Aliens in battle. Try making money on another character then give it to this character through storage.";
          }
          break;
        case 7:
          if (this.selectedCharacter.rankBeaten > 1) {
            this.message =
              "Time to fight the Aliens. You might need to grow apples on another character to pay for upgrades to your weapon and armour.";
            this.doQuest();
          } else {
            this.message =
              "Come back when you have beaten the snake. That mega-seed might be ready to harvest by now and could give you the enhancing funds you need.";
          }
          break;
        case 6:
          if (this.selectedCharacter.rankBeaten > 0) {
            this.message =
              "Time to fight the Snake. You might need to upgrade your weapon and armour to win.";
            this.doQuest();
          } else {
            this.message =
              "You have to beat the Caterpillar in battle. Come back when you have won. If it is too hard you can try upgrading your weapon.";
          }
          break;
        case 5:
          if (
            this.selectedCharacter.weaponLevel > 0 &&
            this.selectedCharacter.armourLevel > 0
          ) {
            this.message = "Now go buy a ticket and fight the Caterpillar.";
            this.doQuest();
          } else {
            this.message =
              "You need a weapon and armour to be able to battle. Come back when you have them.";
          }
          break;
        case 4:
          if (this.selectedCharacter.bag.megaSeeds > 0) {
            this.message =
              "Ok. Plant that mega-seed, sell the apples and visit the blacksmith in the city. Come back when you have a weapon and armour.";
            this.doQuest();
          } else {
            this.message =
              "You need to start planting mega-seeds or you won't be able to make much money. Buy a mega-seed from the farmer and come back here.";
          }
          break;
        case 3:
          if (this.selectedCharacter.bag.money > 10) {
            this.message =
              "Now that you know how to make money on your own it is time to buy a mega-seed. These take longer to grow but give more apples. Buy one and come back here.";
            this.doQuest();
          } else {
            this.message =
              "Remember you were going to feed Appleosouras? Come back when you have at least 10 money.";
          }
          break;
        case 2:
          if (this.selectedCharacter.bag.apples > 0) {
            this.message =
              "To make money you can feed apples to the Appleosouras. Come back when you have at least 10 money.";
            this.doQuest();
          } else {
            this.message =
              "You got your seed. Why didn't you grow an apple yet. That is your next quest!";
          }
          break;
        case 1:
          if (this.selectedCharacter.bag.seeds > 0) {
            this.message =
              "Great! Now that you have a seed you can grow some apples.";
            this.doQuest();
          } else {
            this.message =
              "Come on... where is that seed? You have to buy a seed for this first quest. If you need money you can collect the event reward.";
          }
          break;
        default:
          this.message =
            "Your first quest is to buy a seed. Go see the farmer and come back to me once you have a seed.";
          this.doQuest();
      }
    }
  }
};
</script>
