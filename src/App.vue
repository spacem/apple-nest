<template>
  <div id="app">
    <div class="game">
      <div v-if="selectedCharacter">
        Using character: {{ selectedCharacter.name }}
        <div v-if="selectedCharacter.bag">
          Money: {{ selectedCharacter.bag.money }}
          <span v-if="selectedCharacter.bag.seeds">
            | Seeds: {{ selectedCharacter.bag.seeds }}</span
          >
          <span v-if="selectedCharacter.bag.megaSeeds">
            | Mega Seeds: {{ selectedCharacter.bag.megaSeeds }}</span
          >
          <span v-if="selectedCharacter.bag.apples">
            | Apples: {{ selectedCharacter.bag.apples }}</span
          >
          <span v-if="selectedCharacter.bag.pies">
            | Pies: {{ selectedCharacter.bag.pies }}</span
          >
        </div>
        <div v-if="selectedCharacter.weaponLevel">
          Weapon Level: {{ selectedCharacter.weaponLevel }}
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .game {
    border: solid grey;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    padding: 40px;
    display: inline-block;
    width: 600px;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      354deg,
      rgba(0, 0, 0, 1) 1%,
      rgba(66, 77, 24, 1) 35%,
      rgba(215, 222, 223, 1) 100%
    );
    height: 100vw;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.image {
  width: 100%;
  height: 350px;
  background-position: top;
  background-size: contain;
  background-repeat: no-repeat;
}
.message {
  height: 50px;
}
.messages {
  background-color: burlywood;
  padding: 10px;
  padding-left: 20px;
  border: 2px solid;
  border-radius: 50px;
  margin-left: 55%;
  margin-top: -20px;
  text-align: left;
  float: right;
}
.actions {
  text-align: right;
  white-space: nowrap;
  margin: 10px;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  }
};
</script>
