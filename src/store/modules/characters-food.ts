import { CharactersState } from "@/types/characters-state";
import { MutationTree, ActionTree } from "vuex";
import { RootState } from "@/types/root";
import {
  assertCharacter,
  assertApples,
  assertPizza,
  assertPie
} from "./character-assertions";

const PIE_COST = 100;
const PIZZA_COST = 5000;
const APPLE_COST = 10;

export const foodActions: ActionTree<CharactersState, RootState> = {
  sellApple({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertApples(getters.selectedCharacter, 1);
    commit("sellApple", getters.selectedCharacterIndex);
  },
  sellPie({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertPie(getters.selectedCharacter);
    commit("sellPie", getters.selectedCharacterIndex);
  },
  sellPizza({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertPizza(getters.selectedCharacter);
    commit("sellPizza", getters.selectedCharacterIndex);
  },
  makePie({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertApples(getters.selectedCharacter, PIE_COST);
    commit("makePie", getters.selectedCharacterIndex);
  },
  makePizza({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertApples(getters.selectedCharacter, PIZZA_COST);
    commit("makePizza", getters.selectedCharacterIndex);
  }
};

export const foodMutations: MutationTree<CharactersState> = {
  sellApple(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character.bag.apples > 0) {
      character.bag.apples--;
      character.bag.money += APPLE_COST;
    }
  },
  sellPie(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character.bag.pies > 0) {
      character.bag.pies--;
      character.bag.money += PIE_COST * APPLE_COST;
    }
  },
  sellPizza(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character.bag.pizzas > 0) {
      character.bag.pizzas--;
      character.bag.money += PIZZA_COST * APPLE_COST;
    }
  },
  makePie(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character.bag.apples >= PIE_COST) {
      character.bag.apples -= PIE_COST;
      character.bag.pies++;
    }
  },
  makePizza(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character.bag.apples >= PIZZA_COST) {
      character.bag.apples -= PIZZA_COST;
      character.bag.pizzas++;
    }
  }
};
