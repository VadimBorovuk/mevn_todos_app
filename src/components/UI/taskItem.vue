<template>
  <li class="task__item" :class="totalTask.isChecked ? 'task__item--checked': ''">
    <div class="task__head">
      <div class="head__action">

        <el-button title="Delete Task" :type="totalTask.isChecked ? 'success' :'danger'"
                   @click="openTaskEmit(totalTask)" circle>
          <el-icon>
            <Edit/>
          </el-icon>
        </el-button>

        <el-popover
            placement="bottom-end"
            v-if="totalTask.title.length > 17"
            :width="400"
            trigger="hover">
          <template #reference>
            <p class="title">
              {{ totalTask.title.substring(0, 17) + '...' }}
            </p>
          </template>
          {{ totalTask.title }}
        </el-popover>
        <p class="title" v-else>
          {{ totalTask.title }}
        </p>

      </div>
      <el-popconfirm
          title="Are you sure to delete this?"
          @confirm="deleteTaskEmit(totalTask._id)"
          confirm-button-text="Yes"
          cancel-button-text="No"
          icon-color="#626AEF"
      >
        <template #reference>
          <el-button title="Delete Task" type="danger" circle>
            <el-icon>
              <Delete/>
            </el-icon>
          </el-button>
        </template>
      </el-popconfirm>
    </div>

    <div class="task__foot">

      <el-popover
          placement="bottom-end"
          v-if="totalTask.description.length > 100"
          :width="450"
          trigger="hover">
        <template #reference>
          <p class="task__description title">
            {{ totalTask.description.substring(0, 100) + '...' }}
          </p>
        </template>
        {{ totalTask.description }}
      </el-popover>
      <p class="task__description title" v-else>
        {{ totalTask.description }}
      </p>

      <el-button
          :title="totalTask.sort === 0 ? 'Low':
                  totalTask.sort === 1 ? 'Medium': 'High'"
          :type="totalTask.sort === 0 ? 'success':
                  totalTask.sort === 1 ? 'warning': 'danger'"
          circle>
        <el-icon>
          <Flag/>
        </el-icon>
      </el-button>

      <p class="date-field">
        created:
        <b>
          <span style="margin-right: 5px">
            {{ getFormattedDateOrg(totalTask.created_at) }}
          </span>
          <span>
            {{ getFormattedTimeRequest(totalTask.created_at) }}
          </span>
        </b>
      </p>
    </div>
  </li>
</template>

<script>

import {dateParse} from "@/components/mixins/dateParse";

export default {
  name: 'taskView',
  props: ['totalTask', 'deleteTask'],
  mixins: [dateParse],
  setup(props, {emit}) {

    const deleteTaskEmit = (id) => {
      emit('deleteTaskEmit', id);
    }

    const openTaskEmit = (taskData) => {
      emit('openTaskEmit', taskData);
    }

    return {deleteTaskEmit, openTaskEmit}
  }
}

</script>

<style lang="scss" scoped>
.task__item {
  transition: all 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.3), 0 1px 6px 0 rgba(0, 0, 0, 0.15);
  margin: 15px 2%;
  min-width: 460px;
  max-width: 460px;
  background-color: var(--task-bg-wait);

  .task__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 15px 20px;
    font-size: 1.2em;
    line-height: 2em;
    font-weight: bold;
    cursor: pointer;

    .head__action {
      display: flex;
      align-items: center;

      .title {
        text-align: left;
        margin-left: 10px;
        word-break: break-word;
      }
    }
  }

  .task__foot {
    position: relative;
    min-height: 115px;
    word-break: break-word;
    background-color: #fafafa;
    padding: 5px 20px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    .task__description {
      text-align: left;
      margin-right: 30px;
    }

    .date-field {
      font-family: cursive;
      position: absolute;
      bottom: 5px;
      right: 15px;
    }
  }

  &--checked {
    background-color: var(--task-bg-check);

    .title {
      text-decoration: line-through;
    }
  }

}
</style>
