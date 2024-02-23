<template>
  <div class="app-header__profile">
    <el-avatar :size="40" fit="cover" @click="drawer = true" src="https://www.kino-teatr.ru/movie/kadr/147388/1035815.jpg">
      <img
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
      />
    </el-avatar>

    <el-drawer v-model="drawer" size="25%" title="Профиль" :with-header="true">
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
            <div>Полное имя: <span>{{ user.user_metadata.full_name }}</span></div>
            <div>E-mail: <span>{{ user.email }}</span></div>
            <div>ID: <span>{{ user.id }}</span></div>
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
</template>

<script setup>

</script>

<style>

</style>