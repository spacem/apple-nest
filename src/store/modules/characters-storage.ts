import { CharactersState } from "@/types/characters-state";
import { MutationTree, ActionTree } from "vuex";
import { RootState } from "@/types/root";
import { assertCharacter } from "./character-assertions";

export const storageActions: ActionTree<CharactersState, RootState> = {
  storeMoney({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("storeMoney", getters.selectedCharacterIndex);
  },
  takeMoney({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("takeMoney", getters.selectedCharacterIndex);
  }
};

export const storageMutations: MutationTree<CharactersState> = {
  storeMoney(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (!state.storage) {
      state.storage = 0;
    }
    state.storage += character.bag.money;
    character.bag.money = 0;
  },
  takeMoney(state: CharactersState, index: number) {
    const character = state.characters[index];
    character.bag.money += state.storage;
    state.storage = 0;
  }
};
