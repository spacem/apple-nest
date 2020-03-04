<template>
  <div class="characterDetail cool-links">
    <div class="character-name">
      Character: {{ selectedCharacter.name }}
      <div class="switch">
        <router-link to="/select-character">Switch Character</router-link>
      </div>
    </div>
    <div v-if="selectedCharacter.bag" class="bag">
      Money: {{ selectedCharacter.bag.money }}
      <span v-if="selectedCharacter.bag.seeds"
        >&nbsp;| Normal Seeds: {{ selectedCharacter.bag.seeds }}</span
      >
      <span v-if="selectedCharacter.bag.megaSeeds"
        >&nbsp;| Mega Seeds: {{ selectedCharacter.bag.megaSeeds }}</span
      >
      <span v-if="selectedCharacter.bag.legendarySeeds">
        &nbsp;| Legendary Seeds:
        {{ selectedCharacter.bag.legendarySeeds }}
      </span>
      <span v-if="selectedCharacter.bag.apples"
        >&nbsp;| Apples: {{ selectedCharacter.bag.apples }}</span
      >
      <span v-if="selectedCharacter.bag.pies"
        >&nbsp;| Pies: {{ selectedCharacter.bag.pies }}</span
      >
      <span v-if="selectedCharacter.bag.tickets"
        >&nbsp;| Tickets: {{ selectedCharacter.bag.tickets }}</span
      >
    </div>
    <div>
      <span v-if="selectedCharacter.weaponLevel"
        >Weapon Level: {{ selectedCharacter.weaponLevel }}</span
      >
      <span
        v-if="selectedCharacter.weaponLevel && selectedCharacter.armourLevel"
        >&nbsp;|&nbsp;</span
      >
      <span v-if="selectedCharacter.armourLevel"
        >Armour Level: {{ selectedCharacter.armourLevel }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Character } from "../types/character";

@Component
export default class CharacterDetail extends Vue {
  @Prop() private selectedCharacter!: Character;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.characterDetail {
  text-align: right;
  padding: 5px;
  background: black;
  opacity: 0.8;
  color: lightslategray;
  min-height: 3.5em;
  .character-name {
    text-align: center;
    float: left;
  }
}
</style>
