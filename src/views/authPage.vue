<template>
  <div class="form__app">
    <div class="form__container" :class="{'form__container--active' : signUp}">
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-left">
            <h2>Welcome Back!</h2>
            <p>Please login with your personal info</p>
            <button class="button-active invert" id="signIn" @click="signUp = !signUp">Sign In</button>
          </div>
          <div class="overlay-right">
            <h2>Hello, Friend!</h2>
            <p>Please enter your personal details</p>
            <button class="button-active invert" id="signUp" @click="signUp = !signUp">Sign Up</button>
          </div>
        </div>
      </div>
      <login-form/>
      <register-form @changeStatusAuth="changeStatusAuth"/>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import loginForm from "@/components/loginForm";
import registerForm from "@/components/registerForm";

export default {
  components: {
    loginForm, registerForm
  },
  setup() {
    const store = useStore()
    const signUp = ref(false)

    const changeStatus = (bool) => {
      store.commit('user/setStatusForm', bool)
    }
    const changeStatusAuth = () => {
      signUp.value = false
    }

    return {
      signUp,
      changeStatus,
      changeStatusAuth
    }
  }
}
</script>

<style lang="scss">

.form__app {
  font-family: Tahoma;
  font-size: 1rem;
  color: #222;
  background-color: #092525;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .form__container {
    position: relative;
    width: 768px;
    height: 480px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to bottom, #efefef, #ccc);

    &--active {
      .sign-in {
        transform: translateX(100%);
      }

      .sign-up {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: show 0.5s;
      }

      .overlay-container {
        transform: translateX(-100%);
      }

      .overlay {
        transform: translateX(50%);
      }

      .overlay-left {
        transform: translateX(0);
      }

      .overlay-right {
        transform: translateX(20%);
      }
    }

    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform 0.5s ease-in-out;
      z-index: 100;
    }
  }
}

.overlay {
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  background: linear-gradient(to bottom right, var(--form-grad-lf), var(--form-grad-rt));
  color: #fff;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
}

@mixin overlays($property) {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 70px 40px;
  width: calc(50% - 80px);
  height: calc(100% - 140px);
  text-align: center;
  transform: translateX($property);
  transition: transform 0.5s ease-in-out;
}

.overlay-left {
  @include overlays(-20%);
}

.overlay-right {
  @include overlays(0);
  right: 0;
}

.button-active {
  line-height: 1;
  height: 30px;
  border-radius: 5px;
  border: 1px solid var(--form-active-btn);
  background-color: var(--form-active-btn);
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 25px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s ease-in;

  &:active {
    transform: scale(0.9);
  }

  &:focus {
    outline: none;
  }
}

button.invert {
  background-color: transparent;
  border-color: #fff;
}

.form {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 90px 30px;
  width: calc(55% - 98px);
  height: calc(100% - 180px);
  text-align: center;
  background: linear-gradient(to bottom, #efefef, #ccc);
  transition: all 0.5s ease-in-out;

  &.sign-in {
    left: 0;
    z-index: 2;
  }

  &.sign-up {
    left: 0;
    z-index: 1;
    opacity: 0;
  }

  div {
    font-size: 1rem;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 8px 15px;
    margin: 6px 0;
    width: 100%;
    border-radius: 15px;
    border-bottom: 1px solid #ddd;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff,
    0 1px 0 #fff;
    overflow: hidden;

    &:focus {
      outline: none;
      background-color: #fff;
    }
  }
}

@keyframes show {
  0% {
    opacity: 0;
    z-index: 1;
  }
  49% {
    opacity: 0;
    z-index: 1;
  }
  50% {
    opacity: 1;
    z-index: 10;
  }
}

@keyframes showYtLink {
  0% {
    bottom: -200px;
  }
  100% {
    bottom: 20px;
  }
}

.form-btns {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  .btn-sign{
    margin-right: 10px;
  }

  .el-form-item__label {
    font-family: monospace;
  }

  .el-form-item__content {
    margin-left: 0!important;
    justify-content: center;

  }
}
.el-input__wrapper {
  border-radius: 10px !important;
  background-color: transparent !important;
}

</style>
