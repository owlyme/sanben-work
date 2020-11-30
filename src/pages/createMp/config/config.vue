<template>
  <div class="config">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="背景色">
        <el-color-picker v-model="form.background"></el-color-picker>
      </el-form-item>
      <el-form-item label="外边距">
        <el-input  v-model="form.margin"></el-input>
      </el-form-item>
      <el-form-item label="内边距">
        <el-input  v-model="form.padding"></el-input>
      </el-form-item>
      <el-form-item label="圆角">
        <el-input  v-model="form.borderRadius" 
        :min="0" :max="50"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onConfigChange">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  
  </div>
</template>

<script>
  export default {
    name: 'config',
    props: {
      comp: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        form: {}
      }
    },
    components: {},
    watch: {
      comp() {
        console.log('componentschagne')
        this.form = this.comp
      }
    },
    mounted() {},
    methods: {
      onConfigChange() {
        this.$emit('on-style-change', this.form)
      }
    }
  }
</script>

<style scoped lang="less">

</style>