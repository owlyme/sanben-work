<template>
  <div class="config">
      <el-form ref="form" :model="form" label-width="80px">
        <div v-if="compType !== 'text'">
          <el-form-item label="背景色" >
            <div class="flex-middle"> 
            <span>{{form.background || '无'}}</span> <el-color-picker v-model="form.background"></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="外边距">
            <el-input v-model="form.margin"></el-input>
          </el-form-item>
          <el-form-item label="内边距">
            <el-input v-model="form.padding"></el-input>
          </el-form-item>
          <el-form-item label="圆角">
            <el-input v-model="form.borderRadius" 
            :min="0" :max="50"></el-input>
          </el-form-item>
        </div>

        <div v-else>
          <el-form-item label="尺寸">
            <el-input v-model="form.fontSize"></el-input>
          </el-form-item>
          <el-form-item label="粗细">
            <el-input v-model="form.fontWeight"></el-input>
          </el-form-item>
          <el-form-item label="尺寸">
            <el-input v-model="form.fontSize"></el-input>
          </el-form-item>
          <el-form-item label="颜色">
            <div class="flex-middle"> 
              <span>{{form.color || '无'}}</span> <el-color-picker v-model="form.color"></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="component.children" ></el-input>
          </el-form-item>
          <el-form-item label="背景" >
            <div class="flex-middle"> 
            <span>{{form.background || '无'}}</span> <el-color-picker v-model="form.background"></el-color-picker>
            </div>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary" size="small" @click="onConfigChange">确认</el-button>
          <el-button  size="small" >取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  export default {
    name: 'config',
    props: {
      component: {
        type: Object,
        default: () => ({})
      },
    },
    data() {
      return {
        form: {},
        compType: '',
        textContent: ''
      }
    },
    components: {},
    watch: {
      component() {
        this.form = this.component.style
        this.compType = this.component.tag
      }
    },
    mounted() {},
    methods: {
      onConfigChange() {
        this.$emit('on-change', this.component)
      }
    }
  }
</script>

<style scoped lang="less">

</style>