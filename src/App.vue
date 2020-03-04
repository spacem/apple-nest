<template>
  <div id="app">
    <div class="background"></div>
    <div class="game" v-bind:class="getBackgroundClass()">
      <CharacterDetail
        v-bind:selectedCharacter="selectedCharacter"
        v-if="selectedCharacter"
      />
      <router-view />
      <div class="footer">Apple Nest - by spacem</div>
    </div>
  </div>
</template>
<style lang="scss">
body {
  font-size: large;
  margin: 0px;
}
button {
  font-size: large;
  padding: 0.2em;
  padding-left: 1em;
  padding-right: 1em;
  margin-right: 0.4em;
  border-radius: 0.3em;
}
input {
  font-size: larger;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  position: absolute;
  margin: auto;
  width: 100%;
  .background {
    background: url("~@/assets/Background.jpg");
    opacity: 0.9;
    top: -100px;
    left: 0;
    right: 0;
    bottom: -100px;
    position: fixed;
    z-index: -999;
    -webkit-filter: blur(2px);
    filter: blur(2px);
  }
  .game {
    border-left: solid 5px;
    border-right: solid 5px;
    display: inline-block;
    width: 50%;
    min-width: 50rem;
    background: rgb(0, 0, 0);
    height: 100%;
  }
  .town-background {
    background: url("~@/assets/Leaves.jpg");
    border-color: darkolivegreen;
  }
  .farm-background {
    background: url("~@/assets/Dirt.jpg");
    border-color: dimgray;
  }
  .city-background {
    background: url("~@/assets/Stone.jpg");
    border-color: grey;
  }
  .character-background {
    background: url("~@/assets/Stone.jpg");
    border-color: grey;
  }
  .footer {
    color: darkgray;
    position: fixed;
    bottom: 0px;
    background: black;
    width: 100%;
    opacity: 0.8;
    left: 0px;
  }
  h1 {
    color: green;
    background: black;
    opacity: 0.8;
  }
  .cool-links {
    a,
    button {
      opacity: 0.95;
      display: inline-block;
      border: darkgrey 2px solid;
      padding: 0.3em;
      padding-left: 0.8em;
      padding-right: 0.8em;
      border-radius: 2em;
      background: black;
      opacity: 0.9;
      text-decoration: none;
      color: grey;
    }
    a:hover,
    button:hover {
      border-color: white;
    }
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
  margin-top: 20px;
  width: 100%;
  height: 450px;
  background-position: top;
  background-size: contain;
  background-repeat: no-repeat;
}
.message {
  height: 50px;
  padding: 5px;
  padding-right: 10px;
  padding-top: 10px;
}
.messages {
  background-color: #ccbba6;
  padding-left: 20px;
  padding-right: 20px;
  border: 2px solid;
  border-radius: 50px;
  margin-left: 60%;
  margin-right: -90px;
  margin-top: -20px;
  text-align: left;
  float: right;
}
.back-link {
  text-align: left;
  padding: 10px;
}
.actions {
  text-align: right;
  white-space: nowrap;
  margin: 10px;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import CharacterDetail from "@/components/CharacterDetail.vue";

export default {
  components: {
    CharacterDetail
  },
  computed: {
    ...mapGetters("characters", ["selectedCharacter"])
  },
  methods: {
    getBackgroundClass() {
      return {
        ["character-background"]: this.isCharacterSelect(),
        ["town-background"]: this.isTown(),
        ["city-background"]: this.isCity(),
        ["farm-background"]: this.isFarm()
      };
    },
    isTown() {
      return this.$route.path.indexOf("/town") >= 0;
    },
    isCharacterSelect() {
      return (
        this.$route.path === "/" ||
        this.$route.path.indexOf("/select-character") >= 0 ||
        this.$route.path.indexOf("/create-character") >= 0
      );
    },
    isCity() {
      return (
        this.$route.path.indexOf("/city") >= 0 ||
        this.$route.path.indexOf("/city") >= 0
      );
    },
    isFarm() {
      return (
        this.$route.path.indexOf("/farm") >= 0 ||
        this.$route.path.indexOf("/farm") >= 0
      );
    }
  }
};
</script>
