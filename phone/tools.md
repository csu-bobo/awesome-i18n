# 相关工具

## 开源项目

- Java/C++/JavaScript: https://github.com/google/libphonenumber
- C#: https://github.com/twcclegg/libphonenumber-csharp
- Go: https://github.com/nyaruka/phonenumbers
- Objective-c: https://github.com/iziz/libPhoneNumber-iOS
- PHP: https://github.com/giggsey/libphonenumber-for-php
- PostgreSQL in-database types: https://github.com/blm768/pg-libphonenumber
- Python: https://github.com/daviddrysdale/python-phonenumbers
- Ruby: https://github.com/mobi/telephone_number
- Rust: https://github.com/1aim/rust-phonenumber
- Erlang: https://github.com/marinakr/libphonenumber_erlang
- Clojure: https://github.com/randomseed-io/phone-number

## 电话meta数据

https://github.com/google/libphonenumber/tree/master/resources/metadata

以CO为例，先找到CO对应的区号57，然后可以去[ranges.csv](https://github.com/google/libphonenumber/blob/master/resources/metadata/57/ranges.csv)查看规则，可以在[examples.csv](https://github.com/google/libphonenumber/blob/master/resources/metadata/57/examples.csv)查看示例

## 电话号码的一些工具网站

https://giggsey.com/libphonenumber/
输入电话，获取各种电话格式和信息

http://libphonenumber.appspot.com/
输入电话，获取各种电话格式和信息

https://phonenumbers.temba.io/
go版本的电话解析

https://rawgit.com/googlei18n/libphonenumber/master/javascript/i18n/phonenumbers/demo-compiled.html
也是个简单的电话解析