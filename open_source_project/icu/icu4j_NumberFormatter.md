
# com.ibm.icu.number.NumberFormatter
## 1. 简介

ICU4J的NumberFormatter类用于格式化数字，包括货币、数字、度量衡等。

它提供了丰富的配置选项来适应不同语言和地区的格式化需求。

与Java原生的NumberFormat相比，NumberFormatter提供了更加强大和灵活的功能，特别是在国际化方面。

## 2. 使用示例
### 2.1 数字格式化

```java
//基础数字格式化
String s = NumberFormatter.withLocale(new ULocale("en-US")).format(1234.5).toString();
System.out.println(s); //1,234.5
```

### 2.2 货币格式化
```java
//货币格式化
s = NumberFormatter.withLocale(new ULocale("zh-CN"))
        .unit(Currency.getInstance("CNY"))
        .format(12.3)
        .toString();
System.out.println(s); //¥12.30
```

### 2.3 度量衡格式化

```java
//长度格式化
s = NumberFormatter.withLocale(new ULocale("zh-CN"))
        .unit(MeasureUnit.METER) //格式化为多少米
        .format(12.3)
        .toString();
System.out.println(s);  //12.3米

//倒计时格式化
s = NumberFormatter.withLocale(new ULocale("zh-CN"))
        .unit(TimeUnit.HOUR) //格式化为多少小时
        .format(12.3)
        .toString();
System.out.println(s);  //12.3小时
```

## 3. 底层实现原理

### 3.1 特性

`NumberFormatter`的设计遵循着构建器模式（Builder Pattern），它允许通过**链式调用**设置不同的格式化参数。底层实现原理涉及以下几个核心组件：

1. **构建器模式**: 允许逐步构建复杂对象而不直接暴露其创建逻辑。
2. **不可变对象**: `NumberFormatter`的实例一旦创建，其配置就不可更改，这样可以确保线程安全并减少运行时错误。
3. **本地化**: `NumberFormatter`使用`Locale`对象来适应不同地区的格式化规则。
4. **格式化选项**: 通过一系列的方法（如`notation()`, `unit()`, `precision()`等）来设置数字的显示方式。

### 3.2 工作流程

```java
NumberFormatter.with()
      .notation(Notation.compactShort())
      .unit(Currency.getInstance("EUR"))
      .precision(Precision.fixedFraction(2))
      .locale(new ULocale("zh-CN"))
      .format(1234)
      .toString();

```
当你调用`NumberFormatter.with()`方法时，实际上你开始了一个新的格式化过程。以下是一个典型的工作流程：

1. **初始化**: `NumberFormatter.with()`创建一个新的`NumberFormatter`实例，这是一个空白的配置，等待进一步的设置。
2. **链式配置**: 通过链式调用，你可以设置各种格式化选项。每次调用返回一个新的`NumberFormatter`实例，它包含了之前所有的配置以及最新的设置。
3. **应用本地化**: 通过`.locale(...)`方法，你可以指定一个`Locale`对象，它决定了数字如何根据特定的地区规则进行格式化。
4. **格式化数字**: 最终调用`.format(1234)`方法时，`NumberFormatter`结合之前的所有设置，生成一个`FormattedNumber`对象。
5. **输出结果**: `FormattedNumber.toString()`方法将格式化的数字转换为字符串形式，这是最终的输出。

## 4. 核心方法说明
### 4.1 unit 单位
- 货币Currency
- 度量衡单位MeasureUnit
  - 长度：MeasureUnit.METER、MeasureUnit.KILOMETER等
  - 重量
  - 温度
  - 速度
  - 其他
- 时间单位TimeUnit
- 无单位NoUnit
  - 百分比
  - 千分比

