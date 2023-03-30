<template>
  <div class="tasks__view">
    <h2 class="tasks__count" v-if="allTasksData.total_items > 0">Tasks count: {{ allTasksData.total_items }}</h2>

    <div class="tasks__filters">
      <el-select @change="getFetchDataByUser(1)" v-model="$props.totalFilters.isChecked" class="tasks__filters--check"
                 placeholder="Select status task" size="large">
        <el-option label="All" value=""/>
        <el-option label="Done" :value="1"/>
        <el-option label="Wait" :value="0"/>
      </el-select>

      <el-select @change="getFetchDataByUser(1)" v-model="$props.totalFilters.sort" class="tasks__filters--sort"
                 placeholder="Select priority" size="large">
        <el-option label="Low" :value="0"/>
        <el-option label="Medium" :value="1"/>
        <el-option label="High" :value="2"/>
      </el-select>

      <el-icon class="filters__icon" @click="resetFilters" title="Clear filters">
        <Close/>
      </el-icon>

      <el-icon class="filters__icon" @click="openTaskCreate" title="Add new task">
        <Plus/>
      </el-icon>
    </div>

    <el-pagination
        v-if="allTasksData.total_items > +allTasksData.limit"
        :page-size="+allTasksData.limit"
        layout="prev, pager, next"
        :total="+allTasksData.total_items"
        @current-change="handlePagination"
    />

    <ul class="lists__tasks">
      <task-item
          v-for="(task, idx) in allTasksData.tasks" :key="idx"
          :totalTask="task"
          @deleteTaskEmit="deleteTask"
          @openTaskEmit="openTaskEdit"
      />
    </ul>
    <div v-show="allTasksData.total_items === 0" class="lists__empty">
      <el-icon>
        <FolderDelete/>
      </el-icon>
      <p>Not found task ...</p>
    </div>

    <el-dialog v-model="dialogFormVisible"
               :title="statusActivityForm ? 'Create Task' : 'Update Task'"
    >
      <el-form
          :ref="statusActivityForm ? 'refFormCreate': 'refFormUpdate'"
          :model="currentObjTask"
          :rules="statusActivityForm ? rulesCreate: rulesUpdate"
          label-width="120px"
      >
        <el-form-item label="Title" prop="title" label-width="200">
          <el-input v-model="currentObjTask.title"/>
        </el-form-item>
        <el-form-item label="Description" prop="description" label-width="200">
          <el-input type="textarea" v-model="currentObjTask.description"/>
        </el-form-item>
        <el-form-item label="Priority" label-width="200">
          <el-select v-model="currentObjTask.sort" placeholder="Please select priority">
            <el-option label="Low" :value="0"/>
            <el-option label="Medium" :value="1"/>
            <el-option label="High" :value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!statusActivityForm" label="Checked" label-width="200">
          <el-checkbox :label="currentObjTask.isChecked ? 'done': 'wait'" v-model="currentObjTask.isChecked"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button v-if="statusActivityForm" type="danger" @click="resetField">
          reset
        </el-button>
        <button
            @click="statusActivityForm ? checkValidForm(refFormCreate, statusActivityForm) : checkValidForm(refFormUpdate, statusActivityForm)">
          {{ statusActivityForm ? 'create' : 'update' }}
        </button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed, inject, reactive, ref} from "vue";
import taskItem from "@/components/UI/taskItem";
import {dateParse} from "@/components/mixins/dateParse";

