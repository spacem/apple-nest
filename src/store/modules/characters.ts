import { ActionTree, MutationTree, GetterTree, Module } from 'vuex'
import { RootState } from '@/types/root'
import { CharactersState } from '@/types/characters-state'
import { Character } from '@/types/character'

// initial state
const state: CharactersState = {
    characters: []
}

// getters
const getters: GetterTree<CharactersState, RootState> = {
    characters: (state) => {
        return state.characters;
    }
}

// actions
const actions: ActionTree<CharactersState, RootState> = {
    create({ commit }, character: Character) {
        commit('create', character)
    }
}

// mutations
const mutations: MutationTree<CharactersState> = {
    create(state, character: Character) {
        state.characters.push(character)
    }
}

export const characters: Module<CharactersState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
