
## 一、节假日接口

1. 根据country获取周末是周几？
2. 根据国家、日期范围，列出全国放假的法定节假日列表
3. 计算某天前/后第N个工作日

## 二、库表设计

国家日期信息表country_calendar

| 字段 | 数据类型 | 注释 | 备注 |
| --- | --- | --- | --- |
| id | bigint | 主键id |  |
| country | varchar(5) | 国家二字母码，如CN、US |  |
| date | date | 日期 | country+date是唯一键 |
| is_workday | tinyint | 是否是工作日，1表示为工作日，0表示为休息日 |  |
| day_type | varchar(16) | 日期类型，'workday', 'weekend', 'holiday', 'makeup_work’，‘half_day’ |  |
| holiday_name_zh | varchar(64) | 节假日中文名称 |  |
| holiday_name_en | varchar(64) | 节假日英文名称 |  |
| holiday_name_locale | varchar(64) | 节假日当地名称 |  |
| holiday_name_other | JSON | 节假日名称，json格式，k是locale，v是名称 |  |
| ctime | datetime | 创建时间 |  |
| utime | datetime | 更新时间 |  |
| operator | varchar(64) | 操作人 |  |

day_type详细定义

```java
/**
 * 日期类型枚举
 * 用于标识不同类型的工作日和休息日
 */
public enum DayType {
    
    /**
     * 正常工作日
     */
    WORKDAY("workday", "正常工作日"),
    
    /**
     * 周末休息日
     */
    WEEKEND("weekend", "周末休息日"),
    
    /**
     * 法定节假日
     */
    HOLIDAY("holiday", "法定节假日"),
    
    /**
     * 调休工作日（周末上班）
     */
    MAKEUP_WORK("makeup_work", "调休工作日"),
    
    /**
     * 半天工作日（如阿联酋的4.5天工作制）
     */
    HALF_DAY("half_day", "半天工作日");

    private final String code;
    private final String description;

    DayType(String code, String description) {
        this.code = code;
        this.description = description;
    }

    /**
     * 获取枚举代码（通常用于数据库存储或API传输）
     */
    public String getCode() {
        return code;
    }

    /**
     * 获取枚举描述（中文说明）
     */
    public String getDescription() {
        return description;
    }

    /**
     * 根据代码查找对应的枚举值
     */
    public static DayType fromCode(String code) {
        for (DayType type : values()) {
            if (type.code.equals(code)) {
                return type;
            }
        }
        throw new IllegalArgumentException("未知的日期类型代码: " + code);
    }

    /**
     * 判断是否为需要工作的日期类型
     */
    public boolean isWorkingDay() {
        return this == WORKDAY || this == MAKEUP_WORK || this == HALF_DAY;
    }

    /**
     * 判断是否为完整休息的日期类型
     */
    public boolean isFullRestDay() {
        return this == WEEKEND || this == HOLIDAY;
    }

    /**
     * 获取工作时长比例（0-1之间）
     */
    public double getWorkRatio() {
        switch (this) {
            case WORKDAY:
            case MAKEUP_WORK:
                return 1.0;
            case HALF_DAY:
                return 0.5;
            case WEEKEND:
            case HOLIDAY:
            default:
                return 0.0;
        }
    }
}
```

## 三、数据生成策略

### 1、维护每个国家的周末

有些国家周末是周六周日，有些是周五周六。需要一个配置维护每个国家的周末数据。

按照cldr的配置https://github.com/unicode-org/cldr-json/blob/main/cldr-json/cldr-core/supplemental/weekData.json

```json
{
    "weekendStart": {
        "001": "sat",
        "AF": "thu",
        "BH": "fri",
        "DZ": "fri",
        "EG": "fri",
        "IL": "fri",
        "IN": "sun",
        "IQ": "fri",
        "IR": "fri",
        "JO": "fri",
        "KW": "fri",
        "LY": "fri",
        "OM": "fri",
        "QA": "fri",
        "SA": "fri",
        "SD": "fri",
        "SY": "fri",
        "UG": "sun",
        "YE": "fri"
    },
    "weekendEnd": {
        "001": "sun",
        "AF": "fri",
        "BH": "sat",
        "DZ": "sat",
        "EG": "sat",
        "IL": "sat",
        "IQ": "sat",
        "IR": "fri",
        "JO": "sat",
        "KW": "sat",
        "LY": "sat",
        "OM": "sat",
        "QA": "sat",
        "SA": "sat",
        "SD": "sat",
        "SY": "sat",
        "YE": "sat"
    }
}
```

| 周末类型 | 周末范围 | 适用国家/地区 (括号内为代码) |
| --- | --- | --- |
| **周六-周日 (全球主流)** | 周六开始，周日结束 | **全球默认 (001)**、以及所有未在列表中特别指定的国家 |
| **周五-周六 (伊斯兰传统)** | 周五开始，周六结束 | **多数中东伊斯兰国家**：巴林 (BH)、阿尔及利亚 (DZ)、埃及 (EG)、伊拉克 (IQ)、约旦 (JO)、科威特 (KW)、利比亚 (LY)、阿曼 (OM)、卡塔尔 (QA)、沙特阿拉伯 (SA)、苏丹 (SD)、叙利亚 (SY)、也门 (YE) |
| **周四-周五** | 周四开始，周五结束 | **阿富汗 (AF)** |
| **周五-周五** | 仅周五休息 | **伊朗 (IR)** |
| **周五-周六** (特殊情况) | 从周五日落到周六 | **以色列 (IL)** |
| **周日-周日** | 仅周日休息 | **印度 (IN)**、**乌干达 (UG)** |

这样先初始化工作日和周末

### 2、获取每个国家的节假日数据

然后获取每个国家的法定节假日数据

外部接口 → 人工确认 → 数据导入