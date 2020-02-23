import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from '@/types/root'
import { accounts } from './modules/accounts'
import { characters } from './modules/characters'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
  },
  modules: {
    accounts,
    characters
  },
})
