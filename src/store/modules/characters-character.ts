import { Character } from "@/types/character";
import { CharactersState } from "@/types/characters-state";
import { ActionTree, MutationTree } from "vuex";
import { RootState } from "@/types/root";

function initBag(character: Character) {
  if (!character.bag) {
    character.bag = {
      apples: 0,
      money: 0,
      seeds: 0,
      megaSeeds: 0,
      legendarySeeds: 0,
      pies: 0,
      pizzas: 0,
      tickets: 0
    };
  } else {
    if (!character.bag.megaSeeds) {
      character.bag.megaSeeds = 0;
    }
    if (!character.bag.pies) {
      character.bag.pies = 0;
    }
    if (!character.bag.pizzas) {
      character.bag.pizzas = 0;
    }
    if (!character.bag.legendarySeeds) {
      character.bag.legendarySeeds = 0;
    }
    if (!character.bag.tickets) {
      character.bag.tickets = 0;
    }
  }
}

export const characterActions: ActionTree<CharactersState, RootState> = {
  create({ commit, getters }, character: Character) {
    if (!character.name) {
      throw new Error("Characters must have a name");
    }
    if (
      getters.characters &&
      getters.characters.find((c: Character) => c.name === character.name) !=
        null
    ) {
      throw new Error("Character name already taken");
    }

    commit("create", character);
  },
  select({ commit }: { commit: any }, character: Character) {
    commit("select", character);
  }
};

export const characterMutations: MutationTree<CharactersState> = {
  create(state: CharactersState, character: Character) {
    initBag(character);
    state.characters.push(character);
  },
  select(state: CharactersState, character: Character) {
    if (character) {
      initBag(character);
    }
    state.selectedIndex = state.characters.indexOf(character);
  }
};
