
# 一、基础概念

## 1. locale的定义

locale：区域设置。

lcaole标识了一个特定的用户社区——一群具有相似文化和语言期望的用户。

[icu中的locale解释](https://unicode-org.github.io/icu/userguide/locale/#the-locale-concept)

[维基百科中的locale解释](https://zh.wikipedia.org/wiki/%E5%8C%BA%E5%9F%9F%E8%AE%BE%E7%BD%AE)

locale决定着i18n元素（时间格式、货币格式、度量衡格式等）的样式。

## 2. locale的组成

一般由 **语言码** 和 **地区码** 组成。

```markdown
zh-CN 中文+中国大陆
en-US 英文+美国
pt-BR 葡语+巴西
es-MX 西语+墨西哥
```

完整的组成部分：

locale = **Language + [Script] + [Country] + [Variant] + [Keywords]**

示例：
| Locale ID | Language | Script | Country | Variant | Keywords | Definition |
| --- | --- | --- | --- | --- | --- | --- |
| en_US | en |  | US |  |  | English, United States of America.Browse in https://icu4c-demos.unicode.org/icu-bin/locexp?_=en_US |
| en_IE_PREEURO | en |  | IE |  |  | English, Ireland.Browse in https://icu4c-demos.unicode.org/icu-bin/locexp?_=en_IE_PREEURO |
| en_IE@currency=IEP | en |  | IE |  | currency=IEP | English, Ireland with Irish Pound.Browse in https://icu4c-demos.unicode.org/icu-bin/locexp?_=en_IE@currency=IEP |
| eo | eo |  |  |  |  | Esperanto.Browse in https://icu4c-demos.unicode.org/icu-bin/locexp?_=eo |
| fr@collation=phonebook;calendar=islamic-civil | fr |  |  |  | collation=phonebookcalendar=islamic-civil | French (Calendar=Islamic-Civil Calendar, Collation=Phonebook Order).Browse in https://icu4c-demos.unicode.org/icu-bin/locexp?_=fr@collation=phonebook;calendar=islamic-civil |
| sr_Latn_RS_REVISED@currency=USD | sr | Latn | RS | REVISED | currency=USD | Serbian (Latin, Yugoslavia, Revised Orthography, Currency=US Dollar)Browse in https://icu4c-demos.unicode.org/icu-bin/locexp?d_=en&_=sr_Latn_RS_REVISED@currency=USD |

# 二、ICU4J的ULocale类

## 1. 简介

`ULocale` 类是 ICU4J 库中用于处理语言、国家以及变种的类。它是使用ICU其他功能的前置参数。

它是 `java.util.Locale` 类的替代品，提供了更丰富的国际化功能。

`ULocale` 支持更多的语言和国家代码，包括了对 IETF BCP 47 语言标签和 Unicode 区域扩展的支持。

## 2. 常用方法

### 2.1 实例化

1. 直接使用构造函数

```java
ULocale locale = new ULocale("en_US");
```

这种方式通过传递一个合法的区域设置字符串来创建 `ULocale` 实例。字符串通常遵循 `"语言_国家/地区"` 的格式，其中语言是两个小写字母的 ISO 639 代码，国家/地区是两个大写字母的 ISO 3166 代码。

2. 使用静态工厂方法 `forLanguageTag`

```java
ULocale locale = ULocale.forLanguageTag("en-US");
```

这种方式根据 IETF BCP 47 语言标签创建 `ULocale` 实例。这个方法接受的是一个符合 BCP 47 标准的语言标签字符串，可以包含语言、脚本、国家/地区和变种。

3. 使用预定义的常量

```java
ULocale locale = ULocale.ENGLISH;
```

`ULocale` 提供了一系列预定义的常量，如 `ENGLISH`、`FRENCH`、`GERMAN` 等，这些常量代表了一些最常用的区域设置。

4. 使用 `Locale` 转换

```java
java.util.Locale javaLocale = new java.util.Locale("en", "US");
ULocale locale = ULocale.forLocale(javaLocale);

```

如果你已经有了一个 `java.util.Locale` 实例，可以通过 `ULocale` 的 `forLocale` 静态方法将其转换为 `ULocale` 实例。

5. 使用静态方法 `ULocale.createCanonical()`

```java
ULocale locale = ULocale.createCanonical("zh")
```

此方法用于创建 `ULocale` 的规范形式。参数 `"zh"` 可以是任何形式的区域设置标识符，此方法会尝试将其转换为规范形式。

### 2.2 获取国家、语言、显示名称

- `getDisplayName()`: 获取区域设置的显示名称。
- `getLanguage()`: 返回语言代码。
- `getCountry()`: 返回国家/地区代码。
- `getScript()`: 返回脚本代码。
- `getVariant()`: 返回区域设置变体代码。

- `toString()`: 返回区域设置的字符串表示形式。
- `toLanguageTag()`: 将 `ULocale` 实例转换为符合 IETF BCP 47 的语言标签。

## 3. 核心变量

- `ROOT`: 表示无特定区域设置的 ULocale 实例。
- `ENGLISH`, `FRENCH`, `GERMAN` 等: 提供了一系列预定义的 `ULocale` 实例，代表常见的语言和区域设置。

## 4. 使用示例

```java
// 创建 ULocale 实例
ULocale locale = new ULocale("en_US");

// 获取显示名称
String displayName = locale.getDisplayName();

// 获取语言代码
String language = locale.getLanguage();

// 获取国家代码
String country = locale.getCountry();

// 通过 IETF BCP 47 语言标签创建 ULocale 实例
ULocale localeFromTag = ULocale.forLanguageTag("en-US");

// 转换为字符串
String localeStr = locale.toString();

// 转换为 IETF BCP 47 语言标签
String languageTag = locale.toLanguageTag();

```

## 5.注意事项

- `ULocale` 类与 `java.util.Locale` 类不完全兼容，因此在使用 `ULocale` 时，应当注意不要将其与需要 `java.util.Locale` 的 API 混用。
- 在处理 IETF BCP 47 语言标签时，需要注意标签的格式和规范，以确保正确创建 `ULocale` 实例。
- 由于 `ULocale` 提供了比 `java.util.Locale` 更多的功能，所以在使用 ICU4J 时，应优先考虑使用 `ULocale`。