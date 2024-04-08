# 单复数

## 简单定义

单复数（singular and plural）指的是名词或代词表示的数量。单数（singular）一般指一个，而复数（plural）一般表示多个。

- 比如
    - one order 和two orders
    - He is good 和 They are good
    

## 不同语言单复数的规则

不同**语言**单复数规则不一样。

- 有一些语言只有一种形式/类别，比如中文。
- 有一些语言有2种形式/类别，比如英文。
- 还有一些语音有多种形式/类别，比如阿拉伯语有6种。

unicode还针对不同**类型**有不同的规范。主要有

- 基数cardinal，比如1, 2, or 3
- 序数ordinal，比如1st, 2nd, or 3rd
- 范围range，比如1-2 meters

unicode一般最多有6种形式（类别）。

| 类别 | 含义 |
| --- | --- |
| zero |  |
| one | 1个或者单个 |
| two | 2个或者双的 |
| few |  |
| many |  |
| other | 一定有该类别，如果语言只有一种格式，就是other |

| 规范 | 说明链接 |
| --- | --- |
| unicode语言单复数规范 | https://www.unicode.org/cldr/cldr-aux/charts/29/supplemental/language_plural_rules.html |
| CLDR语言单复数规范 | https://cldr.unicode.org/index/cldr-spec/plural-rules |

## 单复数文案的存储格式

单复数文案通常采用 ICU Message Format（ICU消息格式）来表示和存储。
> **标准 ICU 语法书写格式为{variable, plural, one {} other {}}，具体文案需放入 {} 中。**

比如：

```
{count, plural,
    one{You have 1 photo}
    other{You have {count} photos}
}
```

其中：

- **`{count}`** 是一个变量，表示要考虑的数量。
- **`plural`** 表示这是一个复数形式的规则。
- **`one{...}`** 是一种形式，表示当数量为1时要显示的文本。
- **`other{...}`** 是另一种形式，表示当数量不为1时要显示的文本。


说明：
1. 语言为中文时，ICU 格式参考：
```
{num, plural, other {此处为源文案}}
```
2. 源语言为英文时，ICU 格式参考：
```
{num, plural, one {此处为单数形式源文案} other {此处为复数形式源文案}}
```

## 相关工具

### ICU message format在线示例工具

https://devpal.co/icu-message-editor/

### ICU4J MessageFormat处理单复数文案

参考文档：https://javadoc.io/static/com.ibm.icu/icu4j/74.1/com/ibm/icu/text/MessageFormat.html

代码示例：
```java

import com.ibm.icu.text.MessageFormat;
import com.ibm.icu.util.ULocale;

import java.util.HashMap;
import java.util.Map;

public class PluralTextDemo {
    public static void main(String[] args) {
        // 单复数文案
        String pluralText = "{count, plural, one{You have 1 photo} other{You have {count} photos}}";
        MessageFormat messageFormat = new MessageFormat(pluralText, ULocale.US);
        Map<String, Object> paramMap1 = new HashMap<>();
        paramMap1.put("count", 1);
        String result1 = messageFormat.format(paramMap1);
        System.out.println(result1); //You have 1 photo
        Map<String, Object> paramMap2 = new HashMap<>();
        paramMap2.put("count", 3);
        String result2 = messageFormat.format(paramMap2);
        System.out.println(result2); //You have 3 photos

        // 单复数文案，且包含占位符变量
        pluralText = "{count, plural, one{{name}, You have 1 photo} other{{name}, You have {count} photos}}";
        messageFormat = new MessageFormat(pluralText, ULocale.US);
        paramMap1 = new HashMap<>();
        paramMap1.put("count", 1);
        paramMap1.put("name", "Bob");
        result1 = messageFormat.format(paramMap1);
        System.out.println(result1); //Bob, You have 1 photo
        paramMap2 = new HashMap<>();
        paramMap2.put("count", 3);
        paramMap2.put("name", "Bob");
        result2 = messageFormat.format(paramMap2);
        System.out.println(result2); //Bob, You have 3 photos
    }
}

```