# 相关工具

## 一、时间格式化

[时间戳转时间字符串](https://tool.chinaz.com/Tools/unixtime.aspx)

## 二、时区相关工具

### 1. 时区权威数据下载

https://www.iana.org/time-zones

### 2. **time.is**

主页：https://time.is/

简介：所有时区的精确时间

- 精确时间：https://time.is/ 当地精确时间，包括年月日时分秒、周、日升日落时间等
- 时间比较：https://time.is/compare， 比较两个地方的时间差
- 时区：https://time.is/time_zones，根据UTC偏移量分组，列出所有的国家列表
- 夏令时：https://time.is/DST_2023，汇总了 2023 年全球的夏令时和时区调整。按照时间排序
- 日历：https://time.is/calendar，日历信息，还包含公共节假日
- 时区新闻：https://time.is/time_zone_news，包括最近时区规则有哪些变更

### 3. **timezoneDB**

TimezoneDB是一个提供时区数据库和API服务的平台

**时区数据库**

包含国家名称、时区名称、令时切换时间戳、offset偏移等信息

可以下载csv或者sql文件

链接：https://timezonedb.com/download

### 4.时区查看网站
https://nodatime.org/TimeZones 

### 5.java jdk时区升级工具
https://www.azul.com/products/components/ziupdater-time-zone-tool/

**api工具**

https://timezonedb.com/api

- List Time Zone：根据国家、时区名等获取所有时区信息

- Get Time Zone：
    - 根据位置（经纬度）查询时区信息
    - 根据时区名查询时区信息
    - 根据城市名查询时区信息
    - 根据ip查询时区信息

- Convert Time Zone：转换两个时区的时间戳等信息

## 三、节假日数据

网站：

- Time and Date (https://www.timeanddate.com/holidays/) - 提供全球节假日的信息和日期计算工具。
- Holiday API (https://www.holidayapi.com/) - 提供全球节假日信息和日期查询功能。
- Office Holidays (https://www.officeholidays.com/) - 提供全球节假日信息，按国家和地区分类。

API接口：

- Calendarific (https://calendarific.com/) - 提供全球节假日和工作日的API接口，支持按国家和地区查询。
- Holiday API (https://www.holidayapi.com/) - 上述网站也提供了API接口，可以查询全球节假日信息。

## 四、星期数据
- [cldr](https://github.com/unicode-org/cldr-json/blob/main/cldr-json/cldr-core/supplemental/weekData.json)这个CLDR文件定义了与星期相关的规则。

文件主要通过以下几个字段来定义星期规则：

| 字段/对象 | 说明 |
| :--- | :--- |
| `minDays` 对象 | **定义了不同地区将一周的第一天（如周一）纳入**。<br> 例如，在美国，即使1月1日是周六，只要该周包含1月1日，它就被视为第一周。<br> 在某些欧洲国家，一周必须至少包含4天属于新的一年，才被视为新年第一周。 |
| `firstDay` 对象 | **定义了一周从哪一天开始（日历组件使用，第一列是哪一列）**。<br> 在许多中东地区（如阿富汗），一周从**周六**开始。<br> 在大多数欧美和东亚地区，一周从**周日**或**周一**开始。 |
| `weekendStart` & `weekendEnd` 对象 | **定义了周末的范围**。<br> 例如，在典型的**周五-周六**为周末的地区，`weekendStart` 可能是周五，`weekendEnd` 是周六。<br> 需要注意的是，`weekendEnd` 有时可能在日历顺序上早于 `weekendStart`（例如，周末从周六开始到周日结束，而周日是一周的第一天）。 |


| 周末类型 | 周末范围 | 适用国家/地区 (括号内为代码) |
| --- | --- | --- |
| **周六-周日 (全球主流)** | 周六开始，周日结束 | **全球默认 (001)**、以及所有未在列表中特别指定的国家 |
| **周五-周六 (伊斯兰传统)** | 周五开始，周六结束 | **多数中东伊斯兰国家**：巴林 (BH)、阿尔及利亚 (DZ)、埃及 (EG)、伊拉克 (IQ)、约旦 (JO)、科威特 (KW)、利比亚 (LY)、阿曼 (OM)、卡塔尔 (QA)、沙特阿拉伯 (SA)、苏丹 (SD)、叙利亚 (SY)、也门 (YE) |
| **周四-周五** | 周四开始，周五结束 | **阿富汗 (AF)** |
| **周五-周五** | 仅周五休息 | **伊朗 (IR)** |
| **周五-周六** (特殊情况) | 从周五日落到周六 | **以色列 (IL)** |
| **周日-周日** | 仅周日休息 | **印度 (IN)**、**乌干达 (UG)** |
