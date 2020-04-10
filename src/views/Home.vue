<template>
  <el-container>
    <el-header>
      <top-bar />
    </el-header>
    <el-container>
      <el-aside width="205px">
        <left-nav />
      </el-aside>
      <el-main>
        <right-tabs />
        <div class="content-wrap">
          <!--keep-alive 缓存组件 -->
          <keep-alive :include="includeCom">
            <router-view />
          </keep-alive>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import LeftNav from '@/components/layout/LeftNav.vue'
import RightTabs from '@/components/layout/RightTabs.vue'
import TopBar from '@/components/layout/TopBar.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    LeftNav,
    RightTabs,
    TopBar
  },
  computed: {
    ...mapState('menu', {
      includeCom: 'includeCom'
    })
  },
  mounted () {
    // 刷新时以当前路由做为tab加入tabs
    this.clickMenuItem(this.$route.name)
  },
  methods: {
    ...mapActions('menu', {
      clickMenuItem: 'clickMenuItem'
    })
  },
  watch: {
    $route (to, from) {
      this.clickMenuItem(to.name)
    }
  }
}
</script>

<style>
.el-header {
  /* background-color: #b3c0d1; */
  box-shadow: 0 2px 4px rgba(0,0,0,.08);
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: left;
  line-height: 200px;
  height: calc(100% + 60px);
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  height: calc(100% + 60px);
  padding: 0px 0px 0px 10px !important;
}
.el-container {
  height: calc(100% - 60px);
}

.content-wrap {
  border: 1px solid #dcdff7;
  border-top: none;
  height: calc(100% - 60px);
}
</style>
