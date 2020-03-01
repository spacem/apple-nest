import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import { RootState } from "@/types/root";
import { CharactersState } from "@/types/characters-state";
import { Character } from "@/types/character";

const REWARD_TIME = 60 * 60;
const WEAPON_COST = 50;
const SEED_GROW_TIME = 1000 * 60;
const MEGA_SEED_GROW_TIME = 1000 * 600;

// initial state
const state: CharactersState = {
  storage: 0,
  characters: [],
  selectedIndex: undefined
};

// getters
const getters: GetterTree<CharactersState, RootState> = {
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

// actions
const actions: ActionTree<CharactersState, RootState> = {
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
  select({ commit }, character: Character) {
    commit("select", character);
  },
  collectEventReward({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("collectEventReward", getters.selectedCharacterIndex);
  },
  buySeed({ commit, getters }) {
    commit("buySeed", getters.selectedCharacterIndex);
  },
  buyMegaSeed({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("buyMegaSeed", getters.selectedCharacterIndex);
  },
  harvest({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("harvest", getters.selectedCharacterIndex);
  },
  plantSeed({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("plantSeed", getters.selectedCharacterIndex);
  },
  plantMegaSeed({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("plantMegaSeed", getters.selectedCharacterIndex);
  },
  sellApple({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("sellApple", getters.selectedCharacterIndex);
  },
  sellPie({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("sellPie", getters.selectedCharacterIndex);
  },
  storeMoney({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("storeMoney", getters.selectedCharacterIndex);
  },
  takeMoney({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("takeMoney", getters.selectedCharacterIndex);
  },
  makeWeapon({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("makeWeapon", getters.selectedCharacterIndex);
  },
  upgradeWeapon({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("upgradeWeapon", getters.selectedCharacterIndex);
  },
  makePie({ commit, getters }) {
    if (getters.selectedCharacterIndex == -1) {
      throw new Error(`No character selected`);
    }
    commit("makePie", getters.selectedCharacterIndex);
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
    state.selectedIndex = state.characters.indexOf(character);
  },
  collectEventReward(state, index) {
    const character = state.characters[index];
    let remainingTime = 0;
    if (character.lastRewardDate) {
      remainingTime =
        REWARD_TIME - (new Date().valueOf() - character.lastRewardDate) / 1000;
    }
    if (remainingTime <= 0) {
      character.lastRewardDate = new Date().valueOf();
      character.bag.money += 1;
    } else {
      throw new Error(
        `${Math.ceil(
          remainingTime / 60
        )} minutes left until you can get another event reward`
      );
    }
  },
  buySeed(state, index) {
    const character = state.characters[index];
    if (character.bag.money > 0) {
      character.bag.money--;
      character.bag.seeds++;
    } else {
      throw new Error(
        `Not enough money. Maybe you can take part in the event.`
      );
    }
  },
  buyMegaSeed(state, index) {
    const character = state.characters[index];
    if (character) {
      if (character.bag.money >= 20) {
        character.bag.money -= 20;
        character.bag.megaSeeds++;
      } else {
        throw new Error(`Mega seeds cost 20. You need more money`);
      }
    }
  },
  harvest(state, index) {
    const character = state.characters[index];
    let numApples = 0;
    if (character.seedReadyDate) {
      if (character.seedReadyDate > new Date().valueOf()) {
        throw new Error("Cannot harvest - not ready yet");
      }
      character.seedReadyDate = undefined;
      numApples = Math.floor(Math.random() * 4);
      if (numApples == 0) {
        numApples = 1;
      }
    } else if (character.megaSeedReadyDate) {
      if (character.megaSeedReadyDate > new Date().valueOf()) {
        throw new Error("Cannot harvest - not ready yet");
      }
      character.megaSeedReadyDate = undefined;
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
    } else {
      throw new Error(`No seeds planted`);
    }
    character.bag.apples += numApples;
  },
  plantSeed(state, index) {
    const character = state.characters[index];
    character.seedReadyDate = new Date().valueOf() + SEED_GROW_TIME;
    character.bag.seeds--;
  },
  plantMegaSeed(state, index) {
    const character = state.characters[index];
    character.megaSeedReadyDate = new Date().valueOf() + MEGA_SEED_GROW_TIME;
    character.bag.megaSeeds--;
  },
  sellApple(state, index) {
    const character = state.characters[index];
    if (character.bag.apples > 0) {
      character.bag.apples--;
      character.bag.money += 10;
    } else {
      throw new Error(`Not enough apples. You should try growing some.`);
    }
  },
  sellPie(state, index) {
    const character = state.characters[index];
    if (character.bag.pies > 0) {
      character.bag.pies--;
      character.bag.money += 1000;
    } else {
      throw new Error(`Not enough pies. You should try cooking some.`);
    }
  },
  storeMoney(state, index) {
    const character = state.characters[index];
    if (!state.storage) {
      state.storage = 0;
    }
    state.storage += character.bag.money;
    character.bag.money = 0;
  },
  takeMoney(state, index) {
    const character = state.characters[index];
    character.bag.money += state.storage;
    state.storage = 0;
  },
  makeWeapon(state, index) {
    const character = state.characters[index];
    if (!character.weaponLevel && character.bag.money >= WEAPON_COST) {
      character.weaponLevel = 1;
      character.bag.money -= WEAPON_COST;
    } else {
      throw new Error(
        "You do not have enough money. Come back when you have " + WEAPON_COST
      );
    }
  },
  upgradeWeapon(state, index) {
    const character = state.characters[index];
    if (character.weaponLevel) {
      const requiredMoney = Math.floor(
        WEAPON_COST * 0.5 * character.weaponLevel
      );
      if (character.bag.money >= requiredMoney) {
        character.bag.money -= requiredMoney;
        const roll = Math.random();
        if (roll > 0.3) {
          character.weaponLevel++;
        } else if (roll < 0.1) {
          character.weaponLevel--;
        }
      } else {
        throw new Error(
          "Upgrading is not cheap you know. Come back when you have " +
            requiredMoney
        );
      }
    }
  },
  makePie(state, index) {
    const character = state.characters[index];
    if (character.bag.apples >= 100) {
      character.bag.apples -= 100;
      character.bag.pies++;
    } else {
      throw new Error("The pie recipe needs 100 apples");
    }
  }
};

function initBag(character: Character) {
  if (!character.bag) {
    character.bag = {
      apples: 0,
      money: 0,
      seeds: 0,
      megaSeeds: 0,
      pies: 0
    };
  } else {
    if (!character.bag.megaSeeds) {
      character.bag.megaSeeds = 0;
    }
    if (!character.bag.pies) {
      character.bag.pies = 0;
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