```java
//货币格式化
s = NumberFormatter.withLocale(new ULocale("zh-CN"))
        .unit(Currency.getInstance("CNY"))
        .format(12.3)
        .toString();
System.out.println(s);

//长度格式化
s = NumberFormatter.withLocale(new ULocale("zh-CN"))
        .unit(MeasureUnit.METER) //格式化为多少米
        .format(12.3)
        .toString();
System.out.println(s);  //12.3米

//倒计时格式化
s = NumberFormatter.withLocale(new ULocale("zh-CN"))
        .unit(TimeUnit.HOUR) //格式化为多少小时
        .format(12.3)
        .toString();
System.out.println(s);  //12.3小时

//百分比格式化
s = NumberFormatter.withLocale(new ULocale("zh-CN"))
        .unit(NoUnit.PERCENT) //格式化为百分比
        .format(12.3)
        .toString();
System.out.println(s);  //12.3%
```

### 4.2 notation 数字的表示法
- Simple简单计数法，**默认的表示法**，例如 "123,456.78"
- 紧凑计数法
  - compactShort紧凑的短格式，例如 "1.23M"（百万）。
  - compactLong紧凑的长格式，例如 "1.23 million"（百万）。
- Scientific科学计数法，例如 "1.23456789E6"
- Engineering工程计数法，类似于科学计数法，但指数是 3 的倍数。


```java
//紧凑短数字表示法
s = NumberFormatter.withLocale(new ULocale("en-US"))
        .notation(Notation.compactShort())
        .format(12340)
        .toString();
System.out.println(s);  //12K
```
### 4.3 precision 精度

```java
//数字格式化，保留2位小数
s = NumberFormatter.withLocale(new ULocale("en-US"))
        .precision(Precision.fixedFraction(2)) //固定保留2位小数
        .format(12.3)
        .toString();
System.out.println(s);  //12.30

//数字格式化，最多保留2位小数
s = NumberFormatter.withLocale(new ULocale("en-US"))
        .precision(Precision.maxFraction(2)) //最多保留2位小数
        .format(12.3)
        .toString();
System.out.println(s);  //12.3
```

### 4.4 unitWidth 单位宽度
- Short: 短格式，比如"$12.00", "12 m"
- Narrow: 窄格式，通常更加紧凑，比如 "km"。
- ISO Code: 货币使用ISO码，比如"USD 12.00"
- Full name: 全名，比如"12.00 US dollars", "12 meters"

```java
//货币展示使用ISO码
s = NumberFormatter.withLocale(new ULocale("en-US"))
        .unit(Currency.getInstance("CNY"))
        .unitWidth(NumberFormatter.UnitWidth.ISO_CODE)
        .format(12.3)
        .toString();
System.out.println(s);  //CNY 12.30

//格式化温度（华氏度），展示全名
s = NumberFormatter.withLocale(new ULocale("en-US"))
        .unit(MeasureUnit.CELSIUS)
        .unitWidth(NumberFormatter.UnitWidth.FULL_NAME)
        .format(12.3)
        .toString();
System.out.println(s);  //12.3 degrees Celsius
```
### 4.5 symbols 数字符号
设置数字符号（decimal separator, grouping separator, percent sign, rtc.）
```java
//数字格式化，设置分组分隔符（千分位分隔符）为空格
DecimalFormatSymbols symbols = DecimalFormatSymbols.getInstance(new ULocale("en-US"));
symbols.setGroupingSeparator(' ');
s = NumberFormatter.withLocale(new ULocale("en-US"))
        .symbols(symbols)
        .format(12345.6)
        .toString();
System.out.println(s);  //12 345.6
```

### 4.6 roundingMode 舍入模式
- HALF_EVEN：[银行家舍入](https://baike.baidu.com/item/%E9%93%B6%E8%A1%8C%E5%AE%B6%E8%88%8D%E5%85%A5)，**默认方式**
- HALF_UP: 四舍五入
- CEILING:向上取整
- FLOOR：向下取整
- 其他

```java
//数字格式化，保留1位小数，且使用四舍五入
s = NumberFormatter.withLocale(new ULocale("en-US"))
        .precision(Precision.fixedFraction(1)) //保留1位小数
        .roundingMode(RoundingMode.HALF_UP) //四舍五入
        .format(12.25)
        .toString();
System.out.println(s);  //12.3
```

