import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "i18n-awesome",
  description: "awesome",
  base: '/repo/',

  themeConfig: {
     // 启用内置搜索框
     search: {
      provider: 'local'
    },

    //首页最上边的导航栏
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '货币', link: '/currency/overview' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    //侧边栏
    sidebar: {
      'currency': currencySidebar(),

    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    
  }
})

function currencySidebar(){
  return [
    {
      text: 'Examples',
      items: [
        { text: 'Markdown Examples', link: '/markdown-examples' },
        { text: 'Runtime API Examples', link: '/api-examples' }
      ]
    }
  ]
}

function datetimeSidebar(){
  return [
    {
      text: 'Examples',
      items: [
        { text: 'Markdown Examples', link: '/markdown-examples' },
        { text: 'Runtime API Examples', link: '/api-examples' }
      ]
    }
  ]
}