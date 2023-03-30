<template>
  <div class="header">
    <span class="header__email">{{ $props.user.id.email }}</span>
    <el-icon style="width: 25px; height: 25px; margin: 0 0 0 5px">
      <Avatar style="width: 20px; height: 20px"/>
    </el-icon>
    <el-popconfirm
        title="Are you sure logout?"
        @confirm="$props.logoutFromAcc"
        confirm-button-text="Yes"
        cancel-button-text="No"
        icon-color="#626AEF"
    >
      <template #reference>
        <el-icon title="Logout" style="width: 25px; height: 25px; cursor: pointer">
          <SwitchButton style="width: 20px; height: 20px"/>
        </el-icon>
      </template>
    </el-popconfirm>
  </div>
</template>

<script>
export default {
  props: ['user', 'logoutFromAcc']
}
</script>

<style lang="scss" scoped>
.header {
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .header__email{
    font-size: var(--df-font-size);
  }
}
</style>
