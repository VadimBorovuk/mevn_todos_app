<template>
  <div class="form sign-up">
    <h2>Create account</h2>
    <div>Use your email for registration</div>

    <el-form
        ref="refFormRegister"
        @submit.prevent="submitForm(refFormRegister)"
        :model="registerForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="Email" prop="email" label-width="70">
        <el-input v-model="registerForm.email" type="text" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="Password" prop="password" label-width="70">
        <el-input v-model="registerForm.password" type="password" autocomplete="off"/>
      </el-form-item>
      <el-form-item class="form-btns">
        <button class="button-active btn-sign" type="submit">Sign In</button>
        <el-button @click="resetForm(refFormRegister)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {inject, reactive, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: 'RegisterView',
  setup(props, {emit}) {
    const refFormRegister = ref();
    const ElMessage = inject('elMessage');
    const store = useStore()
    const registerForm = reactive({})

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
          store.dispatch('user/setAccessAuth', {obj: registerForm, status: 'regist'}).then(() => {
            ElMessage({
              message: 'Auth success',
              type: 'success',
            })
            emit('changeStatusAuth')
            resetForm(refFormRegister.value)
          }).catch((e) => {
            // let errStr = e.response.data.errors.length > 1 ? e.response.data.errors.map(err => err.msg).join(' & ') : e.response.data.errors[0].msg
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
      registerForm, ElMessage, refFormRegister, rules, submitForm, resetForm
    }
  }
}
</script>

