<template>
  <div>
    <h1>Plot</h1>
    <div v-if="selectedCharacter" class="messages">
      <div class="message">{{ message }}</div>
      <div
        class="message"
        v-if="
          selectedCharacter.seedPlantDate || selectedCharacter.megaSeedPlantDate
        "
      >
        <button @click="tryHarvest()" v-if="seedReady()">Harvest Plant</button>
        <span v-else>
          <span v-if="getTime() > 1">
            {{ getTime() }} minutes left until ready for harvest
          </span>
          <span v-else>
            {{ getSeconds() }} seconds left until ready for harvest
          </span>
        </span>
      </div>
      <div v-else>
        <div
          class="message"
          v-if="
            !selectedCharacter.bag.megaSeeds && !selectedCharacter.bag.seeds
          "
        >
          If you had seeds you could plant them here
        </div>
        <div class="actions">
          <button @click="tryPlantSeed()" v-if="selectedCharacter.bag.seeds">
            Plant Seed
          </button>
          <button
            v-if="selectedCharacter.bag.megaSeeds"
            @click="tryPlantMegaSeed()"
          >
            Plant Mega Seed
          </button>
        </div>
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
      message: ""
    };
  },
  computed: {
    ...mapGetters("characters", ["selectedCharacter", "growReadyDate"])
  },
  methods: {
    ...mapActions("characters", ["harvest", "plantSeed", "plantMegaSeed"]),
    getGrowSeconds() {
      return (this.growReadyDate - new Date().valueOf()) / 1000;
    },
    getTime() {
      return Math.ceil(this.getGrowSeconds() / 60);
    },
    getSeconds() {
      return Math.ceil(this.getGrowSeconds());
    },
    seedReady() {
      return this.getTime() <= 0;
    },
    tryPlantSeed() {
      this.plantSeed();
      this.message = "Now you just have to wait.. it won't take long!";
    },
    tryPlantMegaSeed() {
      this.plantMegaSeed();
      this.message = "Now you just have to wait.. a long time...";
    },
    tryHarvest() {
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
    }
  }
};
</script>
