<template>
  <el-menu
    :default-active="activeItem"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    router
    :unique-opened='true'
    @select="clickMenuItem"
  >
    <template v-for="(item,index) in menu">
      <el-submenu v-if="item.hasChilder" :index="item.index" :key="index">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>{{item.name}}</span>
        </template>
        <template v-for="(v,i) in item.children">
          <el-menu-item :index="v.index" :key="i">{{v.name}}</el-menu-item>
        </template>
      </el-submenu>
      <template v-else>
        <el-menu-item :key="index" :index="item.index" >
          <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.name}}</span>
            </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      currFatherIndex: ''
    }
  },
  mounted () {
    this.getMenu()
  },
  methods: {
    ...mapActions('menu', {
      getMenu: 'getMenu',
      clickMenuItem: 'clickMenuItem'
    })
  },
  computed: {
    ...mapState('menu', {
      menu: 'menu',
      activeItem: 'activeItem'
    })
  }
}
</script>

<style scoped>
.el-menu > ul,
.el-menu {
  height: 100%;
}
.el-aside {
  height: 100%;
}
</style>
