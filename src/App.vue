<template>
  <div id="app">
    <div v-if="selectedCharacter">
      Using character: {{ selectedCharacter.name }}
      <div v-if="selectedCharacter.bag">
        Money: {{ selectedCharacter.bag.money }} | Seeds:
        {{ selectedCharacter.bag.seeds }} | Apples:
        {{ selectedCharacter.bag.apples }}
      </div>
      <div v-if="selectedCharacter.weaponLevel">
        Weapon Level: {{ selectedCharacter.weaponLevel }}
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  }
};
</script>