export default {
  props: ['allTasksData', 'getFetchDataByUser', 'totalFilters', 'resetFilters'],
  mixins: [dateParse],
  components: {
    taskItem
  },
  setup(props, {emit}) {
    const store = useStore()
    const ElMessage = inject('elMessage');
    const ElNotification = inject('elNotification');
    let statusActivityForm = ref(true)
    let refFormCreate = ref()
    let refFormUpdate = ref()
    let dialogFormVisible = ref(false)
    const myTestObj = reactive({})
    const currentObjTask = computed(() => store.getters.current_Task);

    const rulesCreate = reactive({
      title: [
        {required: true, message: 'Please enter title', trigger: 'blur'},
        {min: 3, max: 128, message: 'Length should be 3 to 128', trigger: 'blur'},
      ],
      description: [
        {required: true, message: 'Please enter description', trigger: 'blur'},
        {min: 3, max: 512, message: 'Length should be 3 to 512', trigger: 'blur'},
      ]
    })

    const rulesUpdate = reactive({
      title: [
        {required: true, message: 'Please enter title', trigger: 'blur'},
        {min: 3, max: 128, message: 'Length should be 3 to 128', trigger: 'blur'},
      ],
      description: [
        {required: true, message: 'Please enter description', trigger: 'blur'},
        {min: 3, max: 512, message: 'Length should be 3 to 512', trigger: 'blur'},
      ]
    })

    const resetField = () => {
      store.commit('tasks/resetTask')
    }

    const handlePagination = (page) => {
      emit('setPagination', page);
    }

    const openTaskCreate = () => {
      statusActivityForm.value = true
      dialogFormVisible.value = true
      store.commit('tasks/changeTaskData', {})
    }

    const openTaskEdit = (bodyTask) => {
      statusActivityForm.value = false
      dialogFormVisible.value = true
      store.commit('tasks/changeTaskData', bodyTask)
    }

    const checkValidForm = (refNameForm, method) => {
      if (!refNameForm) return
      refNameForm.validate((valid) => {
        if (valid) {
          return method ? createTask() : updateTask()
        } else {
          return false
        }
      })
    }

    const createTask = () => {
      store.dispatch('tasks/createTaskByUser', currentObjTask.value).then((answer) => {

        props.getFetchDataByUser(1)
        store.commit('tasks/resetTask')
        dialogFormVisible.value = false
        ElNotification({
          title: 'Created success',
          dangerouslyUseHTMLString: true,
          message: `
            <div>
                <h3 style="font-weight: 100"><span>Task</span> <b>${answer.title.length > 15 ? answer.title.substring(0, 15) + '...' : answer.title}</b></h3>
            </div>
          `,
          type: 'success',
        })
      }).catch((e) => {
        ElMessage({
          message: e.response.data.message,
          type: 'error',
        })
        dialogFormVisible.value = true
      })
    }

    const updateTask = () => {
      let {_id, title, sort, isChecked, description} = currentObjTask.value
      let dataTask = {_id, title, sort, isChecked, description}
      store.dispatch('tasks/updateTaskByUser', dataTask).then((answer) => {
        store.commit('tasks/resetTask')
        props.getFetchDataByUser(1)
        dialogFormVisible.value = false

        ElNotification({
          title: 'Updated success',
          dangerouslyUseHTMLString: true,
          message: `
            <div>
                <h3 style="font-weight: 100"><span>Task</span> <b>${answer.title.length > 15 ? answer.title.substring(0, 15) + '...' : answer.title}</b></h3>
            </div>
          `,
          type: 'warning',
        })
      }).catch((e) => {
        ElMessage({
          message: e.response.data.message,
          type: 'error',
        })
        dialogFormVisible.value = true
      })
    }

    const deleteTask = (taskId) => {
      store.dispatch('tasks/deleteTask', taskId).then((answer) => {
        props.getFetchDataByUser(1)
        ElNotification({
          title: 'Deleted',
          dangerouslyUseHTMLString: true,
          message: `
            <div>
                <h3 style="font-weight: 100"><span>Task</span> <b>${answer.message}</b></h3>
            </div>
          `,
          type: 'error',
        })

      }).catch(() => {
      })
    }

    return {
      rulesCreate,
      rulesUpdate,
      ElMessage,
      ElNotification,
      statusActivityForm,
      currentObjTask,
      dialogFormVisible,
      myTestObj,
      refFormCreate,
      refFormUpdate,
      handlePagination,
      checkValidForm,
      createTask,
      openTaskCreate,
      openTaskEdit,
      updateTask,
      resetField,
      deleteTask
    }
  },
}
</script>

<style lang="scss" scoped>
.tasks__view {

  .tasks__count {
    font-size: var(--title-font-size);
    margin-bottom: 15px;
  }

  .tasks__filters {

    display: flex;
    align-items: center;
    justify-content: center;

    .tasks__filters--check {
      margin-right: 7px;
    }

    .tasks__filters--sort {
      margin: 0 7px;
    }

    .filters__icon {
      cursor: pointer;
      background-color: rgba(255, 255, 255, .9);
      border-radius: 5px;
      font-size: 40px;
    }
  }

  .lists__tasks {
    max-width: 1100px;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    gap: 50px;
    margin: 0 auto;
  }

  .lists__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    padding: 50px 0;

    p {
      margin-left: 10px;
    }
  }
}
</style>

