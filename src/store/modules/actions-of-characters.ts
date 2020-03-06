import { ActionTree } from "vuex";
import { CharactersState } from "@/types/characters-state";
import { RootState } from "@/types/root";
import { Character } from "@/types/character";

function assertCharacter(selectedCharacter: any) {
  if (!selectedCharacter) {
    throw new Error(`No character selected`);
  }
}

// actions
export const actionsOfCharacters: ActionTree<CharactersState, RootState> = {
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
  sellPizza({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("sellPizza", getters.selectedCharacterIndex);
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
  makePizza({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("makePizza", getters.selectedCharacterIndex);
  },
  deafeatEnemy({ commit, getters }, enemyRank: number) {
    assertCharacter(getters.selectedCharacter);
    commit("deafeatEnemy", {
      index: getters.selectedCharacterIndex,
      enemyRank
    });
  },
  buyTicket({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("buyTicket", getters.selectedCharacterIndex);
  },
  payForBattle({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("payForBattle", getters.selectedCharacterIndex);
  },
  doQuest({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    commit("doQuest", getters.selectedCharacterIndex);
  }
};
