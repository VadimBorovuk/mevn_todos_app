import {createTask, deleteTask, editTask} from "@/api/tasks";
import {getTasksByUser} from "@/api/tasks";

const tasksModule = {
    namespaced: true,
    state: {
        totalObjTask: {},
        currentTaskId: null,
        infoMyTasks: {},
        currentObjTask: {
            title: '',
            isChecked: false,
            sort: 0,
        }
    },
    mutations: {
        setMyTasks: (state, data) => {
            state.infoMyTasks = data
        },
        changeTaskData: (state, data) => {
            state.currentObjTask = data
        },
        setCurrentObj: (state, taskId) => {
            state.currentTaskId = taskId
        },
        resetTask: (state) => {
            state.currentObjTask = {
                title: '',
                isChecked: false,
                sort: null
            }
        }
    },
    actions: {
        getMyTasks({commit}, {userId, page, limit, filters}) {
            return new Promise((resolve, reject) => {
                getTasksByUser(userId, page, limit, filters).then(response => {
                    if (!response.data) {
                        reject('error')
                    }
                    const data = response.data
                    commit('setMyTasks', data)

                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        createTaskByUser({commit}, payload) {
            return new Promise((resolve, reject) => {
                createTask(payload).then(response => {
                    if (!response.data) {
                        reject('error')
                    }
                    const data = response.data
                    commit('changeTaskData', payload)
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        updateTaskByUser({commit}, payload) {
            return new Promise((resolve, reject) => {
                editTask(payload).then(response => {
                    if (!response.data) {
                        reject('error')
                    }
                    const data = response.data
                    commit('changeTaskData', payload)
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        deleteTask({commit}, taskId) {
            return new Promise((resolve, reject) => {
                deleteTask(taskId).then(response => {
                    if (!response.data) {
                        reject('error')
                    }
                    const data = response.data
                    commit('setCurrentObj', taskId)
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default tasksModule
