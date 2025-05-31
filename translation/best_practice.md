### 源文案录入

| 字段 | key | 源文案 | 文案解释 | 截图 | 英文字符限制 |
| --- | --- | --- | --- | --- | --- |
| 说明 | 文案的标识符，全局唯一 | 中文文案 | 文案出现的场景/时机、希望达成的目的/效果、潜在的歧义点；若有希望使用的多语言文案，可将文案+提供人备注在此 | 原型图/设计图均可，可使用英文出图，红框圈出文案所在位置 | 最长英文字符数，若字符限制填得比实际小，在多语言中信息可能被删减，无法传达真实意图；若字符限制填得比实际大，在App/Web中可能会出现文案爆框/截断，无法正常展示 |
|  |  |  |  |  |  |

### 最佳实践

1、境外业务，接口遇到不支持的语言，不能阻断业务核心主流程，**要能够兜底语言**，保证业务核心流程主可用。

> 业务可能随时新增语种，如2024年D端在沙特新增乌尔都语，2025年C端新增简体中文。
> 
> 
> 文案只影响展示，不应该影响功能，如果接口直接报错，会导致阻断业务流程，影响功能可用性。
> 

2、境外业务，**兜底语言使用英语en**，不能用中文繁体zh-HK。

> 原因2点：
> 
> - 英语是世界上最广泛使用的通用语言，兜底到英语，用户基本能看懂。
> - 翻译平台会优先翻译英语文案，保证存在英语文案。
> 
> 例外情况：
> 
> - 公司内员工使用的内部系统，国内员工最多，可使用中文作为兜底语言。

3、境外系统**支持的语言列表，不写死在代码中**。如果后台系统需要选择语言列表，可以从i18n接口获取，或者维护在配置中心。

> 业务可能随时新增语种，如2024年D端在沙特新增乌尔都语，2025年C端新增简体中文。
> 
> 
> 写死在代码中，新增语言需要开发上线，改造成本较高。
>

4、占位符变量和高亮书写规则
```
- 占位符：会动态变化的内容，需要使用占位符变量。用{{}}包裹占位符变量，比如：你好，{{user_name}}，欢迎来到{{brand_name}}。
- 高亮：需要特殊样式展示（高亮、改变字体、改变颜色等）的部分使用{}包裹，比如“节省了{15}元”，15这个数字需要高亮展示。
- 既是高亮也是占位符的，使用三个大括号表示{{{}}}。

```

货币场景举个例子：”Save {{price}} on this order”最后在app中展示为”Save $**10** on this order”。其中$10是货币金额的占位符变量，10需要高亮展示的部分。

```java
// 1、后端获取金额，并用i18n-sdk进行格式化
long price = 1000; //单位是最小辅币分
boolean highlight = true;
String dispalyPrice = I18n.formatByCurrency(price, "USD", highlight); // ${10}

// 2、前端从后端获取“货币文案”，从翻译平台获取整段文案"Save {{price}} on this order"，并进行替换
String text = TranslateUtil.getText("key", "en")
								.withParam("price", "dispalyPrice"); //Save ${**10}** on this order
								
// 3、前端基于{}做特殊样式展示

```

5、单复数文案书写规则。

6、前后端都需要具备多语言的能力。前端维护前端代码中的UI类文案，比如按钮文案、表单名称等。后端维护后端负责的功能类文案，比如状态枚举、报错提示。

7、后端枚举实现多语言的方式示例

```java

/**
 * 翻译订单状态枚举
 * 枚举类里面有个字段是i18n key，然后在展示层使用sdk根据key转化成对应语种
 */
public enum TransOrderStatusEnum {
    WAITING_REVIEW("waiting_review", "i18n_trans_order_status_waiting_review"),
    REJECTED("rejected", "i18n_trans_order_status_rejected"),
    WAITING_START("waiting_start", "i18n_trans_order_status_waiting_start"),
    WAITING_TRANSLATION("waiting_translation", "i18n_trans_order_status_waiting_translation"),
    IN_TRANSLATION("in_translation", "i18n_trans_order_status_in_translation"),
    WAITING_APPROVE("waiting_approve", "i18n_trans_order_status_waiting_approve"),
    WAITING_FINAL_CHECK("waiting_final_check", "i18n_trans_order_status_waiting_final_check"),
    COMPLETED("completed", "i18n_trans_order_status_completed"),
    CANCELLED("cancelled", "i18n_trans_order_status_cancelled"),
    ;

    private String value;
    private String i18nKey;

    TransOrderStatusEnum(String value, String i18nKey) {
        this.value = value;
        this.i18nKey = i18nKey;
    }
    
}

List<TransOrderStatusVO> statuses = Arrays.stream(values())
                .map(v -> TransOrderStatusVO.builder()
                        .status(v.getValue())
                        .display(I18nClientUtil.getText(v.getI18nKey()))
                        .build())
                .collect(toList());
```

8、使用阿拉伯语的国家，APP中都使用现代标准阿拉伯语ar即可，无需使用方言。

> 现代标准阿拉伯语是一种书面语言形式，广泛用于多个国家正式的书面文档、教育、新闻传媒和其他正式场合。在APP中使用标准阿拉伯语是切合实际的。
> 
> 
> 阿拉伯语方言是指在日常**口语交流**中使用的各种**地区性语言**形式，在一些地区性的营销场景使用是合理的。
> 
> 举个例子：在APP中，使用“玉米”；在东北地区做营销活动，写“苞米降价啦，大家快来买”，是合理的。
> 

### 文案存储

源文案表

| 字段 | 数据类型 | 注释 |
| --- | --- | --- |
| id | bigint(20) | 主键id |
| i18n_key | varchar(128) | 文案key |
| locale | varchar(16) | 语言 |
| content | varchar(2048) | 源文案内容 |
| project_id | bigint(20) | 项目id |
| task_id | bigint(20) | 任务id |
| valid | tinyint(4) | 是否有效 |

目标文案表

| 字段 | 数据类型 | 注释 |
| --- | --- | --- |
| id | bigint(20) | 主键id |
| i18n_key | varchar(128) | 文案key |
| locale | varchar(16) | 语言 |
| content | varchar(2048) | 源文案内容 |
| project_id | bigint(20) | 项目id |
| task_id | bigint(20) | 任务id |
| valid | tinyint(4) | 是否有效 |

文案元信息表

| 字段 | 数据类型 | 注释 |
| --- | --- | --- |
| id | bigint(20) | 主键id |
| i18n_key | varchar(128) | 文案key |
| context | varchar(512) | 文案解释 |
| image | varchar(256) | 截图链接 |
| length_limit | int(11) | 英文字符限制 |
| project_id | bigint(20) | 项目id |
| task_id | bigint(20) | 任务id |
| valid | tinyint(4) | 是否有效 |

### 文案获取
1、用户首次下载APP后，默认使用手机系统语言作为APP的语言，并有兜底逻辑。

2、用户在APP中设置语言后，可记录用户选择的语言到用户账号服务的数据库，方便后续分析和使用。

3、离线场景，如给用户发短信，可从用户账号服务获取用户选择的语言，选择对应的文案进行发短信。


### 文案传递

1、语言locale放在通参（前端放到http的header、后端放在trace）中进行传递。链路上的服务可以直接使用。