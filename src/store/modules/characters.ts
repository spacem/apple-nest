import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import { RootState } from "@/types/root";
import { CharactersState } from "@/types/characters-state";
import { Character } from "@/types/character";

const REWARD_TIME = 60 * 60;
const WEAPON_COST = 50;

// initial state
const state: CharactersState = {
  storage: 0,
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
  },
  storage: state => {
    return state.storage;
  },
  growReadyDate: state => {
    if (state.selectedCharacter) {
      let secsToGrow = 0;
      let plantDate = 0;
      if (state.selectedCharacter.seedPlantDate) {
        secsToGrow = 60;
        plantDate = state.selectedCharacter.seedPlantDate;
      } else if (state.selectedCharacter.megaSeedPlantDate) {
        secsToGrow = 600;
        plantDate = state.selectedCharacter.megaSeedPlantDate;
      } else {
        throw new Error("No seed planted");
      }
      return plantDate + secsToGrow * 1000;
    } else {
      throw new Error("No character selected");
    }
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
  buyMegaSeed({ commit }) {
    commit("buyMegaSeed");
  },
  harvest({ commit, getters }) {
    if (getters.growReadyDate < new Date().valueOf()) {
      commit("harvest");
    } else {
      throw new Error("Cannot harvest - not ready yet");
    }
  },
  plantSeed({ commit }) {
    commit("plantSeed");
  },
  plantMegaSeed({ commit }) {
    commit("plantMegaSeed");
  },
  sellApple({ commit }) {
    commit("sellApple");
  },
  storeMoney({ commit }) {
    commit("storeMoney");
  },
  takeMoney({ commit }) {
    commit("takeMoney");
  },
  makeWeapon({ commit }) {
    commit("makeWeapon");
  },
  upgradeWeapon({ commit }) {
    commit("upgradeWeapon");
  }
};

// mutations
const mutations: MutationTree<CharactersState> = {
  create(state, character: Character) {
    initBag(character);
    state.characters.push(character);
  },
  select(state, character: Character) {
    if (character) {
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
          `${Math.ceil(
            remainingTime / 60
          )} minutes left until you can get another event reward`
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
  buyMegaSeed(state) {
    if (state.selectedCharacter) {
      if (state.selectedCharacter.bag.money >= 20) {
        state.selectedCharacter.bag.money -= 20;
        state.selectedCharacter.bag.megaSeeds++;
      } else {
        throw new Error(`Mega seeds cost 20. You need more money`);
      }
    } else {
      throw new Error(`No character selected`);
    }
  },
  harvest(state) {
    if (state.selectedCharacter) {
      let numApples = 0;
      if (state.selectedCharacter.seedPlantDate) {
        state.selectedCharacter.seedPlantDate = undefined;
        numApples = Math.floor(Math.random() * 4);
        if (numApples == 0) {
          numApples = 1;
        }
      } else if (state.selectedCharacter.megaSeedPlantDate) {
        state.selectedCharacter.megaSeedPlantDate = undefined;
        let roll = Math.random();
        if (roll > 0.95) {
          numApples = 100;
        } else if (roll > 0.85) {
          numApples = 60;
        } else if (roll > 0.6) {
          numApples = 50;
        } else if (roll > 0.4) {
          numApples = 20;
        } else {
          numApples = 10;
        }
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
  plantMegaSeed(state) {
    if (state.selectedCharacter) {
      state.selectedCharacter.megaSeedPlantDate = new Date().valueOf();
      state.selectedCharacter.bag.megaSeeds--;
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
  },
  storeMoney(state) {
    if (state.selectedCharacter) {
      if (!state.storage) {
        state.storage = 0;
      }
      state.storage += state.selectedCharacter.bag.money;
      state.selectedCharacter.bag.money = 0;
    }
  },
  takeMoney(state) {
    if (state.selectedCharacter) {
      state.selectedCharacter.bag.money += state.storage;
      state.storage = 0;
    }
  },
  makeWeapon(state) {
    if (
      state.selectedCharacter &&
      !state.selectedCharacter.weaponLevel &&
      state.selectedCharacter.bag.money >= WEAPON_COST
    ) {
      state.selectedCharacter.weaponLevel = 1;
      state.selectedCharacter.bag.money -= WEAPON_COST;
    } else {
      throw new Error(
        "You do not have enough money. Come back when you have " + WEAPON_COST
      );
    }
  },
  upgradeWeapon(state) {
    if (state.selectedCharacter && state.selectedCharacter.weaponLevel) {
      const requiredMoney = Math.floor(
        WEAPON_COST * 0.5 * state.selectedCharacter.weaponLevel
      );
      if (state.selectedCharacter.bag.money >= requiredMoney) {
        state.selectedCharacter.bag.money -= requiredMoney;
        const roll = Math.random();
        if (roll > 0.3) {
          state.selectedCharacter.weaponLevel++;
        } else if (roll < 0.1) {
          state.selectedCharacter.weaponLevel--;
        }
      } else {
        throw new Error(
          "Upgrading is not cheap you know. Come back when you have " +
            requiredMoney
        );
      }
    }
  }
};

function initBag(character: Character) {
  if (!character.bag) {
    character.bag = {
      apples: 0,
      money: 0,
      seeds: 0,
      megaSeeds: 0
    };
  } else {
    if (!character.bag.megaSeeds) {
      character.bag.megaSeeds = 0;
    }
  }
}

export const characters: Module<CharactersState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
