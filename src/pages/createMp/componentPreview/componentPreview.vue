<template>
  <component :is="name" />
</template>

<script>
import helloworld from "@/components/HelloWorld";
  export default {
    name: 'componentPreview',
    props: {
      name: {
        type: String,
        default: 'helloworld'
      }
    },
    data() {
      return {

      }
    },
    components: {
      helloworld
    },
    watch: {},
    mounted() {},
    methods: {}
  }
</script>

<style scoped lang="less">

</style>