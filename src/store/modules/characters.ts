import { ActionTree, MutationTree, GetterTree, Module } from 'vuex'
import { RootState } from '@/types/root'
import { CharactersState } from '@/types/characters-state'
import { Character } from '@/types/character'

// initial state
const state: CharactersState = {
    characters: [],
    selectedCharacter: undefined
}

// getters
const getters: GetterTree<CharactersState, RootState> = {
    characters: (state) => {
        return state.characters;
    },
    selectedCharacter: (state) => {
        return state.selectedCharacter;
    }
}

// actions
const actions: ActionTree<CharactersState, RootState> = {
    create({ commit }, character: Character) {
        commit('create', character)
    },
    select({ commit }, character: Character) {
        commit('select', character)
    }
}

// mutations
const mutations: MutationTree<CharactersState> = {
    create(state, character: Character) {
        state.characters.push(character)
    },
    select(state, character: Character) {
        state.selectedCharacter = character;
    }
}

export const characters: Module<CharactersState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
