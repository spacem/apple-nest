<template>
  <div>
    <h1>Plot</h1>
    <div v-if="selectedCharacter">
      <div>{{ message }}</div>
      <div
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
        <div v-if="selectedCharacter.bag.seeds">
          <button @click="tryPlantSeed()">Plant Seed</button>
        </div>
        <div v-if="selectedCharacter.bag.megaSeeds">
          <button @click="tryPlantMegaSeed()">Plant Mega Seed</button>
        </div>
        <span
          v-if="
            !selectedCharacter.bag.megaSeeds && !selectedCharacter.bag.seeds
          "
        >
          If you had seeds you could plant them here
        </span>
      </div>
    </div>
    <router-link to="/farm">Farm</router-link>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => {
    return {
      message: ""
    };
  },
  computed: {
    ...mapGetters("characters", ["selectedCharacter", "growSeconds"])
  },
  methods: {
    ...mapActions("characters", ["harvest", "plantSeed", "plantMegaSeed"]),
    getTime() {
      return Math.ceil(this.growSeconds / 60);
    },
    getSeconds() {
      return Math.ceil(this.growSeconds);
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
