<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, reactive } from 'vue'

const data = reactive({
    switch: {
        start: true,
        startWithLinux: false,
    },
    zeroTierCliVersion: ''
})

const onEnableSwitchClicked = () => {
    window.api.zeroTierProcess.startZeroTierSudo(data.switch.start, (err) => {
        console.error(err)
        data.switch.start = !data.switch.start
    }, (stderr, stdout) => {
        if (stderr) {
            console.error('start stderr')
            data.switch.start = !data.switch.start
        }
    })
}

const onStartSwitchClicked = () => {
    window.api.zeroTierProcess.enableZeroTierSudo(data.switch.startWithLinux, (err) => {
        console.error(err)
        data.switch.startWithLinux = !data.switch.startWithLinux
    }, (stderr, stdout) => {
        if (stderr) {
            console.error('start with linux stderr')
            data.switch.startWithLinux = !data.switch.startWithLinux
        }
    })

}

const timeExec = () => {
    window.api.zeroTierProcess.getVersion((err) => {
        console.error(err)
        ElMessageBox.alert('Cannot find command zerotier-cli. Please install ZeroTier.', 'Fatal Error', {
            type: 'error',
            confirmButtonText: 'Quit',
            callback: () => {
                window.electron.ipcRenderer.send('close-window', '')
            }
        })

    }, (stderr, stdout) => {
        data.zeroTierCliVersion = stdout

        window.api.zeroTierProcess.getZeroTierStartStatus((err) => {
            console.error(err)
        }, (startStatus) => {
            data.switch.start = startStatus
        })

        window.api.zeroTierProcess.getZeroTierEnableStatus((err) => {
            console.error(err)
        }, (enableStatus) => {
            data.switch.startWithLinux = enableStatus
        })

    })

}



const main = () => {
    timeExec()
    //setInterval(timeExec, 1000)
    ElMessageBox.prompt('Please input the password of sudo user.', 'Tip', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputErrorMessage: 'Error',
        inputType: 'password'
    }).then(({ value }) => {
        window.api.zeroTierProcess.setCachePassword(value)
    }).catch(() => {
        window.electron.ipcRenderer.send('close-window', '')
    })
}

main()
</script>

<template>
    <div>
        <div class="tab-title">Settings <el-button type="primary" @click="timeExec">
                <el-icon>
                    <Refresh />
                </el-icon>
            </el-button></div>
        <div style="height:20px;"></div>
        <el-form style="width:100%;">
            <el-form-item label="ZeroTierCli Version">
                <el-text type="warning">{{ data.zeroTierCliVersion }}</el-text>
            </el-form-item>
            <el-form-item label="Start ZeroTier"><el-switch v-model="data.switch.start"
                    @change="onEnableSwitchClicked"></el-switch></el-form-item>
            <el-form-item label="Start with Linux"><el-switch v-model="data.switch.startWithLinux"
                    @change="onStartSwitchClicked"></el-switch></el-form-item>
        </el-form>
    </div>
</template>

<style scoped></style>