import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from '@/types/root'
import { Accounts } from './modules/accounts'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
  },
  modules: {
    Accounts
  },
})
