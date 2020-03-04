import { GetterTree } from "vuex";
import { CharactersState } from "@/types/characters-state";
import { RootState } from "@/types/root";

// getters
export const gettersOfCharacters: GetterTree<CharactersState, RootState> = {
  characters: state => {
    return state.characters;
  },
  selectedCharacter: state => {
    if (state.selectedIndex != null && state.selectedIndex >= 0) {
      return state.characters[state.selectedIndex];
    }
  },
  selectedCharacterIndex: state => {
    if (state.selectedIndex != null && state.selectedIndex >= 0) {
      return state.selectedIndex;
    } else {
      return -1;
    }
  },
  storage: state => {
    return state.storage;
  }
};
