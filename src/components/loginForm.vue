<template>
  <div class="form sign-in">
    <h2>Sign In</h2>
    <div>Use your account</div>

    <el-form
        ref="refFormLogin"
        @submit.prevent="submitForm(refFormLogin)"
        :model="loginForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="Email" prop="email" label-width="70">
        <el-input v-model="loginForm.email" type="text" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="Password" prop="password" label-width="70">
        <el-input v-model="loginForm.password" type="password" autocomplete="off"/>
      </el-form-item>
      <el-form-item class="form-btns">
        <button class="button-active btn-sign" type="submit">Sign In</button>
        <el-button @click="resetForm(refFormLogin)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {inject, reactive, ref} from "vue";
import {useStore} from "vuex";
import router from "@/router";

export default {
  name: 'LoginView',
  setup() {
    const refFormLogin = ref();
    const ElMessage = inject('elMessage');
    const store = useStore()
    const loginForm = reactive({
      email: '',
      password: ''
    })

    const rules = reactive({
      email: [
        {required: true, message: 'Please correct email', trigger: 'blur'},
      ],
      password: [
        {required: true, message: 'Please enter password', trigger: 'blur'},
        {min: 3, message: 'Length should be 3 and more', trigger: 'blur'},
      ]
    })

    const submitForm = (formEl) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          store.dispatch('user/setAccessAuth', {obj: loginForm, status: 'login'}).then(() => {
            ElMessage({
              message: 'Auth success',
              type: 'success',
            })
            router.push({path: '/tasks'})
          }).catch((e) => {
            ElMessage({
              message: e.response.data.message,
              type: 'error',
            })
          })
        } else {
          return false
        }
      })

    }
    const resetForm = (formEl) => {
      if (!formEl) return
      formEl.resetFields()
    }

    return {
      loginForm, ElMessage, rules, refFormLogin, submitForm, resetForm
    }
  }
}
</script>

