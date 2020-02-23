import { ActionTree, MutationTree, GetterTree, ModuleTree, Module } from 'vuex'
import { RootState } from '@/types/root'
import { AccountsState } from '@/types/accounts-state'
import { Account } from '@/types/account'

// initial state
const state: AccountsState = {
    accounts: []
}

// getters
const getters: GetterTree<AccountsState, RootState> = {
}

// actions
const actions: ActionTree<AccountsState, RootState> = {
    addAccount({ commit }, account: Account) {
        commit('addAccount', account)
    }
}

// mutations
const mutations: MutationTree<AccountsState> = {
    addAccount(state, account) {
        state.accounts.push(account)
    }
}

export const accounts: Module<AccountsState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
