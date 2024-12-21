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
      { 
        text: 'i18n元素', 
        items: [
          { text: '货币', link: '/currency/basic' },
          { text: '时间', link: '/datetime/basic' },
          { text: '电话', link: '/phone/basic' },
          { text: '翻译', link: '/translation/basic' },
        ]
      },
      { text: '相关标准', link: '/standard/readme' },
      { text: '开源项目', link: '/open_source_project/readme' },
    ],

    //侧边栏
    sidebar: {
      'currency/': currencySidebar(),
      'datetime/': datetimeSidebar(),
      'phone/': phoneSidebar(),
      'translation/': translationSidebar(),
      'standard/': standardSidebar(),
      'open_source_project/': projectSidebar(),
      
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    
  }
})

function translationSidebar(){
  return [
    {
      text: '翻译',
      items: [
        { text: '基础概念', link: '/translation/basic' },
        { text: '单复数', link: '/translation/plural_rule' },
        { text: '最佳实践', link: '/translation/best_practice' },
      ]
    }
  ]
}

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
            { text: 'icu4j日历类', link: '/datetime/code_study/icu4j_calendar' },
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

function standardSidebar(){
  return [
    {
      text: '标准',
      items: [
        { text: 'ISO标准', link: '/standard/iso' },
        { text: 'unicode标准', link: '/standard/unicode' },
        { text: 'BCP47标准', link: '/standard/bcp47' },
        { text: '时区标准', link: '/standard/iana' },
      ]
    }
  ]
}

function projectSidebar(){
  return [
    {
      text: '开源项目',
      items: [
        { text: 'CLDR', link: '/open_source_project/cldr/basic' },
        { text: 'ICU', 
          items: [
            { text: '基础信息', link: '/open_source_project/icu/basic' },
            { text: 'locale', link: '/open_source_project/icu/locale' },
            { text: 'ICU4J日历类', link: '/open_source_project/icu/icu4j_calendar' },
            { text: 'ICU4J数字格式化', link: '/open_source_project/icu/icu4j_NumberFormatter' },
          ]
        },
        { text: 'libphonenumber', link: '/open_source_project/libphonenumber/readme'},
      ]
    }
  ]
}