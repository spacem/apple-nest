<template>
  <div>
    <h1>Plot</h1>
    <div v-if="selectedCharacter" class="messages">
      <div class="message">{{ message }}</div>
      <div class="actions">
        <button
          @click="tryHarvest()"
          v-if="getAnySeedReadyDate() && seedReady()"
        >
          Harvest Plant
        </button>
        <button
          @click="tryPlantSeed()"
          v-if="selectedCharacter.bag.seeds && !getAnySeedReadyDate()"
        >
          Plant Seed
        </button>
        <button
          v-if="selectedCharacter.bag.megaSeeds && !getAnySeedReadyDate()"
          @click="tryPlantMegaSeed()"
        >
          Plant Mega Seed
        </button>
      </div>
    </div>
    <div class="image plot"></div>
    <router-link to="/farm">Farm</router-link>
  </div>
</template>
<style scoped lang="scss">
.plot {
  background-image: url("~@/assets/Plot.jpg");
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => {
    return {
      message: "If you had seeds you could plant them here",
      growSeconds: undefined,
      intervalId: undefined
    };
  },
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  },
  methods: {
    ...mapActions("characters", ["harvest", "plantSeed", "plantMegaSeed"]),
    getTime() {
      if (this.growSeconds != null) {
        return Math.ceil(this.growSeconds / 60);
      }
    },
    getSeconds() {
      if (this.growSeconds != null) {
        return Math.ceil(this.growSeconds);
      }
    },
    seedReady() {
      return this.getTime() <= 0;
    },
    tryPlantSeed() {
      this.plantSeed();
      this.message = "Now you just have to wait.. it won't take long!";
      this.maybeStartTimer();
    },
    tryPlantMegaSeed() {
      this.plantMegaSeed();
      this.message = "Now you just have to wait.. a long time...";
      this.maybeStartTimer();
    },
    tryHarvest() {
      try {
        const before = this.selectedCharacter.bag.apples;
        this.harvest();
        const num = this.selectedCharacter.bag.apples - before;
        if (num === 1) {
          this.message = "Only a single apple from that tree";
        } else if (num === 100) {
          this.message = `Wow that tree gave ${num} apples`;
        } else {
          this.message = `That tree gave ${num} apples`;
        }
      } catch (err) {
        this.message = err.message;
      }
    },
    getAnySeedReadyDate() {
      const character = this.selectedCharacter;
      if (character.seedReadyDate != null) {
        return character.seedReadyDate;
      } else if (character.megaSeedReadyDate != null) {
        return character.megaSeedReadyDate;
      }
    },
    setGrowSeconds() {
      try {
        const ready = this.getAnySeedReadyDate();
        if (ready != null) {
          this.growSeconds = (ready - new Date().valueOf()) / 1000;
          if (this.growSeconds > 60) {
            this.message =
              Math.ceil(this.growSeconds / 60) +
              " minutes left until ready for harvest";
          } else if (this.growSeconds > 0) {
            this.message =
              Math.ceil(this.growSeconds) +
              " seconds left until ready for harvest";
          } else {
            this.message = "Looks like your Apples are ready";
          }
        }
      } catch (err) {
        this.message = err.message;
        this.growSeconds = undefined;
      }
    },
    maybeStartTimer() {
      this.setGrowSeconds();
      if (this.growSeconds > 0) {
        setInterval(() => {
          this.setGrowSeconds();
          if (!this.growSeconds) {
            this.stopAnyTimer();
          }
        }, 1000);
      }
    },
    stopAnyTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  },
  created: function() {
    this.maybeStartTimer();
  },
  destroyed: function() {
    this.stopAnyTimer();
  }
};
</script>
