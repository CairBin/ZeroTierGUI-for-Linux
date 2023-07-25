<script setup>
import { reactive,ref } from 'vue'
import Networks from './components/Networks.vue';
import Settings from './components/Settings.vue'
import About from './components/About.vue'
const data = reactive({

})

const activeName = ref("Networks")

</script>


<template>
  <el-container>
    <el-main>
      <el-tabs class="top-tabs" v-model="activeName">
        <el-tab-pane label="Networks" name="Networks"><Networks></Networks></el-tab-pane>
        <el-tab-pane label="Settings" name="Settings"><Settings></Settings></el-tab-pane>
        <el-tab-pane label="About" name="About"><About></About></el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>


<style>

.top-tabs > .el-tabs__content{
  padding:32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

</style>