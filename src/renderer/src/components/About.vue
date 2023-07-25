<script setup>
import { reactive } from 'vue'

const data = reactive({
    aboutInfo: `
    ZeroTierGUI for Linux
    Copyright (c) 2023 CairBin\n
    Released under the terms of the MIT License
    Source URL: https://github/cairbin/ZeroTireGUI-for-Linux

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
    IN THE SOFTWARE.
    `
})
</script>

<template>
    <div>
        <div class="tab-title">About</div>
        <div style="height:20px;"></div>
        <div>
            <el-input v-model="data.aboutInfo" :rows="15" type="textarea"></el-input>
        </div>
    </div>
</template>

<style scope>
</style>