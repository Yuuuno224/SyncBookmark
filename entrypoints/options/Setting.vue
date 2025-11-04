<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon, Setting } from '@element-plus/icons-vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const buttons = [
  { label: '上传', name: 'upload' },
  { label: '下载', name: 'download' },
  { label: '导入', name: 'import' },
  { label: '导出', name: 'export' }
]

const handleClick = (buttonName: string) => {
  console.log('点击了:', buttonName)
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
      <el-row :gutter="10">
        <el-col :span="24" v-for="button in buttons" @click="handleClick(button.name)">
          <el-button size="large" style="width: 100%" :key="button.name">
            {{ button.label }}
          </el-button>
        </el-col>
      </el-row>
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