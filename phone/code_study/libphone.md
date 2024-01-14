# 谷歌的libphonenumber代码学习

## 1. 电话号码 定义

phonenumber.proto

```

// Definition of protocol buffer for representing international telephone numbers.

syntax = "proto2";

option java_package = "com.google.i18n.phonenumbers";
option optimize_for = LITE_RUNTIME;

package i18n.phonenumbers;

message PhoneNumber {
  // 国家码，例如中国的国家码是86，美国的国家码是1。
  required int32 country_code = 1;

  // 在国家内部的电话号码，也就是去掉国家码后的电话号码。
  // 没有前缀0，没有空格等
  required uint64 national_number = 2;

  // 分机号，用于在一个电话系统内部区分不同的线路。
  optional string extension = 3;

  // 意大利电话号码的前导零，意大利的电话号码有时候会以一个或多个零开头。
  optional bool italian_leading_zero = 4;
  // 前导零的数量，用于记录电话号码开头的零的数量。
  optional int32 number_of_leading_zeros = 8 [ default = 1 ];

  // 原始的电话号码字符串，也就是用户输入的电话号码字符串。
  optional string raw_input = 5;

  // 表示电话号码中国家码的来源
  enum CountryCodeSource {
    // 默认值，表示国家码的来源未知或未指定。
    UNSPECIFIED = 0;

    // 表示国家码是从带有加号的电话号码中解析出来的。
    // The country_code is derived based on a phone number with a leading "+",
    // e.g. the French number "+33 1 42 68 53 00".
    FROM_NUMBER_WITH_PLUS_SIGN = 1;

    // 表示国家码是从带有国际直拨前缀的电话号码中解析出来的
    // The country_code is derived based on a phone number with a leading IDD,
    // e.g. the French number "011 33 1 42 68 53 00", as it is dialled from US.
    FROM_NUMBER_WITH_IDD = 5;

    // 表示国家码是从不带有加号的电话号码中解析出来的
    // The country_code is derived based on a phone number without a leading
    // "+", e.g. the French number "33 1 42 68 53 00" when defaultCountry is
    // supplied as France.
    FROM_NUMBER_WITHOUT_PLUS_SIGN = 10;

    // 表示国家码是使用默认的国家码。例如，当解析的电话号码没有明确的国家码，且用户设置了默认的国家码时，会使用这个默认的国家码。
    FROM_DEFAULT_COUNTRY = 20;
  }

  // 国家码的来源，用于记录国家码是从哪里得到的。
  optional CountryCodeSource country_code_source = 6;

  // 在国内优先使用的运营商代码，用于记录在一个国家内部，优先使用哪个运营商的网络。
  optional string preferred_domestic_carrier_code = 7;
}

// Examples:
//
// Google MTV, +1 650-253-0000, (650) 253-0000
// country_code: 1
// national_number: 6502530000
//
// Google Paris, +33 (0)1 42 68 53 00, 01 42 68 53 00
// country_code: 33
// national_number: 142685300
//
// Google Beijing, +86-10-62503000, (010) 62503000
// country_code: 86
// national_number: 1062503000
//
// Google Italy, +39 02-36618 300, 02-36618 300
// country_code: 39
// national_number: 236618300
// italian_leading_zero: true

```

## 2.常用函数

### 2.1 parse：根据电话字符串和国家解析为PhoneNumber

### 1、使用示例

```
String swissNumberStr = "044 668 18 00";
PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance();
try {
  PhoneNumber swissNumberProto = phoneUtil.parse(swissNumberStr, "CH");
} catch (NumberParseException e) {
  System.err.println("NumberParseException was thrown: " + e.toString());
}

```

At this point, swissNumberProto contains:

```
{
  "country_code": 41,
  "national_number": 446681800
}

```

### 2、函数说明

parse函数非常宽松，在输入文本（原始输入）中查找数字，忽略标点符号、空白，以及数字之前的任何文本（例如，前导“Tel:”），并修剪非数字位。它将接受任何格式的数字（E164、国家、国际等）。不会对该数字是否实际上是特定区域的有效电话进行验证。

