<script setup>
import { reactive, ref } from 'vue'
import Networks from './components/Networks.vue';
import Settings from './components/Settings.vue'
import About from './components/About.vue'
import Peers from './components/Peers.vue'
import Moons from './components/Moons.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const data = reactive({
  showAuthDialog: true,
})

const activeName = ref("Settings")


</script>


<template>
  <el-container>
    <el-main>
      <el-tabs class="top-tabs" v-model="activeName">
        <el-tab-pane label="Settings" name="Settings">
          <Settings></Settings>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="Networks" name="Networks">
          <Networks></Networks>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="Peers" name="Peers">
          <Peers></Peers>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="Moons" name="Moons">
          <Moons></Moons>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="About" name="About">
          <About></About>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>


<style>
.top-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>