<template>
  <div class="search__input">
    <div class="search__box" :class="openField ? 'search__box--open': ''">
      <input type="text"
             ref="searchRef"
             @keyup.enter="$props.getFetchDataByUser(1)"
             placeholder="searchTask..."
             v-model="$props.totalFilters.title"/>
      <span class="search__field">
       <el-icon class="search__icon">
         <Search v-if="!openField" @click="openField = true"/>
         <Search v-else @click="$props.getFetchDataByUser(1)"/>
       </el-icon>
    </span>
      <el-icon class="active-icon reset-icon" @click="resetSearch">
        <Close/>
      </el-icon>
      <el-icon class="active-icon close-icon" @click="openField = false">
        <SemiSelect/>
      </el-icon>
    </div>
  </div>
</template>

<script>


import {ref, watch} from "vue";

export default {
  props: ['totalFilters', 'getFetchDataByUser'],
  setup(props, {emit}) {
    const searchRef = ref(false)
    const openField = ref(false)

    watch(openField, () => {
      if (!openField.value) resetSearch()
      searchRef.value.focus();
    });

    const resetSearch = () => {
      emit('resetSearch')
      searchRef.value.focus();
    }

    return {openField, searchRef, resetSearch}
  }
}
</script>

<style lang="scss" scoped>

* {
  box-sizing: border-box;
}

.search__input {
  display: flex;
  justify-content: center;

  .search__box {
    position: relative;
    width: 100%;
    max-width: 60px;
    height: 55px;
    margin: 0 50px;
    background-color: #fff;
    border-radius: 6px;
    transition: all 0.5s ease-in-out;

    input {
      position: relative;
      width: 100%;
      height: 100%;
      font-size: 16px;
      font-weight: 400;
      color: #333;
      padding: 0 15px;
      border: none;
      border-radius: 6px;
      outline: none;
      transition: all 0.5s ease-in-out;
    }

    .search__field {
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 6px;
      cursor: pointer;

      .search__icon {
        font-size: 30px;
        color: #1c1c1c;
      }
    }

    .active-icon {
      position: absolute;
      top: 50%;
      right: -40px;
      font-size: 30px;
      color: #1c1c1c;
      padding: 5px;
      transform: translateY(-50%);
      transition: all 0.5s ease-in-out;
      cursor: pointer;
      pointer-events: none;
      opacity: 0;
    }

    &--open {
      max-width: 350px;

      input {
        padding: 0 15px 0 65px;
      }

      .search__field {
        border-radius: 6px 0 0 6px;
      }

      .active-icon {
        transform: translateY(-50%) rotate(180deg);
        pointer-events: auto;
        opacity: 1;

        &.reset-icon {
          right: -75px;
        }
      }
    }
  }
}
</style>
