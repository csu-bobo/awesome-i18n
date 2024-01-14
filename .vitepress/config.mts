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
      { text: '电话', link: '/phone/basic' },
    ],

    //侧边栏
    sidebar: {
      'currency/': currencySidebar(),
      'datetime/': datetimeSidebar(),
      'phone/': phoneSidebar(),
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
        { text: '代码学习', 
          items: [
            { text: 'java时间', link: '/datetime/code_study/java_time' },
            { text: 'go时间', link: '/datetime/code_study/go_time' },
            { text: 'icu4j日历类', link: '/datetime/code_study/icu_calendar' },
            { text: 'iana时区数据', link: '/datetime/code_study/iana_tzdata' },
          ]
        },
      ]
    }
  ]
}

function phoneSidebar(){
  return [
    {
      text: '电话',
      items: [
        { text: '基础概念', link: '/phone/basic' },
        { text: '最佳实践', link: '/phone/best_practice' },
        { text: '相关工具', link: '/phone/tools' },
        { text: '代码学习', 
          items: [
            { text: 'libphone库代码', link: '/phone/code_study/libphone' },
            { text: 'libphone库元数据', link: '/phone/code_study/libphone_metadata' },

          ]
        },
      ]
    }
  ]
}