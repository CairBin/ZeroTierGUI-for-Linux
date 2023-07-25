<script setup>
import {reactive,ref} from 'vue'
</script>

<template>
    <div>
        <div class="tab-title">Join Network</div>
        <div style="height:20px;"></div>
        <el-form style="width:100%" label-width="80px" label-position="left">
            <el-form-item label="ID">
                <el-input style="width:300px" placeholder="Please input network ID"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="height:40px;width:100px;">
                    Join
                </el-button>
            </el-form-item>
        </el-form>
    </div>
    <div style="margin-top:100px;">
        <div class="tab-title">Networks</div>
        <div style="height:10px"></div>
        <el-table>
            <el-table-column prop="id" label="ID" width="100"/>
            <el-table-column prop="description" label="Description"/>
        </el-table>
    </div>
</template>

<style scoped>

</style>