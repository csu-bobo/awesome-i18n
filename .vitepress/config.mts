import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "awesome-i18n",
  description: "awesome",
  base: '/awesome-i18n/',

  themeConfig: {
     // 启用内置搜索框
     search: {
      provider: 'local'
    },
    //网站的标题
    siteTitle: 'awesome-i18n',
    // 页面右侧显示的标题级别
    outline:[1, 3],

    //首页最上边的导航栏
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '货币', link: '/currency/basic' },
      { text: '时间', link: '/datetime/basic' },
    ],

    //侧边栏
    sidebar: {
      'currency/': currencySidebar(),
      'datetime/': datetimeSidebar(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    
  }
})

function currencySidebar(){
  return [
    {
      text: '货币',
      items: [
        { text: '基础概念', link: '/currency/basic' },
        { text: '最佳实践', link: '/currency/best_practice' },
        { text: '相关工具', link: '/currency/tools' },
      ]
    }
  ]
}

function datetimeSidebar(){
  return [
    {
      text: '时间',
      items: [
        { text: '基础概念', link: '/datetime/basic' },
        { text: '最佳实践', link: '/datetime/best_practice' },
        { text: '相关工具', link: '/datetime/tools' },
      ]
    }
  ]
}