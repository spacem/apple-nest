import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from '@/types/root'
import { accounts } from './modules/accounts'
import { characters } from './modules/characters'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
  },
  modules: {
    accounts,
    characters
  },
  plugins: [new VuexPersistence().plugin]
})