- 参数numberToParse：试图解析的数字。它可以包含+、（和-等格式，以及电话号码扩展名。
- 参数defaultRegion：数字不是国际格式时，才使用此选项。在这种情况下，数字的country_code将存储为所提供的默认地区的country-code。如果该号码保证以“+”开头，后跟国家/地区呼叫代码，则可以提供RegionCode.ZZ或null。

### 2.2 isValidNumber：判断电话是否为有效数字

### 1、使用示例

```
String swissNumberStr = "044 668 18 00";
PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance();
try {
  PhoneNumber swissNumberProto = phoneUtil.parse(swissNumberStr, "CH");
} catch (NumberParseException e) {
  System.err.println("NumberParseException was thrown: " + e.toString());
}
boolean isValid = phoneUtil.isValidNumber(swissNumberProto); // returns true

```

### 2、函数说明

该函数仅判断 电话号码是否符合号码规范，并不能保证该电话号码一定在使用。

### 2.3 format：电话格式化

### 1、使用示例

```
String swissNumberStr = "044 668 18 00";
PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance();
try {
  PhoneNumber swissNumberProto = phoneUtil.parse(swissNumberStr, "CH");
} catch (NumberParseException e) {
  System.err.println("NumberParseException was thrown: " + e.toString());
}

// Produces "+41 44 668 18 00"
System.out.println(phoneUtil.format(swissNumberProto, PhoneNumberFormat.INTERNATIONAL));
// Produces "044 668 18 00"
System.out.println(phoneUtil.format(swissNumberProto, PhoneNumberFormat.NATIONAL));
// Produces "+41446681800"
System.out.println(phoneUtil.format(swissNumberProto, PhoneNumberFormat.E164));

```

### 2、函数说明

```
String format(PhoneNumber number, PhoneNumberFormat numberFormat)

public enum PhoneNumberFormat {
    E164,
    INTERNATIONAL,
    NATIONAL,
    RFC3966
  }

```

### 2.4 formatNumberForMobileDialing 获取可拨打电话

### 1、使用示例

```
public void testFormatNumberForMobileDialing() {
    PhoneNumber CO_FIXED_LINE =
      new PhoneNumber().setCountryCode(57).setNationalNumber(6012345678L);
    PhoneNumber DE_NUMBER =
      new PhoneNumber().setCountryCode(49).setNationalNumber(30123456L);
    honeNumber US_TOLLFREE =
      new PhoneNumber().setCountryCode(1).setNationalNumber(8002530000L);

    // Numbers are normally dialed in national format in-country, and international format from
    // outside the country.
    assertEquals("6012345678",
        phoneUtil.formatNumberForMobileDialing(CO_FIXED_LINE, RegionCode.CO, false));
    assertEquals("+4930123456",
        phoneUtil.formatNumberForMobileDialing(DE_NUMBER, RegionCode.CH, false));
    assertEquals("800 253 0000",
        phoneUtil.formatNumberForMobileDialing(US_TOLLFREE, RegionCode.US,
                                               true /*  keep formatting */));
}

```

### 2、函数说明

```
//regionCallingFrom:呼叫人所在地的二字母地区码
//withFormatting:是否应使用格式符号（如空格和破折号）返回数字。
String formatNumberForMobileDialing(PhoneNumber number, String regionCallingFrom,
                                             boolean withFormatting)

```

返回一个格式化为可以从特定地区的移动电话拨打的号码。

**注意：**
如果无法从该地区拨打该号码（例如，一些国家/地区阻止在该国家/地区以外拨打免费电话），该方法将返回一个空字符串。

- 如果 呼叫人所在地区 和 电话所在地 是同一个地区，就返回 国内号码格式
- 如果 呼叫人所在地区 和 电话所在地 不是同一个地区，就返回 国际化号码格式
