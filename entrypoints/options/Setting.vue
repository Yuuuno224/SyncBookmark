<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { ref } from 'vue'
const isDark = useDark()
const toggleDark = useToggle(isDark)

const formData = ref({
  githubToken: "",
  gistId: "",
  GistFileName: ""
})

const onSave = () => {
  console.log("保存")
}
</script>

<template>
  <el-container>
    <el-header>
      <el-row justify="space-between" align="middle">
        <h3>设置</h3>

        <el-button :icon="isDark ? Sunny : Moon" @click="toggleDark()">
          {{ isDark ? '亮色' : '暗色' }}
        </el-button>
      </el-row>
    </el-header>

    <el-main>
      <!-- 主要内容区域 -->

      <el-form>
        <el-form-item label="Github Token">
          <el-input v-model="formData.githubToken" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Gist ID">
          <el-input v-model="formData.gistId"></el-input>
        </el-form-item>
        <el-form-item label="Gist 文件名">
          <el-input v-model="formData.GistFileName"></el-input>
        </el-form-item>
        <el-form-item style="justify-self: center;">
          <el-button @click="onSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-header {
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  padding: 0 10px;
}
</style>