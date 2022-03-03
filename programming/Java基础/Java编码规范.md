---
sidebar_position: 3
---

# Java 编码规范

## 命名规范

Java 中比较有名且被广泛接受的命名方法是驼峰命名法（Camel-Case）。

驼峰命名法是指混合使用大小写字母来命名。驼峰命名又分为小驼峰命名法和大驼峰命名法。小驼峰命名法就是第一个单词是全部小写，后面的单词全部大写，如 myRoomCount；大驼峰命名法是第一个单词首字母也大写，如 ClassRoom。

除了包和常量外，Java 编码规范命名方法采用驼峰法，分类说明如下：

- 包名：包名是全小写字母，中间可以由点分隔开。作为命名空间，包名应该具有**唯一性**，推荐采用组织域名的倒置，如 com.irikka。但 Java 核心库包名不采用域名的倒置命名，如 Java.awt.event。
- 类和接口名：采用大驼峰法，如 SpiltViewController。
- 文件名：采用大驼峰法，如 BlockOperation.java。
- 变量：采用小驼峰法，如 studentNumber。
- 常量名：全大写，如果是由多个单词构成，可以用下划线隔开，如 YEAR 和 WEEK_OF_MONTH。
- 方法名：采用小驼峰法，如 balanceAccount、isButtonPressed 等。

命名规范示例代码如下：

```java title="《Java 从小白到大牛（第二版）》示例代码5.1"
package com.zhijieketang;

public class Date extends java.util.Date {

    private static final int DEFAULT_CAPACITY = 10;

    private int size;

    public static Date valueOf(String s) {

        final int YEAR_LENGTH = 4;
        final int MONTH_LENGTH = 2;

        int firstDash;
        int secondDash;

		...
    }

    public String toString () {
        int year = super.getYear() + 1900;
        int month = super.getMonth() + 1;
        int day = super.getDate();
		...
    }
}
```

## 注释规范

### 文件注释

文件注释是在每个文件开头添加的注释，文件注释通常包括：版权信息、文件名、所在模块、作者信息、历史版本信息、文件内容和作用等。

示例代码如下

```java
/*
* 版权所有XXXX
* 许可信息查看 LICENSE.txt 文件
* 描述：
* 	实现XX功能
* 历史版本：
* 	2022.3.2：创建 Akkiri
* 	2022.3.4：添加 math 库
*/
```

### 文档注释

文档注释指可以通过注释内容生成 API 帮助文档，JDK 中 javadoc 命令能够提取这些注释信息并生成 HTML 文件。文档注释主要对类（或接口）、实例变量、静态变量、实例方法和静态方法等进行注释。

:::tip

文档一般是给别人看的帮助文档，一般注释的实例变量、静态变量、实例方法和静态方法都应该是非私有的，那些只给自己看的内容可以不用文档注释

:::

示例代码如下：

```java title="《Java 从小白到大牛（第二版）》5.2.2"
package com.zhijieketang;

/**
 * 自定义的日期类，具有日期基本功能，继承java.util.Date
 * <p>实现日期对象和字符串之间的转换</p>
 * @author 关东升
 */
public class Date extends java.util.Date {

    private static final int DEFAULT_CAPACITY = 10;

    /**
     * 容量
     */
    public int size;

    /**
     * 将字符串转换为Date日期对象
     * @param s 要转换的字符串
     * @return Date日期对象
     */
    public static Date valueOf(String s) {

        final int YEAR_LENGTH = 4;
        final int MONTH_LENGTH = 2;
		
        int firstDash;
        int secondDash;

        ...
    }

    /**
     * 将日期转换为yyyy-mm-dd格式的字符串
     * @return yyyy-mm-dd格式的字符串
     */
    public String toString () {
        int year = super.getYear() + 1900;
        int month = super.getMonth() + 1;
        int day = super.getDate();
		//...
    }
}
```

由于注释最终生成的是 HTML 文档，所以可以在文档注释中使用 HTML 标签，上述注释中的 `<p></p>` 是 HTML 段落标签。

另外，上述文档注释中还用到了 @author、@return 和 @param 等文档注释标签，这些标签能够方便生成 API 帮助文档。

下表是常用的文档注释标签

| 标签        | 描述                       |      | 标签       | 描述                   |
| ----------- | -------------------------- | ---- | ---------- | ---------------------- |
| @author     | 说明类或接口的作者         |      | @see       | 参考另一个主题的链接   |
| @deprecated | 说明类、接口或成员已被废弃 |      | @exception | 说明方法所抛出的异常类 |
| @param      | 说明方法参数               |      | @throws    | 同 @exception 标签     |
| @return     | 说明返回值                 |      | @version   | 类或接口的版本         |

如果想生成 API 帮助文档，可以使用 javadoc 命令，在 Java 源代码根目录打开命令行，在命令行中输入 `javadoc -encoding UTF-8 -d apidoc 文件名.java`，其中参数 `-encoding UTF-8` 指定文件的编码为 UTF-8；参数 `-d` 指明要生成的文档的存放目录，例中为目录 apidoc；`文件名.java` 是当前目录下的 Java 源文件。

### 代码注释

代码注释一般采用单行注释（`//`）和多行注释（`/*···*/`）。

示例代码如下

