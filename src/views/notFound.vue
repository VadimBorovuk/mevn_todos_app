<template>
  <div class="page__fail">
    <div class="">
      <h1 class="page__title">404</h1>
    </div>

    <div class="contant_box_404">
      <h3 class="h2">
        Look like you're lost
      </h3>

      <p>the page you are looking for not avaible!</p>
      <router-link class="link_404" to="tasks">Go to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.page__fail {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  background-repeat-x: no-repeat;
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-size: cover;
  .page__title{
    padding-top: 80px;
    font-size: 72px;
  }
  .link_404{
    color: #fff!important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;
    text-decoration: none;
  }

}
</style>
