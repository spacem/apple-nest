import { CharactersState } from "@/types/characters-state";
import { MutationTree, ActionTree } from "vuex";
import { RootState } from "@/types/root";
import {
  assertCharacter,
  assertMoney,
  assertSeed,
  assertOneMoney,
  assertSeedReady
} from "./character-assertions";

const MEGA_SEED_COST = 20;
const LEGENDARY_SEED_COST = 500;
const SEED_GROW_TIME = 1000 * 20;
const MEGA_SEED_GROW_TIME = 1000 * 300;
const LEGENDARY_SEED_GROW_TIME = 1000 * 60 * 60;

export const seedActions: ActionTree<CharactersState, RootState> = {
  buySeed({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertOneMoney(getters.selectedCharacter);
    commit("buySeed", getters.selectedCharacterIndex);
  },
  buyMegaSeed({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertMoney(getters.selectedCharacter, MEGA_SEED_COST);
    commit("buyMegaSeed", getters.selectedCharacterIndex);
  },
  buyLegendarySeed({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertMoney(getters.selectedCharacter, LEGENDARY_SEED_COST);
    commit("buyLegendarySeed", getters.selectedCharacterIndex);
  },
  harvest({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertSeedReady(getters.selectedCharacter);
    commit("harvest", getters.selectedCharacterIndex);
  },
  plantSeed({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertSeed(getters.selectedCharacter.bag.seeds);
    commit("plantSeed", getters.selectedCharacterIndex);
  },
  plantMegaSeed({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertSeed(getters.selectedCharacter.bag.megaSeeds);
    commit("plantMegaSeed", getters.selectedCharacterIndex);
  },
  plantLegendarySeed({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertSeed(getters.selectedCharacter.bag.legendarySeeds);
    commit("plantLegendarySeed", getters.selectedCharacterIndex);
  }
};

export const seedMutations: MutationTree<CharactersState> = {
  buySeed(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character.bag.money > 0) {
      character.bag.money--;
      character.bag.seeds++;
    }
  },

  buyMegaSeed(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character) {
      if (character.bag.money >= MEGA_SEED_COST) {
        character.bag.money -= MEGA_SEED_COST;
        character.bag.megaSeeds++;
      }
    }
  },

  buyLegendarySeed(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character) {
      if (character.bag.money >= LEGENDARY_SEED_COST) {
        character.bag.money -= LEGENDARY_SEED_COST;
        character.bag.legendarySeeds++;
      }
    }
  },

  harvest(state: CharactersState, index: number) {
    const character = state.characters[index];
    let numApples = 0;
    if (character.seedReadyDate) {
      character.seedReadyDate = undefined;
      numApples = Math.floor(Math.random() * 10);
      if (numApples < 2) {
        numApples = 2;
      }
    } else if (character.megaSeedReadyDate) {
      character.megaSeedReadyDate = undefined;
      let roll = Math.random();
      if (roll > 0.95) {
        numApples = 200;
      } else if (roll > 0.85) {
        numApples = 100;
      } else if (roll > 0.4) {
        numApples = 80;
      } else {
        numApples = 50;
      }
    } else if (character.legendarySeedReadyDate) {
      character.legendarySeedReadyDate = undefined;
      let roll = Math.random();
      if (roll > 0.95) {
        numApples = 10000;
      } else if (roll > 0.85) {
        numApples = 8000;
      } else if (roll > 0.4) {
        numApples = 5000;
      } else {
        numApples = 2000;
      }
    }
    character.bag.apples += numApples;
  },

  plantSeed(state: CharactersState, index: number) {
    const character = state.characters[index];
    character.seedReadyDate = new Date().valueOf() + SEED_GROW_TIME;
    character.bag.seeds--;
  },

  plantMegaSeed(state: CharactersState, index: number) {
    const character = state.characters[index];
    character.megaSeedReadyDate = new Date().valueOf() + MEGA_SEED_GROW_TIME;
    character.bag.megaSeeds--;
  },

  plantLegendarySeed(state: CharactersState, index: number) {
    const character = state.characters[index];
    character.legendarySeedReadyDate =
      new Date().valueOf() + LEGENDARY_SEED_GROW_TIME;
    character.bag.legendarySeeds--;
  }
};
