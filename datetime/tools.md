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