```java
public class Date extends java.util.Date {

	// 默认的容量，是一个常量
    private static final int DEFAULT_CAPACITY = 10;

    /**
     * 容量
     */
    public int size;

    /**
     * 将字符串转换为Date日期对象
     * @param s 要转换的字符串
     * @return Date日期对象
     */
    public static Date valueOf(String s) {

        final int YEAR_LENGTH = 4;
        final int MONTH_LENGTH = 2;
		
        int firstDash;
        int secondDash;

		Date d = null;
		//...
		
		/*
		* 判断d是否为空，
		* 如果为空抛出异常IllegalArgumentException，否则返回d。
		*/
		if (d == null) {
            throw new java.lang.IllegalArgumentException();
        }

        return d;
    }

    /**
     * 将日期转换为yyyy-mm-dd格式的字符串
     * @return yyyy-mm-dd格式的字符串
     */
    public String toString () {
        int year = super.getYear() + 1900; //计算年份
        int month = super.getMonth() + 1; /*计算月份*/
        int day = super.getDate();
		//...
    }
}
```

## 代码排版

### 空行

空行用以将逻辑相关的代码段分隔开，以提高可读性。

空行的使用规范如下:

（1）类声明和接口声明之间保留两个空行。

（2）两个方法之间保留两个空行。

（3）方法的第一条语句之前保留一个空行。

（4）代码注释（除尾端注释外）之前保留一个空行。

（5）一个方法内的两个逻辑段之间保留一个空行。

### 空格

下面是空格的使用规范

（1）赋值符号 "=" 前后各有一个空格。

```java
int YEAR_LENGTH = 4;
int day = super.getDate();
```

（2）所有的二元运算符都应该使用空格与操作数分开。

```java
a += c + d;
prints("size is" + foo + "\n");
```

（3）一元操作符，即负号 "-"、自增 "++" 和自减 "--" 等，它们与操作数之间没有空格。

```java
int a = -b;
a++;
--b;
```

（4）小括号 "(" 之后，")" 之前不应该有空格

```java
a = (a + b)/(c * d);
```

（5）大左括号 "{" 之前有一个空格。

```java
while (a == b) {
    n += 1;
}
```

（6）方法参数列表小括号 "(" 之前没有空格，")" 之后有一个空格，参数列表中参数逗号 "," 之后也有一个空格。

```java'
String format(Object obj, StringBuffer toAppendTo, FieldPosition fieldPosition) {
	...
}
```

（7）关键字之后紧跟着小左括号 "("，关键字之后应该有一个空格。如下实例中 while 之后有一个空格。

```java
while (a == b){
    ...
}
```

### 缩进

4个空格常被作为缩进排版的一个单位。

缩进可以遵循以下规范：

（1）在方法、Lambda、控制语句等包含大括号 "{}" 的代码块中，代码块的内容相对于首行缩进一个单位（4个空格）。

（2）如果是if 语句中条件表达式的断行，那么新的一行应该相对于上一行缩进两个单位（8个空格），再往后的断行要与第一次的对齐。

实例代码如下：

```java title="《Java 从小白到大牛（第二版）》示例代码5.3.3"
public class Date extends java.util.Date {

    // 默认的容量，是一个常量
    private static final int DEFAULT_CAPACITY = 10;

    /**
     * 容量
     */
    public int size;
    
    int longName1 = 0, longName2 = 0, longName3 = 0, longName4 = 0, longName5 = 0;
    
    boolean boolName1 = true;

    public String getString() {

        int year = super.getYear() + 1900; // 计算年份
        int month = super.getMonth() + 1; /* 计算月份 */
        int day = super.getDate();
        // ...

        if ((longName1 == longName2)
                || (longName3 == longName4) && (longName3 > longName4) 
                && (longName2 > longName5)) {

        }
                 
        return null;
    }
}
```

### 断行

一行代码的长度尽量不要超过80个字符，如果超过则需断行，可以依据下面的一般规范断开。

（1）在一个逗号后面断开。

（2）在一个操作符前面断开，要选择较高级别的运算符（而非较低级别的运算符）断开。

（3）新的一行应该相当于上一行缩进两个单位（8个空格）。

示例如下：

```java
longName1 = longName2 * (longName3 + longName4 - longName5)
    + 4 * longName6;

private static DateFormat get(int timeStyle, int dateStyle,
                             int flags, Locale loc) {
    ...
}

if ((longName1 == longName2)
    || (longName3 == longName4) && (longName3 > longName4) 
    && (longName2 > longName5)) {
    
}

boolName1 = (longName3 == longName4)
    ? (longName3 > longName4)
    : (longName2 > longName5);
```

### 其他规范

除上述规范外，下面补充一些重要的规范。

（1）在声明变量或常量时推荐一行一个地声明。

```java\
// 推荐使用
int longName1 = 0;
int longName2 = 0;
// 不推荐
int longName1 = 0, longName2 = 0;
```

（2）左大括号 "{" 位于声明语句同行的末尾。右大括号 "}" 另起一行，与相应的声明语句对齐，除非是一个空语句，右大括号 "}" 应紧跟在左大括号 "{" 之后。

```java title="《Java 从小白到大牛（第二版）》示例代码5.4"
public class Date extends java.util.Date {

    int longName1 = 0;
    int longName2 = 0;

    boolean boolName1 = true;

    public String getString() {

        int year = super.getYear() + 1900; // 计算年份
        int month = super.getMonth() + 1; /* 计算月份 */
        int day = super.getDate();
        
        return null;
    }

    public void setString() {}

}
```

（3）每行至多包含一条语句。
