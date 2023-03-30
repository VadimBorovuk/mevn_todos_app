import { createStore } from 'vuex'

import userModule from './modules/user'
import tasksModule from './modules/tasks'
import getters from './getters'

export default createStore({
  modules: {
    user: userModule,
    tasks: tasksModule
  },
  getters
})
