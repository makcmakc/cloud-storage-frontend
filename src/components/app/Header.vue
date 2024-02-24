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
          <div class="app-settings">

            <el-button @click="handleLogout" type="text">Logout</el-button>

            <!-- <div class="app-header__settings">
              <el-icon><Setting /></el-icon>
            </div> -->


          </div>
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
import baselineExitToApp from '~icons/ic/baseline-exit-to-app';

import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
  Setting
} from '@element-plus/icons-vue'


import { supabase } from '@/core/supabaseClient'


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'


import { onMounted, ref } from 'vue'
// import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' 
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const router = useRouter()


const drawer = ref(false)



const variantColors = [
  [156, 3, 247], // purple
  [19, 206, 102], // lime
  [64,158,255], // blue
  [245, 111, 111], // red
  [230, 162, 60], // orange
  [53, 185, 197], // turquoise
  [239, 204, 162], // biscuit
  [67, 56, 202], // indigo
  [154, 187, 29], // yellow
  [228, 53, 188], // pink
  [4, 120, 87], // emerald
  [3, 105, 161], // sky
  // [65, 47, 97], // dark gray
] 


const variantColor = (i, transparency = 1) => {
  let c = variantColors;
  c = c[i] ? c[i] : c[c.length - 1];
  return `rgba(${c[0]},${c[1]},${c[2]}, ${transparency})`;
}


ChartJS.register(ArcElement, Tooltip, Legend)
const data = ref({
  labels: ['Images', 'Documents', 'Audio', 'Video'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10],
      borderWidth: 1,
      // backgroundColor: 'transparent',
      // borderColor: variantColor(1),
       backgroundColor: ["rgba(156,3,247, 1)", "rgba(245,111,111, 1)", "rgba(19,206,102, 1)", "rgba(230,162,60, 1)"],
       labels: ['Images', 'Documents', 'Audio', 'Video']
    }
  ]
})





const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 250 },
})


const handleLogout = async () => {
  await authStore.logout()
  router.push('/auth')
}


const user = ref('')

onMounted(() => {
  authStore.getMe()
  user.value = authStore.getUser
  console.log(user.value)
})
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

.header {

  &-left {

  }

  &-right {
    margin-left: auto;
  }
}


header {
  margin-bottom: 20px;
  width: 100%;
  // background: #f4f6f9;
  background: #fff;
}

.profile {
  width: 250px;

  &__head {
    display: flex;
    flex-direction: column;

    &-avatar {
      margin-right: 15px;
      display: flex;
      align-items: center;
    }

    &-info {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    &-action {
      text-align: right;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

:deep(.el-drawer__header) {
  margin-bottom: 20px;
}

.header {
  display: flex;
  align-items: center;
  height: 60px;

  .app-header__settings {
    margin-right: 10px;

    i {
      font-size: 22px;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    color: #000;
    width: max-content;

    &-icon {
      margin-right: 10px;
      color: #fff;
    }

    &-title {
      font-weight: 500;
      font-size: 18px;
      color: #303133;
    }
  }
}

.app-settings {
  margin-left: auto;
  display: flex;
  align-items: center;

  &__content {
    position: absolute;
    right: 20px;
    top: 50px;
    width: 200px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    z-index: 99;
  }
}
</style>