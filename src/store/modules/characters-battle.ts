import { CharactersState } from "@/types/characters-state";
import { MutationTree, ActionTree } from "vuex";
import { RootState } from "@/types/root";
import {
  assertCharacter,
  assertMoney,
  assertTicket
} from "./character-assertions";

const TICKET_COST = 5;

export const battleActions: ActionTree<CharactersState, RootState> = {
  deafeatEnemy({ commit, getters }, enemyRank: number) {
    assertCharacter(getters.selectedCharacter);
    commit("deafeatEnemy", {
      index: getters.selectedCharacterIndex,
      enemyRank
    });
  },
  buyTicket({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertMoney(getters.selectedCharacter, TICKET_COST);
    commit("buyTicket", getters.selectedCharacterIndex);
  },
  payForBattle({ commit, getters }) {
    assertCharacter(getters.selectedCharacter);
    assertTicket(getters.selectedCharacter);
    commit("payForBattle", getters.selectedCharacterIndex);
  }
};

export const battleMutations: MutationTree<CharactersState> = {
  deafeatEnemy(
    state: CharactersState,
    { index, enemyRank }: { index: number; enemyRank: number }
  ) {
    const character = state.characters[index];
    if (!character.rankBeaten || enemyRank > character.rankBeaten) {
      character.rankBeaten = enemyRank;
    }
    character.bag.apples += Math.ceil(Math.pow(8, enemyRank) / 10);
  },
  buyTicket(state: CharactersState, index: number) {
    const character = state.characters[index];
    if (character.bag.money >= TICKET_COST) {
      character.bag.money -= TICKET_COST;
      character.bag.tickets++;
    }
  },
  payForBattle(state: CharactersState, index: number) {
    const character = state.characters[index];
    character.bag.tickets--;
  }
};
