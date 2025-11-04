<script lang="ts" setup>
// import HelloWorld from '@/components/HelloWorld.vue';
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
const handleSettingClick = async () => {
  try {
    console.log('正在打开options页');
    await browser.runtime.openOptionsPage();
  } catch {
    console.log('打开options页失败');
  }
}
</script>

<template>
  <!-- <div>
    <a href="https://wxt.dev" target="_blank">
      <img src="/wxt.svg" class="logo" alt="WXT logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <!-- <HelloWorld msg="WXT + Vue" /> -->
  <el-container class="popup-container">
    <el-header>
      <el-row justify="space-between" align="middle">
        <h3>Sycnbookmark</h3>
        <el-switch :model-value="isDark" @update:model-value="toggleDark()" inline-prompt :active-icon="Moon"
          :inactive-icon="Sunny" active-text="深色" inactive-text="浅色"
          style="--el-switch-on-color: #409EFF; --el-switch-off-color: #909399" class="smooth-switch" />
        <!-- <UseDark v-slot="{ isDark, toggleDark }"
        <button @click="toggleDark()">
          Is Dark: {{ isDark }}
        </button>
      </UseDark> -->
      </el-row>
    </el-header>

    <el-main>
      <el-row :gutter="10">
        <el-col :span="24" v-for="btn in buttons" :key="btn.name">
          <el-button size="large" style="width: 100%">{{ btn.label }}</el-button>
        </el-col>
      </el-row>
    </el-main>

    <el-footer class="footer">
      <el-row justify="space-between" align="middle">
        <el-icon :size="20" @click="handleSettingClick" class="hover-icon">
          <Setting />
        </el-icon>
        <el-link underline target="_blank" href="https://github.com/Yuuuno224/SyncBookmark">
          v1.0.0<el-icon :size="20"><img src="@/assets/github.svg" alt="Github logo" /></el-icon>
        </el-link>
      </el-row>
    </el-footer>
  </el-container>
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #54bc4ae0);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
.popup-container {
  width: 300px;
  /* 弹出页固定宽度 */
  max-height: 400px;
  /* 高度限制 */
  /* overflow-y: auto; 自动滚动 */
}

/* 修正动画样式 */
.smooth-switch {
  --el-switch-transition-duration: 0.3s;
}

/* 使用 ::v-deep 替代 :deep */
.smooth-switch ::v-deep(.el-switch__core) {
  transition: all var(--el-switch-transition-duration) ease-in-out !important;
}

.smooth-switch ::v-deep(.el-switch__action) {
  transition: all var(--el-switch-transition-duration) cubic-bezier(0.68, -0.55, 0.27, 1.55) !important;
}

.full-width-btn {
  width: 100%;
}

.footer {
  width: 100%;
  height: 0;
  border-bottom: 1px solid var(--el-border-color);
}

/* 添加悬停样式 */
.hover-icon:hover {
  color: #409eff;
  /* 与 el-link 悬停颜色一致 */
  cursor: pointer;
}
</style>
