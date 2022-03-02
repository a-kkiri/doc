---
sidebar_label: 'Java基础'
sidebar_position: 2
---

# Java 语法基础



## Java 标识符



### 命名规则

（1）区分大小写

（2）首字符，可以是下划线(_)、美元符或字母，但不能是数字。

（3）除首字符外其他字符，可以是下画线(_)、美元符、字母和数字。

（4）关键字不能作为标识符。

### 命名规范



## 变量



### 变量声明

在 Java 10 之前变量的声明语法格式为：

```java
数据类型 变量名 [ = 初始值];
```

:::tip

在 Java 10 之前声明变量必须要明确知道变量的数据类型，但 Java 10 之后声明局部变量时可以使用 var 声明，不用明确指定数据类型。

:::

另外，根据变量声明的位置的不同，变量可分为成员变量和局部变量。成员变量是类中声明的变量；局部变量是在一个代码块中声明的变量。成员变量和局部变量也标识变量作用域，变量作用域就是变量的使用范围，变量只能在该变量所属的变量作用域内使用，超过作用域，变量内容则会被释放。

示例代码如下：

```java
public class HelloWorld {

    //声明int型成员变量
    int y;

    public static void main(String[] args){
        // 声明int型局部变量x，但没有初始化
        int x;
        //声明float型局部变量f，并且初始化
        float f = 5f;

        if (f < 10){
            int m = 10;
        }
        //初始化局部变量x
        x = 10;

        System.out.println("x = " + x);
        System.out.println("f = " + f);
        //System.out.print(m);  //编译错误，局部变量m超出其变量作用域。

    }
}
```

### Java 10 之后使用 var 声明局部变量

Java 10 之后可以使用 var 关键字声明局部变量，var 只表示要声明一个变量，它不能指定变量的数据类型，变量的数据类型是通过被赋值推断出来的。

在 Java 10 以后使用 var 关键字声明变量的语法格式为：

```java
var 变量名 = 初始值;
```

:::caution

（1）使用 var 声明变量必须要赋予初始值

（2）使用 var 声明的变量只能是局部变量，不能是成员变量

:::

示例代码如下：

```java
public class HelloWorld{
    
    var y = 20; //编译错误，声明的是成员变量
    
    public static void main(String[] args){
        
        var z; //编译错误，没有赋予初始值
        
        var f = 5f; //声明 float 型局部变量并初始化
        
        System.out.println("f = " + f);
        
    }
}
```

## 常量

常量事实上是内容不可修改的变量，常量与变量类似，也需要初始化，即在声明常量的同时需要赋予一个初始值。常量一旦初始化便不可再修改。

常量的声明格式为：

```java
final 数据类型 常量名 = 初始值;
```

final 关键字可以修饰很多元素，修饰变量就成了常量。

示例代码如下

```java
public class HelloWorld{
    
    public static final double PI = 3.14; //声明静态常量
    
    final int x = 10; //声明成员常量
    
    public static void main(String[] args){
        //声明局部常量
        final double y = 3.2;
    }
    
}
```

:::tip

常量有三种类型：静态常量、成员常量、局部常量。

代码一开始声明静态常量，在 final 关键字前用 public static 修饰。public static 修饰的常量作用域是全局的，不需要创建对象就可以访问它，在 class 外的访问形式：HelloWorld.PI，这种常量在编程中使用广泛。

:::

## Java 源代码文件

Java源代码文件中可以定义一个或者多个 Java 类型，类型包括类（Class）、接口（Interface）、枚举（Enum）和注释（Annotation），它们是 Java 源代码的最小组织单位。

如下代码定义了三个类 HelloWorld、A和B。

```java title="HelloWorld.java"
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("Hello,world!");
    }
}

class A{
    
}

class B{
    
}
```

:::tip 一个源文件包含多个类时，需注意如下问题：

（1）只能由一个类声明为公有（public）的。上述示例中类 HelloWorld 是公有的。

（2）文件命名必须与公有类名完全一致，包括字母大小写。上述示例中公有类 HelloWorld 与源代码文件名 HelloWorld.java 一致。 

（3）`public static void main(String[] args)`方法只能定义在公有类中。上述示例只能在类 HelloWorld 中定义main方法。

:::

## 包

Java 类型（类、接口、枚举、和注解）命名时，有时会出现名字发生冲突，例如，项目中自定义了一个日期类，为它取名为 Date，但是会发现 Java SE 核心库中还有两个 Date 类，它们分别位于 java.util 包和 java.sql 包中。

在 Java 中为了防止 Java 类型命名冲突而引用了包（package）的概念，包本质上是命名空间（namespace）。在包中可以定义一组相关的类型，并为它们提供访问保护和命名空间管理。

通过包，前面提到的 Date 类名称冲突问题很好解决，将不同的 Date 类放到不同的包中，自定义的 Date 可以放入自定义的包 com.irikka 中，这样就不会与 java.util 包和 java.sql 包中的 Date 发生冲突问题。

### 定义包

在 Java 中使用 package 语句定义包，package 语句应该放在文件的第一行，在每个源文件中只能有一个包定义语句，并且 package 语句适用于所有 Java 类型的文件。

定义包的语法格式如下：

```java
package pkg1[.pkg2[.pkg3]];
```

pkg1~pkg3 都是组成包名的一部分，它们之间用（.）连接。它们的命名应该是合法的标识符并遵循 Java 包的命名规范，即全部都是小写字母。例如：com.irikka 是自定义的包名，包名是本站根域名的倒置。

示例代码：

```java title='src/com/irikka/Date.java'
package com.irikka;

public class Date {
    @Override
    public String toString(){
        return "2022.3.2"
    }
}
```

在src目录下创建包 com.irikka ，并在包中创建 Date 类 

