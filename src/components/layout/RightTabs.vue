<template>
    <!-- 参考element-ui中Tabs组件 -->
   <el-tabs :value="activeItem" @tab-remove="tabRemove" class='content-body' @tab-click="tabClick">
        <el-tab-pane v-for="item in tabs" :label="item.label" :key="item.index" :name="item.index"  :closable="item.closable">
        </el-tab-pane>
   </el-tabs>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('menu', {
      tabs: 'tabs',
      activeItem: 'activeItem'
    })
  },
  created () {
    console.log(this.tabs)
  },
  methods: {
    ...mapActions('menu', {
      closeTab: 'closeTab'
    }),
    ...mapMutations('menu', {
      switchTab: 'switchTab'
    }),
    tabClick (e) {
      this.switchTab(e.name)
      this.$router.push({ path: e.name })
    },
    tabRemove (e) {
      let t = this
      // 异步阻塞一下，否则activeItem还是当前关闭tab的值
      setTimeout(function () {
        t.$router.push({ path: t.activeItem })
      }, 1)
      this.closeTab(e)
    }
  }
}
</script>
<style scoped>
.content-body {
  height: 40px !important;
}
</style>
