<script setup>
import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus';

const data = reactive({
    worldId: '',
    seed: '',
    moons: []
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


const timeExec = () => {
    checkStatus(() => {
        window.api.zeroTierProcess.getMoonsSudo((err) => {
            console.error(err)
        }, (stderr, stdout) => {
            if (stdout) {
                var temp = JSON.parse(stdout)
                var finalList = []
                for (var i = 0; i < temp.length; i++) {
                    var tempObj = {
                        id: temp[i].id,
                        waiting: temp[i].waiting,
                        ip: temp[i].roots[0] ? temp[i].roots[0].stableEndpoints : ''
                    }
                    finalList.push(tempObj)
                }
                data.moons = finalList
            }
        })
    })
}

const onOrbitBtnClicked = () => {
    checkStatus(() => {
        window.api.zeroTierProcess.orbitMoonSudo({
            id: data.worldId,
            seed: data.seed
        }, (err) => {
            console.error(err)
        }, (stderr, stdout) => {
            if (stderr) {
                ElMessage({ type: 'error', message: stderr })
            }

            if (stdout) {
                ElMessage({ type: 'success', message: stdout })
            }

            timeExec()
        })
    })
}

const onDeorbitBtnClicked = (id) => {
    ElMessageBox.confirm(`Are you sure to leave the moon server(ID:${id})`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
    }).then(() => {
        checkStatus(() => {
            window.api.zeroTierProcess.deorbitMoonSudo(id, (err) => {
                console.error(err)
            }, (stderr, stdout) => {
                if (stderr) {
                    ElMessage({ type: 'error', message: stderr })
                }

                if (stdout) {
                    ElMessage({ type: 'success', message: stdout })
                }
            })

            timeExec()
        })
    })

}


const main = () => {
    timeExec()
}

main()
</script>



<template>
    <div>
        <div class="tab-title">Join Moon Via</div>
        <div style="height:20px;"></div>
        <el-form style="width:100%" label-width="100px" label-position="left">
            <el-form-item label="World ID">
                <el-input v-model="data.worldId" style="width:300px" placeholder="Please input world ID" />
            </el-form-item>
            <el-form-item label="Seed">
                <el-input v-model="data.seed" style="width:300px" placeholder="Please input seed" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="height:40px;width:100px;" @click="onOrbitBtnClicked">Orbit</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div style="margin-top:50px;">
        <div class="tab-title">Moons
            <el-button type="primary" @click="timeExec">
                <el-icon>
                    <Refresh />
                </el-icon>
            </el-button>
        </div>
        <div style="height:20px;"></div>
        <el-table :data="data.moons">
            <el-table-column label="ID" prop="id" />
            <el-table-column label="Waiting" prop="waiting" />
            <el-table-column label="IP" prop="ip" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button text type="danger" @click="onDeorbitBtnClicked(scope.row.id)">
                        deorbit
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style></style>