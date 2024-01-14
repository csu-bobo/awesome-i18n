# libphonenumber库电话规则解读

# 1. 表格形式的元数据

https://github.com/google/libphonenumber/tree/master/resources/metadata

```java
├─ 86    区号86对应中国
│  └─ examples.csv         电话示例
│  └─ formats.csv          电话格式
│  └─ operators.csv        电话运营商
│  └─ ranges.csv           电话具体规则
│  └─ shortcodes.csv       短号码
├─ 852   区号852对应中国香港
├─ 853   区号853对应中国澳门
...
```

# 2. xml格式的元数据

https://github.com/google/libphonenumber/blob/master/resources/PhoneNumberMetadata.xml

以中国澳门的数据举例说明

```xml
<territory id="MO" countryCode="853" internationalPrefix="00">
      <availableFormats>
        <numberFormat pattern="(\d{4})(\d{3})">
          <leadingDigits>0</leadingDigits>
          <format>$1 $2</format>
        </numberFormat>
        <numberFormat pattern="(\d{4})(\d{4})">
          <leadingDigits>[268]</leadingDigits>
          <format>$1 $2</format>
        </numberFormat>
      </availableFormats>
      <generalDesc>
        <nationalNumberPattern>
          0800\d{3}|
          (?:
            28|
            [68]\d
          )\d{6}
        </nationalNumberPattern>
      </generalDesc>
      <!-- Added support to specific 811 sub range(3 digit granularity) based on info in
           telecommunications.ctt.gov.mo. Other ranges are from ITU doc. -->
      <fixedLine>
        <possibleLengths national="8"/>
        <exampleNumber>28212345</exampleNumber>
        <nationalNumberPattern>
          (?:
            28[2-9]|
            8(?:
              11|
              [2-57-9]\d
            )
          )\d{5}
        </nationalNumberPattern>
      </fixedLine>
      <mobile>
        <possibleLengths national="8"/>
        <exampleNumber>66123456</exampleNumber>
        <nationalNumberPattern>
          6800[0-79]\d{3}|
          6(?:
            [235]\d\d|
            6(?:
              0[0-5]|
              [1-9]\d
            )|
            8(?:
              0[1-9]|
              [14-8]\d|
              2[5-9]|
              [39][0-4]
            )
          )\d{4}
        </nationalNumberPattern>
      </mobile>
      <tollFree>
        <possibleLengths national="7"/>
        <exampleNumber>0800501</exampleNumber>
        <nationalNumberPattern>0800\d{3}</nationalNumberPattern>
      </tollFree>
</territory>
```

## 2.1 各种电话号码类型的规则

### 2.1.1 电话号码整体规则

```xml
     <generalDesc>
        <nationalNumberPattern>
          0800\d{3}|
          (?:
            28|
            [68]\d
          )\d{6}
        </nationalNumberPattern>
      </generalDesc>
```

澳门的国家电话号码模式包含以下规则：

1. **免费电话号码**：以0800开头，后跟3位数字，总共7位数字（例如：`0800xxx`）。
2. **固定线路和移动电话号码**：模式为`(?:28|[68]\d)\d{6}`，具体规则如下：
    - 可以以28开头，后跟6位任意数字，总共8位数字（例如：`28xxxxxx`）。
    - 可以以6或8开头，第二位是任意数字，后跟6位任意数字，总共8位数字（例如：`6xxxxxxx` 或 `8xxxxxxx`）。

### 2.1.2 固定电话

```xml
     <fixedLine>
        <possibleLengths national="8"/>
        <exampleNumber>28212345</exampleNumber>
        <nationalNumberPattern>
          (?:
            28[2-9]|
            8(?:
              11|
              [2-57-9]\d
            )
          )\d{5}
        </nationalNumberPattern>
      </fixedLine>
```

1. **号码长度**：澳门的固定线路电话号码长度为8位数字。
2. **示例号码**：一个固定线路电话号码的例子是`28212345`。
3. **号码规则**：固定线路电话号码的模式为：
    - `(?: 28[2-9]| 8(?: 11| [2-57-9]\d ) )\d{5}`：这部分表示固定电话号码可以以28开头（但第三位数字不为0或1），或者以8开头（第二位数字可以是1或2到5以及7到9之间的任何数字）。后面跟随5位任意数字。
    

### 2.1.3 移动电话

```xml
      <mobile>
        <possibleLengths national="8"/>
        <exampleNumber>66123456</exampleNumber>
        <nationalNumberPattern>
          6800[0-79]\d{3}|
          6(?:
            [235]\d\d|
            6(?:
              0[0-5]|
              [1-9]\d
            )|
            8(?:
              0[1-9]|
              [14-8]\d|
              2[5-9]|
              [39][0-4]
            )
          )\d{4}
        </nationalNumberPattern>
      </mobile>
```

1. **号码长度**：澳门的移动电话号码长度也是8位数字。
2. **示例号码**：一个移动电话号码的例子是`66123456`。
3. **号码规则**：移动电话号码的模式为：
    - `6800[0-79]\d{3}`：这部分表示手机号码可以以6800开头，其后跟随0至7或9的一个数字，再加上任意3个数字。
    - `6(?: [235]\d\d| 6(?: 0[0-5]| [1-9]\d )| 8(?: 0[1-9]| [14-8]\d| 2[5-9]| [39][0-4] ) )\d{4}`：这部分表示手机号码以6开头，第二位数字根据不同的模式有不同的规定，整个号码长度为8位数字。
    

### 2.1.4 免费电话

```xml
      <tollFree>
        <possibleLengths national="7"/>
        <exampleNumber>0800501</exampleNumber>
        <nationalNumberPattern>0800\d{3}</nationalNumberPattern>
      </tollFree>
```

1. **号码长度**：澳门的免费电话号码长度为7位数字。
2. **示例号码**：一个免费电话号码的例子是`0800501`。
3. **号码规则**：免费电话号码的模式为`0800\d{3}`，表示号码以0800开头，后面跟随3位任意数字。

## 2.2 电话号码格式化

```xml
      <availableFormats>
        <numberFormat pattern="(\d{4})(\d{3})">
          <leadingDigits>0</leadingDigits>
          <format>$1 $2</format>
        </numberFormat>
        <numberFormat pattern="(\d{4})(\d{4})">
          <leadingDigits>[268]</leadingDigits>
          <format>$1 $2</format>
        </numberFormat>
      </availableFormats>
```

澳门电话号码的格式化规则包括：

1. **固定线路电话号码格式**：当电话号码以0开头时，号码格式化为四位数字、三位数字的形式（例如：`xxxx xxx`）。
2. **移动和其他固定线路电话号码格式**：当电话号码以2、6或8开头时，号码格式化为四位数字、四位数字的形式（例如：`xxxx xxxx`）。