import { CharactersState } from "@/types/characters-state";
import { MutationTree, ActionTree } from "vuex";
import { RootState } from "@/types/root";
import { assertCharacter, assertMoney } from "./character-assertions";
import { Character } from "@/types/character";

const WEAPON_COST = 50;
const ARMOUR_COST = 20;

function calculateWeaponUpgradeCost(character: Character) {
  return Math.floor(WEAPON_COST * 0.5 * character.weaponLevel);
}

function calculateArmourUpgradeCost(character: Character) {
  return Math.floor(ARMOUR_COST * 0.5 * character.armourLevel);
}

export const blacksmithActions: ActionTree<CharactersState, RootState> = {
  makeWeapon({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertMoney(getters.selectedCharacter, WEAPON_COST);
    commit("makeWeapon", getters.selectedCharacterIndex);
  },
  upgradeWeapon({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    const upgradeCost = calculateWeaponUpgradeCost(getters.selectedCharacter);
    assertMoney(getters.selectedCharacter, upgradeCost);
    commit("upgradeWeapon", getters.selectedCharacterIndex);
  },
  makeArmour({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertMoney(getters.selectedCharacter, ARMOUR_COST);
    commit("makeArmour", getters.selectedCharacterIndex);
  },
  upgradeArmour({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    const upgradeCost = calculateArmourUpgradeCost(getters.selectedCharacter);
    assertMoney(getters.selectedCharacter, upgradeCost);
    commit("upgradeArmour", getters.selectedCharacterIndex);
  }
};

export const blacksmithMutations: MutationTree<CharactersState> = {
  makeWeapon(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (!character.weaponLevel && character.bag.money >= WEAPON_COST) {
      character.weaponLevel = 1;
      character.bag.money -= WEAPON_COST;
    }
  },
  upgradeWeapon(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character.weaponLevel) {
      const requiredMoney = calculateWeaponUpgradeCost(character);
      if (character.bag.money >= requiredMoney) {
        character.bag.money -= requiredMoney;
        const roll = Math.random();
        if (character.weaponLevel <= 1 || roll > 0.3) {
          character.weaponLevel++;
        } else if (roll < 0.1) {
          character.weaponLevel--;
        }
      }
    }
  },
  makeArmour(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (!character.armourLevel && character.bag.money >= ARMOUR_COST) {
      character.armourLevel = 1;
      character.bag.money -= ARMOUR_COST;
    }
  },
  upgradeArmour(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character.armourLevel) {
      const requiredMoney = calculateArmourUpgradeCost(character);
      if (character.bag.money >= requiredMoney) {
        character.bag.money -= requiredMoney;
        const roll = Math.random();
        if (character.armourLevel <= 1 || roll > 0.3) {
          character.armourLevel++;
        } else if (roll < 0.1) {
          character.armourLevel--;
        }
      }
    }
  }
};
