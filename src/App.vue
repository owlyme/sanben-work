<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
    },
    components: {

    }
  }
</script>

<style lang="less">
  @import url('@/assets/style/layout.less');
  #app {}
</style>