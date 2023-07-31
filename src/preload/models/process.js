import {spawn,exec} from 'node:child_process'
//import { stdout } from 'node:process'
import sudo from 'sudo-prompt'

const appName = 'ZeroTierGUI'
var cachePwd = null


const bufferArrayToUtf8 = (bufferArray)=>{
    return bufferArray.toString('utf-8')
}

const commonExec = (cmdObj,errCallBack,stdCallBack)=>{
    var cmdStr = cmdObj.command
    for(var item of cmdObj.params){
        cmdStr += ' '+item
    }

    if(cmdObj.sudo){
        if(cmdObj.password)
        {
            cmdStr = `echo "${cmdObj.password}" | sudo -S ${cmdStr}`

            exec(cmdStr,(err,stdout,stderr)=>{
            if(err)
                errCallBack && errCallBack(err)
            else
                stdCallBack&&stdCallBack(stderr,stdout)
            })
        }else{
            sudo.exec(cmdStr,{name:appName},(err,stdout,stderr)=>{
            if(err)
                errCallBack(err)
            else
                stdCallBack(stderr,stdout)
            })
        }
        
    }else{
        exec(cmdStr,(err,stdout,stderr)=>{
            if(err)
                errCallBack && errCallBack(err)
            else
                stdCallBack&&stdCallBack(stderr,stdout)
        })
    }
}


const getVersion = (errCallBack,stdCallBack)=>{
    commonExec({
        command:'zerotier-cli',
        params:['-v'],
        sudo:false
    },errCallBack,stdCallBack)
}


const getNetworkListSudo = (errCallBack,stdCallBack)=>{
    commonExec({
        command:'zerotier-cli',
        params:['listnetworks','-j'],
        sudo:true,
        password:cachePwd
    },errCallBack,stdCallBack)
}

const startZeroTierSudo = (start,errCallBack,stdCallBack)=>{
    var status = start?'start':'stop'
    commonExec({
        command:'systemctl',
        params:[status,'zerotier-one'],
        sudo:true,
        password:cachePwd
    },errCallBack,stdCallBack)
}


const enableZeroTierSudo = (enable,errCallBack,stdCallBack)=>{
    var status = enable?'enable':'disable'
    commonExec({
        command:'systemctl',
        params:[status,'zerotier-one'],
        sudo:true,
        password:cachePwd
    },errCallBack,stdCallBack)
}

const getZeroTierStartStatus = (errCallBack,callback)=>{
    commonExec({
        command:'ps',
        params:['-A'],
        sudo:false
    },errCallBack,(stderr,stdout)=>{
        if(stdout){
            callback && callback(stdout.toLowerCase().indexOf('zerotier-one')>-1)
        }else{
            callback && callback(false)
        }
    })
}

const getZeroTierEnableStatus = (errCallBack,callback)=>{
    commonExec({
        command:'systemctl list-unit-files | grep enabled',
        params:[],
        sudo:false
    },errCallBack,(stderr,stdout)=>{
        if(stdout){
            callback && callback(stdout.toLocaleLowerCase().indexOf('zerotier-one.service')>-1)
        }else{
            callback && callback(false)
        }
    })
}

const getPeersSudo = (errCallBack,stdCallBack)=>{
    commonExec({
        command:'zerotier-cli',
        params:['peers','-j'],
        sudo:true,
        password:cachePwd
    },errCallBack,stdCallBack)
}


const setCachePassword = (pwd)=>{
    cachePwd = pwd
}

const joinNetworkSudo = (id,errCallBack,stdCallBack)=>{
    commonExec({
        command:'zerotier-cli',
        params:['join',id],
        sudo:true,
        password:cachePwd
    },errCallBack,stdCallBack)
}

const leaveNetworkSudo = (id,errCallBack,stdCallBack)=>{
    commonExec({
        command:'zerotier-cli',
        params:['leave',id],
        sudo:true,
        password:cachePwd
    },errCallBack,stdCallBack)
}

const getMoonsSudo = (errCallBack,stdCallBack)=>{
    commonExec({
        command:'zerotier-cli',
        params:['listmoons','-j'],
        sudo:true,
        password:cachePwd
    },errCallBack,stdCallBack)
}

const orbitMoonSudo = (valueObj,errCallBack,stdCallBack)=>{
    commonExec({
        command:'zerotier-cli',
        params:['orbit',valueObj.id,valueObj.seed],
        sudo:true,
        password:cachePwd
    },errCallBack,stdCallBack)
}

const deorbitMoonSudo = (id,errCallBack,stdCallBack)=>{
    commonExec({
        command:'zerotier-cli',
        params:['deorbit',id],
        sudo:true,
        password:cachePwd
    },errCallBack,stdCallBack)
}

export default{
    getVersion,
    getNetworkListSudo,
    getPeersSudo,
    getZeroTierEnableStatus,
    getZeroTierStartStatus,
    startZeroTierSudo,
    enableZeroTierSudo,
    setCachePassword,
    joinNetworkSudo,
    leaveNetworkSudo,
    getMoonsSudo,
    orbitMoonSudo,
    deorbitMoonSudo
}