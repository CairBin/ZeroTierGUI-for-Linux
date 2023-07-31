<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue'

const data = reactive({
    id: '',
    networks: []
})

const checkStatus = (callback) => {
    window.api.zeroTierProcess.getZeroTierStartStatus((err) => {
        console.error(err)
    }, (startStatus) => {
        if (!startStatus) {
            ElMessage({
                message: 'Please start zerotier service firstly',
                type: 'warning'
            })
        } else {
            callback && callback()
        }
    })
}


const onJoinBtnClicked = () => {
    if (data.id) {
        checkStatus(() => {
            window.api.zeroTierProcess.joinNetworkSudo(data.id, (err) => {
                console.error(err)
            }, (stderr, stdout) => {
                if (stderr) {
                    ElMessage({
                        type: 'error',
                        message: stderr
                    })
                } else {
                    ElMessage({
                        type: 'success',
                        message: 'Success'
                    })
                }
                timeExec()
            })
        })

    } else {
        ElMessage({
            type: 'error',
            message: 'Nerwork ID cannot be empty.'
        })
    }
}

const timeExec = () => {
    checkStatus(() => {
        window.api.zeroTierProcess.getNetworkListSudo((err) => {
            console.error(err)
            ElMessage({
                type: 'error',
                message: err
            })
        }, (stderr, stdout) => {
            if (stderr) {
                ElMessage({
                    type: 'error',
                    stderr
                })
            }

            if (stdout) {
                //console.log(stdout)
                var temp = JSON.parse(stdout)
                var finalList = []
                for (var i = 0; i < temp.length; i++) {
                    var tempObj = {
                        id: temp[i].nwid,
                        name: temp[i].name,
                        mac: temp[i].mac,
                        ips: temp[i].assignedAddresses[0] ? temp[i].assignedAddresses[0] : '',
                        dev: temp[i].portDeviceName,
                        type: temp[i].type,
                        status: temp[i].status
                    }
                    finalList.push(tempObj)
                }
                data.networks = finalList
            }
        })
    })

}

const onLeaveBtnClicked = (id) => {
    ElMessageBox.confirm(`Are you sure to leave the network(ID:${id})`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
    }).then(() => {
        checkStatus(() => {
            window.api.zeroTierProcess.leaveNetworkSudo(id, (err) => {
                console.error(err)
                ElMessage({
                    type: 'error',
                    message: err
                })
            }, (stderr, stdout) => {
                if (stderr) {
                    console.error(stderr)
                    ElMessage({
                        type: 'error',
                        message: stderr
                    })
                }

                if (stdout) {
                    ElMessage({
                        type: 'success',
                        message: stdout
                    })
                }

                timeExec()
            })
        })
    }).catch(() => {

    })

}


const main = () => {
    timeExec()
}
main()

</script>

<template>
    <div>
        <div class="tab-title">Join Network</div>
        <div style="height:20px;"></div>
        <el-form style="width:100%" label-width="80px" label-position="left">
            <el-form-item label="ID">
                <el-input v-model="data.id" style="width:300px" placeholder="Please input network ID"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="height:40px;width:100px;" @click="onJoinBtnClicked">
                    Join
                </el-button>
            </el-form-item>
        </el-form>
    </div>
    <div style="margin-top:100px;">
        <div class="tab-title">Networks <el-button type="primary" @click="timeExec"><el-icon>
                    <Refresh />
                </el-icon></el-button></div>
        <div style="height:10px"></div>
        <el-table :data="data.networks">
            <el-table-column prop="id" label="ID" width="100" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="mac" label="MAC" />
            <el-table-column prop="status" label="Status" />
            <el-table-column prop="dev" label="Dev" />
            <el-table-column prop="ips" label="Assigned IPs" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button type="danger" text @click="onLeaveBtnClicked(scope.row.id)">leave</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped></style>