import { Module, MutationTree, ActionTree } from "vuex";
import { RootState } from "@/types/root";
import { CharactersState } from "@/types/characters-state";
import { gettersOfCharacters } from "./getters-of-characters";
import { characterMutations, characterActions } from "./characters-character";
import { seedMutations, seedActions } from "./characters-seed";
import { foodMutations, foodActions } from "./characters-food";
import { storageMutations, storageActions } from "./characters-storage";
import { questMutations, questActions } from "./characters-quest";
import {
  blacksmithMutations,
  blacksmithActions
} from "./characters-blacksmith";
import { battleActions, battleMutations } from "./characters-battle";

// initial state
const state: CharactersState = {
  storage: 0,
  characters: [],
  selectedIndex: undefined
};

const mutationsOfCharacters: MutationTree<CharactersState> = {
  ...characterMutations,
  ...seedMutations,
  ...foodMutations,
  ...blacksmithMutations,
  ...storageMutations,
  ...questMutations,
  ...battleMutations
};

export const actionsOfCharacters: ActionTree<CharactersState, RootState> = {
  ...characterActions,
  ...seedActions,
  ...foodActions,
  ...blacksmithActions,
  ...storageActions,
  ...questActions,
  ...battleActions
};

export const characters: Module<CharactersState, RootState> = {
  namespaced: true,
  state,
  getters: gettersOfCharacters,
  actions: actionsOfCharacters,
  mutations: mutationsOfCharacters
};
