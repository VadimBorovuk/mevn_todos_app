<template>
  <header-field
      :user="user"
      :logoutFromAcc="logoutFromAcc"
  />

  <div class="task__zone">
    <search-field
        :getFetchDataByUser="getFetchDataByUser"
        :totalFilters="totalFilters"
        @resetSearch="resetSearch"
    />

    <task-component
        :userData="user"
        :allTasksData="myTasksData"
        :totalFilters="totalFilters"
        :getFetchDataByUser="getFetchDataByUser"
        :resetFilters="resetFilters"
        @setPagination="setPagination"
    />
  </div>

</template>

<script>

import {computed, onMounted, reactive, ref} from "vue";
import router from "@/router";
import {useStore} from 'vuex';
import axios from 'axios';
import decode from "jwt-decode";

import taskComponent from "@/components/TaskComponent";
import searchField from "@/components/UI/searchBlock";
import headerField from "@/components/UI/headerBlock";
import {ElLoading} from 'element-plus';

export default {
  name: 'HomeView',
  components: {
    taskComponent,
    searchField,
    headerField
  },
  setup() {
    const store = useStore();
    const tokenData = ref(localStorage.getItem('user_token')).value;
    const totalFilters = reactive({});

    const user = computed(() => decode(tokenData)).value;
    const myTasksData = computed(() => store.getters.tasks_my);

    const logoutFromAcc = () => {
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('user_token')
      router.push({path: '/authorization'})
    }

    const resetSearch = () =>{
      totalFilters.title = ''
    }

    const resetFilters = () => {
      totalFilters.title = ''
      totalFilters.isChecked = ''
      totalFilters.sort = ''
      getFetchDataByUser(1)
    }

    const getFetchDataByUser = (page) => {
      const loading = ElLoading.service({background: 'rgba(0, 0, 0, 0.7)'})

      store.dispatch('tasks/getMyTasks', {userId: user.id.id, page, filters: totalFilters}).then(() => {
        loading.close()
      }).catch(() => loading.close())
    }

    const setPagination = (page) => {
      getFetchDataByUser(page)
    }

    onMounted(() => getFetchDataByUser(1))
    return {
      user,
      tokenData,
      totalFilters,
      myTasksData,
      getFetchDataByUser,
      resetFilters,
      logoutFromAcc,
      resetSearch,
      setPagination
    }
  }
}
</script>
<style>
body {
  background-image: url('http://orig00.deviantart.net/acb6/f/2013/303/7/6/gif___running_through_the_rain_by_turst67-d6scius.gif');
  background-size: cover;
  background-color: #fff;
  background-repeat-y: no-repeat;
  min-height: 100vh;
}
</style>

<style scoped>

.task__zone {
  padding: 20px 0;
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--task-bg-main);
  opacity: .9;
  border-radius: 5px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.3), 0 1px 6px 0 rgba(0, 0, 0, 0.15);
}
</style>
