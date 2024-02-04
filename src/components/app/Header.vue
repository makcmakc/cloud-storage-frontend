<template>
  <header>
    <div class="wrapper">
      <div class="app-header">
        <router-link to="/" class="app-logo">
          <div class="app-logo__icon">
            <appleIcloud style="font-size: 2em; stroke: #67c23a; fill: #fff;" />
          </div>
          <div class="app-logo__title">Cloud Storage</div>
        </router-link>

        <div class="app-settings">
          <div class="app-header__profile">

            <el-avatar :size="40" fit="cover" @click="drawer = true" src="https://www.kino-teatr.ru/movie/kadr/147388/1035815.jpg">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>

            <el-drawer v-model="drawer" title="Профиль" :with-header="true">
              <div class="profile__head" style="padding-bottom: 10px">
                <div class="profile__head-info">
                  <div class="profile__head-avatar">
                    <el-avatar :size="100" fit="cover" src="https://www.kino-teatr.ru/movie/kadr/147388/1035815.jpg">
                      <img
                        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                      />
                    </el-avatar>
                  </div>
                <div class="profile__head-desc">
                    <p>Полное имя: <strong>{{ userData.fullName }}</strong></p>
                    <p><strong>{{ user.email }}</strong></p>
                    <p>ID: <strong>{{ user.email }}</strong></p>
                  </div>
                </div>
                <div class="profile__head-action">
                  <el-button>
                    <baselineExitToApp />
                    <span style="margin-left: 10px">Выйти</span>
                  </el-button>
                </div>   
              </div>

              <el-divider>Хранилище</el-divider>

              <div class="profile__body" style="padding-bottom: 10px">
                <Doughnut :data="data" :options="options" />
              </div>

              <el-divider style="padding-bottom: 10px">Статистика</el-divider>

              <div class="statistics" style="background: #EBEDF0; padding: 10px; margin-bottom: 35px">
                <div class="statistic-card">
                  <el-statistic :value="72000" title="New transactions today">
                    <template #title>
                      <div style="display: inline-flex; align-items: center">
                          Monthly Active Users
                          <el-tooltip
                            effect="dark"
                            content="Number of users who logged into the product in one month"
                            placement="top"
                          >
                            <el-icon style="margin-left: 4px" :size="12">
                              <Warning />
                            </el-icon>
                          </el-tooltip>
                        </div>
                    </template>
                  </el-statistic>
                  <div class="statistic-footer">
                    <div class="footer-item">
                      <span>than yesterday</span>
                      <span class="green">
                        16%
                        <el-icon>
                          <CaretTop />
                        </el-icon>
                      </span>
                    </div>
                    <div class="footer-item">
                      <el-icon :size="14">
                        <ArrowRight />
                      </el-icon>
                    </div>
                  </div>
                </div> 
              </div>
              
               <el-divider style="padding-bottom: 10px">Доп. инфо</el-divider>

               <p>Project Name: <strong>cloud-storage</strong></p>
              
            </el-drawer>

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
} from '@element-plus/icons-vue'


import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' 

const authStore = useAuthStore()

const userData = ref('')
const router = useRouter()
const user = ref('')

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

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
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
  // responsive: true,
  // maintainAspectRatio: false,
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 250 },

})



onMounted(async () => {
  // user.value = await authStore.getMe()
  // console.log(user.value)
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


.app-header {
  display: flex;
  align-items: center;
  height: 60px;
}

.app-settings {
  margin-left: auto;

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

.app-logo {
  display: flex;
  align-items: center;
  color: #000;
  width: max-content;

  &__icon {
    margin-right: 10px;
    color: #fff;
  }

  &__title {
    font-weight: 500;
    font-size: 18px;
    color: #303133;
  }
}

.action-bar__anchor {
  margin-right: 10px;
}

.app-action-bar {
  --layout-outer-margin: 20px;

  width: auto;
  left: var(--layout-outer-margin);
  right: calc(var(--layout-outer-margin) - 100vw + 100%);
  border-radius: 0 0 12px 12px;
  position: fixed;
  top: 0;
  color: #fff;
  background-color: #222;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  height: 60px;
  transition: opacity 0.3s ease;
  opacity: 0;
  pointer-events: none;
  z-index: 50;
}
</style>