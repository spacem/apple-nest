<template>
  <div id="app">
    <div class="game">
      <div v-if="selectedCharacter">
        Using character: {{ selectedCharacter.name }}
        <div v-if="selectedCharacter.bag">
          Money: {{ selectedCharacter.bag.money }} | Seeds:
          {{ selectedCharacter.bag.seeds }} | Mega Seeds:
          {{ selectedCharacter.bag.megaSeeds }} | Apples:
          {{ selectedCharacter.bag.apples }}
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
    display: inline-block;
    width: 600px;
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
