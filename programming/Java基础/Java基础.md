---
sidebar_position: 1
---

# Java语法基础



## Java标识符



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



