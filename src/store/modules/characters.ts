import { Module } from "vuex";
import { RootState } from "@/types/root";
import { CharactersState } from "@/types/characters-state";
import { gettersOfCharacters } from "./getters-of-characters";
import { actionsOfCharacters } from "./actions-of-characters";
import { mutationsOfCharacters } from "./mutations-of-characters";

// initial state
const state: CharactersState = {
  storage: 0,
  characters: [],
  selectedIndex: undefined
};

export const characters: Module<CharactersState, RootState> = {
  namespaced: true,
  state,
  getters: gettersOfCharacters,
  actions: actionsOfCharacters,
  mutations: mutationsOfCharacters
};
