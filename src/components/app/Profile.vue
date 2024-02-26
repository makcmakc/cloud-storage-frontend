<template>
  <div>
    <el-avatar :size="40" fit="cover" @click="drawer = true" src="https://www.kino-teatr.ru/movie/kadr/147388/1035815.jpg">
      <img
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
      />
    </el-avatar>

    <el-drawer v-model="drawer" size="320" title="Профиль" :with-header="true">
      <div class="profile" style="padding-bottom: 10px">
        <div class="profile-info">
          <div class="profile-info__avatar">
            <el-avatar :size="60" fit="cover" src="https://www.kino-teatr.ru/movie/kadr/147388/1035815.jpg">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </el-avatar>
          </div>
          <div class="profile-info__desc">
            <div class="profile-info__desc-item">Полное имя: <span>{{ user.user_metadata.full_name }}</span></div>
            <div class="profile-info__desc-item">E-mail: <span>{{ user.email }}</span></div>
          </div>
        </div>
        <div class="profile-info__actions">
          <el-button class="default--overwrite" @click="handlesignOut">
            <baselineExitToApp />
            <span style="margin-left: 10px">Выйти</span>
          </el-button>
        </div>   
      </div>

      <el-divider>Хранилище</el-divider>

      <!-- <div class="profile__body" style="padding-bottom: 10px">
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

      <p>Project Name: <strong>cloud-storage</strong></p> -->
      
    </el-drawer>
  </div>  
</template>

<script setup>
import baselineExitToApp from '~icons/ic/baseline-exit-to-app';

import { onMounted, ref } from "vue";
import { useAuthStore } from '@/stores/auth' 
import { useRouter } from 'vue-router'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

const authStore = useAuthStore()

const router = useRouter()
const drawer = ref(false)

const user = ref({})

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


const handlesignOut = async () => {
  await authStore.logout()
  router.push('/auth')
}

onMounted(async () => {
  await authStore.getMe()
  user.value = authStore.getUser
  console.log(user.value)
})
</script>

<style>

</style>