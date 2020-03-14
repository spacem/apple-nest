import { CharactersState } from "@/types/characters-state";
import { MutationTree, ActionTree } from "vuex";
import { RootState } from "@/types/root";
import { assertCharacter } from "./character-assertions";

const REWARD_TIME = 60 * 60;

export const questActions: ActionTree<CharactersState, RootState> = {
  collectEventReward({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("collectEventReward", getters.selectedCharacterIndex);
  },
  doQuest({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("doQuest", getters.selectedCharacterIndex);
  }
};

export const questMutations: MutationTree<CharactersState> = {
  collectEventReward(state: CharactersState, index: number) {
    const character = state.characters[index];
    let remainingTime = 0;
    if (character.lastRewardDate) {
      remainingTime =
        REWARD_TIME - (new Date().valueOf() - character.lastRewardDate) / 1000;
    }
    if (remainingTime <= 0) {
      character.lastRewardDate = new Date().valueOf();
      character.bag.money += 2;
    } else {
      throw new Error(
        `${Math.ceil(
          remainingTime / 60
        )} minutes left until you can get another event reward`
      );
    }
  },
  doQuest(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character.questNumber) {
      character.bag.money += Math.pow(2, character.questNumber);
      character.questNumber++;
    } else {
      character.questNumber = 1;
      character.bag.money += 1;
    }
  }
};
