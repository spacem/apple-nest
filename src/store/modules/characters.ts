import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import { RootState } from "@/types/root";
import { CharactersState } from "@/types/characters-state";
import { Character } from "@/types/character";

const REWARD_TIME = 60 * 60;
const WEAPON_COST = 50;
const ARMOUR_COST = 20;
const SEED_GROW_TIME = 1000 * 30;
const MEGA_SEED_GROW_TIME = 1000 * 600;
const LEGENDARY_SEED_GROW_TIME = 1000 * 60 * 60;
const PIE_COST = 100;
const MEGA_SEED_COST = 20;
const LEGENDARY_SEED_COST = 50;

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
    assertCharacter(getters.selectedCharacter);
    commit("collectEventReward", getters.selectedCharacterIndex);
  },
  buySeed({ commit, getters }) {
    commit("buySeed", getters.selectedCharacterIndex);
  },
  buyMegaSeed({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("buyMegaSeed", getters.selectedCharacterIndex);
  },
  buyLegendarySeed({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("buyLegendarySeed", getters.selectedCharacterIndex);
  },
  harvest({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("harvest", getters.selectedCharacterIndex);
  },
  plantSeed({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("plantSeed", getters.selectedCharacterIndex);
  },
  plantMegaSeed({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("plantMegaSeed", getters.selectedCharacterIndex);
  },
  plantLegendarySeed({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("plantLegendarySeed", getters.selectedCharacterIndex);
  },
  sellApple({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("sellApple", getters.selectedCharacterIndex);
  },
  sellPie({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("sellPie", getters.selectedCharacterIndex);
  },
  storeMoney({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("storeMoney", getters.selectedCharacterIndex);
  },
  takeMoney({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("takeMoney", getters.selectedCharacterIndex);
  },
  makeWeapon({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("makeWeapon", getters.selectedCharacterIndex);
  },
  upgradeWeapon({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("upgradeWeapon", getters.selectedCharacterIndex);
  },
  makeArmour({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("makeArmour", getters.selectedCharacterIndex);
  },
  upgradeArmour({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("upgradeArmour", getters.selectedCharacterIndex);
  },
  makePie({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("makePie", getters.selectedCharacterIndex);
  },
  deafeatEnemy({ commit, getters }, enemyRank: number) {
    assertCharacter(getters.selectedCharacter);
    commit("deafeatEnemy", {
      index: getters.selectedCharacterIndex,
      enemyRank
    });
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
        `Not enough money. Maybe you can take part in the event or sell some apples.`
      );
    }
  },
  buyMegaSeed(state, index) {
    const character = state.characters[index];
    if (character) {
      if (character.bag.money >= MEGA_SEED_COST) {
        character.bag.money -= MEGA_SEED_COST;
        character.bag.megaSeeds++;
      } else {
        throw new Error(
          `Mega seeds cost ${MEGA_SEED_COST}. You need more money`
        );
      }
    }
  },
  buyLegendarySeed(state, index) {
    const character = state.characters[index];
    if (character) {
      if (character.bag.money >= LEGENDARY_SEED_COST) {
        character.bag.money -= LEGENDARY_SEED_COST;
        character.bag.legendarySeeds++;
      } else {
        throw new Error(
          `Legendary seeds cost ${LEGENDARY_SEED_COST}. You need more money`
        );
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
        numApples = 200;
      } else if (roll > 0.85) {
        numApples = 100;
      } else if (roll > 0.4) {
        numApples = 60;
      } else {
        numApples = 30;
      }
    } else if (character.legendarySeedReadyDate) {
      if (character.legendarySeedReadyDate > new Date().valueOf()) {
        throw new Error("Cannot harvest - not ready yet");
      }
      character.legendarySeedReadyDate = undefined;
      let roll = Math.random();
      if (roll > 0.95) {
        numApples = 2000;
      } else if (roll > 0.85) {
        numApples = 1000;
      } else if (roll > 0.4) {
        numApples = 800;
      } else {
        numApples = 500;
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
  plantLegendarySeed(state, index) {
    const character = state.characters[index];
    character.legendarySeedReadyDate =
      new Date().valueOf() + LEGENDARY_SEED_GROW_TIME;
    character.bag.legendarySeeds--;
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
  makeArmour(state, index) {
    const character = state.characters[index];
    if (!character.armourLevel && character.bag.money >= ARMOUR_COST) {
      character.armourLevel = 1;
      character.bag.money -= ARMOUR_COST;
    } else {
      throw new Error(
        "You do not have enough money. Come back when you have " + ARMOUR_COST
      );
    }
  },
  upgradeArmour(state, index) {
    const character = state.characters[index];
    if (character.armourLevel) {
      const requiredMoney = Math.floor(
        ARMOUR_COST * 0.5 * character.armourLevel
      );
      if (character.bag.money >= requiredMoney) {
        character.bag.money -= requiredMoney;
        const roll = Math.random();
        if (roll > 0.3) {
          character.armourLevel++;
        } else if (roll < 0.1) {
          character.armourLevel--;
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
    if (character.bag.apples >= PIE_COST) {
      character.bag.apples -= PIE_COST;
      character.bag.pies++;
    } else {
      throw new Error(`The pie recipe needs ${PIE_COST} apples`);
    }
  },
  deafeatEnemy(state, { index, enemyRank }) {
    const character = state.characters[index];
    character.bag.money += Math.pow(10, enemyRank);
  }
};

function initBag(character: Character) {
  if (!character.bag) {
    character.bag = {
      apples: 0,
      money: 0,
      seeds: 0,
      megaSeeds: 0,
      legendarySeeds: 0,
      pies: 0
    };
  } else {
    if (!character.bag.megaSeeds) {
      character.bag.megaSeeds = 0;
    }
    if (!character.bag.pies) {
      character.bag.pies = 0;
    }
    if (!character.bag.legendarySeeds) {
      character.bag.legendarySeeds = 0;
    }
  }
}

function assertCharacter(selectedCharacter: any) {
  if (!selectedCharacter) {
    throw new Error(`No character selected`);
  }
}

export const characters: Module<CharactersState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
