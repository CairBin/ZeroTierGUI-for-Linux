<script setup>

import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
const data = reactive({
    peerList: []
})

const checkStatus = (callback) => {
    window.api.zeroTierProcess.getZeroTierStartStatus((err) => {
        console.error(err)
    }, (status) => {
        if (status) {
            callback && callback()
        } else {
            data.peerList = []
            ElMessage({ type: 'warning', message: 'Please start ZeroTier firstly' })
        }
    })
}

const timeExec = () => {
    checkStatus(() => {
        window.api.zeroTierProcess.getPeersSudo((err) => {
            console.error(err)
            ElMessage({
                type: 'error',
                message: err
            })
        }, (stderr, stdout) => {
            if (stderr)
                console.log(stderr)
            else {
                var temp = []
                var tempRes = JSON.parse(stdout)
                //console.log(tempRes)
                for (var i = 0; i < tempRes.length; i++) {
                    var item = tempRes[i]
                    var tempObj = {
                        ztAddress: item.address,
                        address: item.paths[0] ? item.paths[0].address : '',
                        role: item.role,
                        active: item.paths[0] ? item.paths[0].active : false,
                        version: item.version
                    }

                    temp.push(tempObj)
                }
                data.peerList = temp
            }
        })
    })
}


const main = () => {
    timeExec()
    //setInterval(timeExec, 1000)
}

main()
</script>

<template>
    <div>
        <div class="tab-title">Peers
            <el-button type="primary" @click="timeExec">
                <el-icon>
                    <Refresh />
                </el-icon>
            </el-button>
        </div>
        <div style="height:20px;"></div>
        <div>
            <el-table :data="data.peerList">
                <el-table-column prop="ztAddress" label="ZT Address" />
                <el-table-column prop="active" label="Active" />
                <el-table-column prop="version" label="Version" />
                <el-table-column prop="role" label="Role" />
                <el-table-column prop="address" label="Address" />
            </el-table>
        </div>
    </div>
</template>