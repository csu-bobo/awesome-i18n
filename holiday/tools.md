## 1、网站
- Time and Date (https://www.timeanddate.com/holidays/) - 提供全球节假日的信息和日期计算工具。
- Holiday API (https://www.holidayapi.com/) - 提供全球节假日信息和日期查询功能。
- Office Holidays (https://www.officeholidays.com/) - 提供全球节假日信息，按国家和地区分类。
- Public Holidays(https://publicholidays.com/)-提供全球节假日信息和日期的网站，数据比较准确，有些还有官方数据链接

## 2、API接口
- Calendarific (https://calendarific.com/) - 提供全球节假日和工作日的API接口，支持按国家和地区查询。
- Holiday API (https://www.holidayapi.com/) - 上述网站也提供了API接口，可以查询全球节假日信息。
- https://docs.abstractapi.com/holidays

基本都是根据 country和年份，获取节假日列表.
返回值包含日期、节假日名称（英文和当地名称）、节假日类型、备注、周几等信息
/holidays?country=CN&year=2023&month=1

    {
        "name": "New Year's Day",
        "name_local": "",
        "description": "",
        "country": "SG",
        "type": "National",
        "date": "01/02/2023",
        "date_year": "2023",
        "date_month": "01",
        "date_day": "02",
        "week_day": "Monday"
    }
    
举例：
https://calendarific.com/api/v2/holidays?&api_key=PjPDg8w30ZDu9QW0pcPx1eV0ywFLasJc&country=CN&year=2023

## 3、开源github数据集
https://github.com/commenthol/date-holidays

## 4、维基百科
- 公众假日：https://zh.wikipedia.org/wiki/%E5%85%AC%E7%9C%BE%E5%81%87%E6%97%A5
- 银行假日：https://zh.wikipedia.org/wiki/%E9%8A%80%E8%A1%8C%E5%81%87%E6%97%A5