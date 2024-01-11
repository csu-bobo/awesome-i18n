## 时间相关标准

ISO 8601 ：该标准规定了日期和时间的表示方法，包括年、月、日、小时、分钟和秒等信息，也可以表示带时区偏移量的日期和时间。该标准适用于各种应用场景，如数据交换、文件存储、电子邮件等等。

https://zh.wikipedia.org/wiki/ISO_8601

## 时间五阶段

时间五个阶段：录入、计算、存储、传递、展示

### 录入

1、**【建议】** 客户端用户录入时间时，需保存时间字符串+时区信息（可用cityId或者timezone）。录入之后，要么直接将时间字符串和时区传递给服务端，要么端上转换为时间戳传递给服务端。

2、**【建议】** 服务端生成时间时，可以直接生成时间戳

### 计算

1、**【强制】** 时间戳不受时区影响，同一时刻全球的时间戳是一致的。时长计算要基于时间戳进行。

2、**【强制】** 日历计算（比如+1天）不要自己加减时间，应该使用统一i18n-sdk的日历类Calendar进行。

> 在夏令时切换的那一天，一天不是24小时，可能是23或者25小时。因此加一天不能硬编码86400s或者24h。大部分国家一般都是在 00:00:00 到03:00:00切换令时
    

```java
//bad case
long sevenDaysLater = System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000

//good case
long sevenDaysLater = CalendarUtil.addDate(cityId, System.currentTimeMillis(), 0, 0, 7);
```

3、**【强制】** 必须要保证时区数据库是最新版本。

> 解释：时区数据库是旧版本可能导致时间计算和展示出错。
>
> 最新时区版本可从https://www.iana.org/time-zones 获取，时区变更新闻可从https://github.com/eggert/tz/blob/main/NEWS查看。

### 存储

1、**【建议】** 存储过去和现在的时间，要么存储时间戳，要么存储时间字符串加时区信息。比如mysql中存为timestamp就是时间戳，存为datetime就是时间字符串加默认时区东八区。

2、**【建议】** 存储未来时间，会比较麻烦，存储时间戳的话，由于夏令时调整，对应的时间字符串可能会变化。

因此建议存储时间字符串，加时区属性，并尽可能避开夏令时调整的时候（因为可能某一天没有1:30，也有可能有2个1:30）。

3、**【强制】** 存储时区应该使用cityId或者时区完整名称（如Asia/Shanghai、Asia/Hong_Kong）。不建议使用utc_offset、简写格式（如CST）、UTC+8、GMT+8等格式。

- utc_offset就是当地时间与协调世界时（UTC）之间的时间差（比如东八区就是+480分钟）。在夏令时切换后会变化，一个订单的开始、结束时间的utc_offset可能都会不同。
- 时区简写方式会出现冲突, 比如 CST 不同平台上表示的含义不一样
    - CST中原标准时间，Chungyuan Standard Time
    - CST澳洲中部时间，Central Standard Time (Australia)
    - CST北美中部时区，Central Standard Time (North America)
    - CST古巴标准时间，Cuba Standard Time
- 跟utc_offset一样，一个地方的时区可能会变化，夏令时本质就是从 GMT-7切换到GMT-6，因此不建议使用GMT-6这样的格式来表示时区。

```java
// bad 
TimeZone timeZone = TimeZone.getTimeZone("GMT-8");
TimeZone timeZone = TimeZone.getTimeZone("CST");
```

### 传递

1、**【建议】** 传递时要么传时间戳， 要么传时间字符串+时区信息。不能光传一个时间字符串，因为可能上下游时区理解不一致，比如上游传递的是当地时间，下游以为是北京时间。

### 展示

1、**【强制】** 给用户展示时间时，一定要转换为当地人看得懂的时间字符串，不能写死时间格式。而应该使用i18n-sdk提供的函数进行格式化（i18n-sdk确保时间格式当地人看得懂）。

> 解释：不同国家时间格式不同，比如:
>    - CN(中国): 2019-12-31 01:59:59
>    - BR(巴西): 31/12/2019 01:59:59
>    - CO(哥伦比亚): 31/12/2019, 01:59:59 am
>    - AU(澳大利亚): 31/12/2019, 1:59:59 am
>    - EG(埃及): 2019/11/11، 10:11
    

```java
//bad
SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Tokyo")); // 设置东京时区 
dateFormat.format(localDate);

//bad
String date = String.format("%s-%s-%s", localDate.getYear(), localDate.getMonthValue(), localDate.getDayOfMonth());

//good
String s = DateTime.formatByCityId(cityId, timestamp, DateStyleEnum.YYYYMMDD, TimeStyleEnum.HHMMSS);
System.out.println(s);
```

2、**【强制】** 时间格式化时，有时需要自定义时间pattern。注意不要使用“YYYY”，而是使用“yyyy”，前者表示 周所在的年，后者才是表示年。

> 举例：时间戳 1640880000（秒为单位），应该是2021-12-31 00:00:00，但是YYYY或者Y格式化的结果是2022年

3、**【建议】** 给用户展示时间，格式化时间不建议使用原生的时间函数，比如java的SimpleDateFormat类。如果使用，需要注意底层依赖的时区数据库版本是否最新，需要注意时间格式是否符合当地格式。建议使用i18n sdk的函数。

4、**【强制】** 给用户展示时间时，时间格式化需要指定用户的时区，不能使用系统默认时区。

> 系统默认时区和用户的时区不一致，不指定时区会导致时间展示错误。