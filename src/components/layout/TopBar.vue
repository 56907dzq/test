<template>
  <div class="top-bar">
    <el-row>
      <el-col :span="8" class="logo-container">
        <img src="../../assets/logo.png" class="logo" alt />
        <span class="title">后台管理系统</span>
      </el-col>
      <el-col :span="4" class="user">
        <div class="userinfo">
          <img src="../../assets/user.png" class="avatar" alt />
          <div class="welcome">
            <p class="name avatarname">LT</p>
          </div>
          <span class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    setDialogInfo (cmditem) {
      // 清除localStorage缓存
      localStorage.clear()
      // 初始化Tabs
      this.initTabs([
        {
          label: '首页',
          index: 'index',
          includeCom: 'Index'
        }
      ])
      // 页面跳转
      this.$router.push('/login')
    },
    ...mapMutations('menu', {
      initTabs: 'initTabs'
    })
  }
}
</script>

<style scoped>
.top-bar {
  height: 100%;
}
.logo-container {
  width: 205px;
  margin-left: 10px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}

.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}

.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
</style>
