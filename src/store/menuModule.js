import Store from './store'
// 菜单列表，可通过后台返回，返回格式类似就行，还可增加icon图标等字段
const menumap = [
  { name: '首页', hasChilder: false, index: 'index', children: [], includeCom: 'Index' },
  { name: '菜单一', hasChilder: false, index: 'one', children: [], includeCom: 'One' },
  { name: '菜单二', hasChilder: false, index: 'two', children: [], includeCom: 'Two' },
  {
    name: '菜单三',
    hasChilder: true,
    index: 'three',
    children: [
      { name: '子菜单3-1', hasChilder: false, index: 'three3-1', includeCom: 'Three3-1' },
      { name: '子菜单3-2', hasChilder: false, index: 'three3-2', includeCom: 'Three3-2' }
    ],
    includeCom: 'Three'
  },
  {
    name: '菜单四',
    hasChilder: true,
    index: 'four',
    children: [
      { name: '子菜单4-1', hasChilder: false, index: 'four4-1', includeCom: 'Four4-1' },
      { name: '子菜单4-2', hasChilder: false, index: 'four4-2', includeCom: 'Four4-2' }
    ],
    includeCom: 'Four'
  }
]

Store.registerModule('menu', {
  namespaced: true,
  state: {
    menu: [],
    // 默认tabs里面有‘首页’，且没有closable属性，不能删除
    tabs: [
      {
        label: '首页',
        index: 'index',
        includeCom: 'Index'
      }
    ],
    includeCom: ['Index'],
    activeItem: 'index' // 默认选中首页
  },
  getters: {
  },
  mutations: {
    initMenu (state, menu) {
      state.menu = menu
    },
    initTabs (state, tabs) {
      state.tabs = tabs
    },
    initIncludeCom (state, newComs) {
      state.includeCom = newComs
    },
    addTab (state, tab) {
      state.tabs.push(tab)
    },
    addincludeCom (state, com) {
      state.includeCom.push(com)
    },
    switchTab (state, nowIndex) {
      state.activeItem = nowIndex
    }
  },
  actions: {
    getMenu (context) {
      // 查询所有菜单（如果做权限管理，即根据不同用户（角色），显示不同的菜单，可以在后台就判断权限，然后对应有权限的菜单列表）
      context.commit('initMenu', menumap)
    },
    clickMenuItem (context, index) {
      console.log(index)
      // ‘index’一直固定在tabs里面，所有不需要‘addTab’
      if (index !== 'index') {
        // find()函数用来查找目标元素，找到就返回该元素，找不到返回undefined。
        var tab = context.state.tabs.find(f => f.index === index)
        // tabs里面没有，就去总菜单去查询
        if (!tab) {
          let menu = {}
          // 首先查询一级菜单
          menu = context.state.menu.find(f => f.index === index)
          // 如果当前menu不在一级菜单，则查询所有二级菜单
          if (!menu) {
            // flat()用于将嵌套的数组“拉平”，变成一维数组。该方法返回一个新数组，对原数据没有影响
            menu = context.state.menu.map(a => a.children).flat().find(f => f.index === index)
          }
          let newTab = {
            label: menu.name,
            index: menu.index,
            closable: true,
            includeCom: menu.includeCom
          }
          context.commit('addTab', newTab)
          // 缓存组件
          context.commit('addincludeCom', menu.includeCom)
        }
      }
      context.commit('switchTab', index)
    },
    closeTab (context, index) {
      console.log(index)
      // findIndex()函数也是查找目标元素，找到就返回元素的位置，找不到就返回-1。
      let indexNum = context.state.tabs.findIndex(f => f.index === index)
      console.log(indexNum)
      // 当前选中菜单
      let activeItem = context.state.activeItem
      // 除移除的tab之外的所有tabs
      let newTabs = context.state.tabs.filter(f => f.index !== index)
      // 重新初始化tabs
      context.commit('initTabs', newTabs)
      // 筛选被缓存的组件，也就是删除缓存组件
      let newComs = newTabs.map(val => {
        return val.includeCom
      })
      // 重新初始化includeCom
      context.commit('initIncludeCom', newComs)
      // 如果删除的tab正好是当前选中的tab，则执行“switchTab”，改变activeItem
      if (activeItem === index) {
      // 如果indexNum===0，则表示switchTab到index（但是‘首页’不可能被删除，所以如果indexNum不可能为0），否则跳转到删除tab的上一个tab
        context.commit('switchTab', indexNum === 0 ? 'index' : newTabs[indexNum - 1].index)
      }
    }
  }
})
