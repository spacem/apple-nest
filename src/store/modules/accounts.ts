import { ActionTree, MutationTree, GetterTree, ModuleTree, Module } from 'vuex'
import { RootState } from '@/types/root'
import { AccountState } from '@/types/account-state'

// initial state
const state: AccountState = {
    accounts: []
}

// getters
const getters: GetterTree<AccountState, RootState> = {
}

// actions
const actions: ActionTree<AccountState, RootState> = {
    getAll({ commit }) {
        commit('setProducts', [])
    }
}

// mutations
const mutations: MutationTree<AccountState> = {
    setAccounts(state, accounts) {
        state.accounts = accounts
    }
}

export const Accounts: Module<AccountState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
