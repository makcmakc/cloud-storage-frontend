<template>
  <header>
    <div class="wrapper">
      <div class="header">
        
        <div class="header-left">
          <router-link to="/" class="header__logo">
            <div class="header__logo-icon">
              <appleIcloud style="font-size: 2em; stroke: #67c23a; fill: #fff;" />
            </div>
            <div class="header__logo-title">Cloud Storage</div>
          </router-link>
        </div>


        <div class="header-right">
          <div class="app-header__profile">
            <Profile />
          </div>

          <!-- <div class="app-settings">

            <el-button @click="handleLogout" type="text">Logout</el-button>

            <div class="app-header__settings">
              <el-icon><Setting /></el-icon>
            </div>


          </div> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import appleIcloud from '~icons/mdi/apple-icloud'
import cogIcon from '~icons/mdi/cog'
import closeIcon from '~icons/mdi/close'
import profileCircle from '~icons/iconoir/profile-circle'
import infoFilled from '~icons/ep/info-filled'
import activityIcon from '~icons/mynaui/activity'

import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
  Setting
} from '@element-plus/icons-vue'

import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth' 
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const router = useRouter()
</script>


<style lang="scss" scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}


.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>