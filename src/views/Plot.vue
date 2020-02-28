<template>
  <div>
    <h1>Plot</h1>
    <div v-if="selectedCharacter">
      <div>
        {{ message }}
      </div>
      <div v-if="selectedCharacter.seedPlantDate">
        <button @click="tryHarvest()" v-if="seedReady()">
          Harvest Plant
        </button>
        <span v-else>
          {{ getTime() }} minutes left until ready for harvest
        </span>
      </div>
      <div v-else>
        <button @click="tryPlantSeed()" v-if="selectedCharacter.bag.seeds">
          Plant Seed
        </button>
        <span v-else>
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
    ...mapGetters("characters", ["selectedCharacter"])
  },
  methods: {
    ...mapActions("characters", ["harvest", "plantSeed"]),
    getTime() {
      const timeGrowing =
        (new Date().valueOf() - this.selectedCharacter.seedPlantDate) / 1000;
      return Math.ceil((600 - timeGrowing) / 60);
    },
    seedReady() {
      return this.getTime() <= 0;
    },
    tryPlantSeed() {
      this.plantSeed();
      this.message = "Now you just have to wait";
    },
    tryHarvest() {
      const before = this.selectedCharacter.bag.apples;
      this.harvest();
      const num = this.selectedCharacter.bag.apples - before;
      if (num === 1) {
        this.message = "Only a single apple from that tree";
      } else {
        this.message = `Wow that tree gave ${num} apples`;
      }
    }
  }
};
</script>
