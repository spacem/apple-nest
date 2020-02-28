import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import { RootState } from "@/types/root";
import { CharactersState } from "@/types/characters-state";
import { Character } from "@/types/character";

const REWARD_TIME = 60 * 60;

// initial state
const state: CharactersState = {
  characters: [],
  selectedCharacter: undefined
};

// getters
const getters: GetterTree<CharactersState, RootState> = {
  characters: state => {
    return state.characters;
  },
  selectedCharacter: state => {
    return state.selectedCharacter;
  }
};

// actions
const actions: ActionTree<CharactersState, RootState> = {
  create({ commit }, character: Character) {
    commit("create", character);
  },
  select({ commit }, character: Character) {
    commit("select", character);
  },
  collectEventReward({ commit }) {
    commit("collectEventReward");
  },
  buySeed({ commit }) {
    commit("buySeed");
  },
  harvest({ commit }) {
    commit("harvest");
  },
  plantSeed({ commit }) {
    commit("plantSeed");
  },
  sellApple({ commit }) {
    commit("sellApple");
  }
};

// mutations
const mutations: MutationTree<CharactersState> = {
  create(state, character: Character) {
    initBag(character);
    state.characters.push(character);
  },
  select(state, character: Character) {
    if (character && !character.bag) {
      initBag(character);
    }
    state.selectedCharacter = character;
  },
  collectEventReward(state) {
    if (state.selectedCharacter) {
      let remainingTime = 0;
      if (state.selectedCharacter.lastRewardDate) {
        remainingTime =
          REWARD_TIME -
          (new Date().valueOf() - state.selectedCharacter.lastRewardDate) /
            1000;
      }
      if (remainingTime <= 0) {
        state.selectedCharacter.lastRewardDate = new Date().valueOf();
        state.selectedCharacter.bag.money += 1;
      } else {
        throw new Error(
          `${Math.ceil(remainingTime) /
            60} minutes left until you can get another event reward`
        );
      }
    } else {
      throw new Error(`No character selected`);
    }
  },
  buySeed(state) {
    if (state.selectedCharacter) {
      if (state.selectedCharacter.bag.money > 0) {
        state.selectedCharacter.bag.money--;
        state.selectedCharacter.bag.seeds++;
      } else {
        throw new Error(
          `Not enough money. Maybe you can take part in the event.`
        );
      }
    } else {
      throw new Error(`No character selected`);
    }
  },
  harvest(state) {
    if (state.selectedCharacter) {
      state.selectedCharacter.seedPlantDate = undefined;
      let numApples = Math.floor(Math.random() * 4);
      if (numApples == 0) {
        numApples = 1;
      }
      state.selectedCharacter.bag.apples += numApples;
    }
  },
  plantSeed(state) {
    if (state.selectedCharacter) {
      state.selectedCharacter.seedPlantDate = new Date().valueOf();
      state.selectedCharacter.bag.seeds--;
    }
  },
  sellApple(state) {
    if (state.selectedCharacter) {
      if (state.selectedCharacter.bag.apples > 0) {
        state.selectedCharacter.bag.apples--;
        state.selectedCharacter.bag.money += 10;
      } else {
        throw new Error(`Not enough apples. You should try growing some.`);
      }
    } else {
      throw new Error(`No character selected`);
    }
  }
};

function initBag(character: Character) {
  character.bag = {
    apples: 0,
    money: 0,
    seeds: 0,
    weaponLevel: 0
  };
}

export const characters: Module<CharactersState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
