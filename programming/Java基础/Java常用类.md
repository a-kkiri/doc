---
sidebar_position: 14
---

# Java 常用类

## Java 根类——Object

`java.lang.Object` 类是 Java 所有类的根类，Java 所有类都直接或间接继承自 Object 类。Object 类属于 java.lang 包中的类型，不需要显式地使用 import 语句引入，它由解释器自动引入。

Object 类有很多方法，常用的方法如下：

- `String toString()`：返回该对象的字符串表示。
- `boolean equals(Object obj)`：指示其他某个对象是否与此对象 “相等”。

这些方法都是需要在子类中来覆盖的，下面解释它们的用法。

### toString() 方法

为了日志输出等处理方便，所有的对象都可以以文本的方式表示，需要在该对象所在类中覆盖 `toString()` 方法。如果没有覆盖 `toSting()` 方法，默认的字符串是 `类名@对象的十六进制哈希码`。

示例代码如下：

```java title="com\irikka\Person"
package com.irikka;

public class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person [name=" + name + ", age=" + age + "]";
    }

}
```

上述代码覆盖了 `toString()` 方法，返回的字符串完全是自定义的，只要是能够表示当前的类和对象即可。

调用代码如下：

```java title="HelloWorld.java"
import com.irikka.Person;

public class HelloWorld {

    public static void main(String[] args) {

        Person person = new Person("Tony", 18);
        //打印过程自动调用person的 toString()方法
        System.out.println(person);
    }
}

```

输出结果如下：

```
Person [name=Tony, age=13]
```

使用 `System.out.println()` 等输出语句可以自动调用对象的 `toString()` 方法将对象转换为字符串输出。

### 对象比较方法

在前面进行字符串比较时，有两种比较方法：== 运算符和 `equals()` 方法。== 运算符是比较两个引用变量是否指向同一个实例；`equals()` 方法是比较两个对象的内容是否相等，通常字符串的比较，只是关心其内容是否相等。

事实上 `equals()` 方法是继承自 Object 的，所有对象都可以通过 `equals()` 方法进行比较，问题是比较的规则是什么，例如两个人（Person 对象）相等是指什么？名字？还是年龄？问题的关键是需要指定相等的规则，就是要指定比较的是哪些属性相等，所以为了比较两个 Person 对象相等，需要覆盖 `equals()` 方法，在该方法中指定比较规则。

修改 Person 代码如下：

```java title="com\irikka\Person"
package com.irikka;

public class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person [name=" + name + ", age=" + age + "]";
    }

    @Override
    public boolean equals(Object otherObject) {

        //判断比较的参数也是Person类型
        if (otherObject instanceof Person) {
            Person otherPerson = (Person) otherObject;
            // 年龄作为比较规则
            if (this.age == otherPerson.age) {
                return true;
            }
        }
        return false;
    }

}
```

上述代码覆盖了 `equals()` 方法，为了防止传入的参数对象不是 Person 类型，需要使用 instanceof 运算符判断一下。如果是 Person 类型，则通过代码强制类型转换为 Person。代码第 24 行进行比较，把年龄作为比较是否相等的规则，不管其他属性，则认为两个 Person 对象相等。

调用代码如下：

```java title="HelloWorld"
import com.irikka.Person;

public class HelloWorld {

    public static void main(String[] args) {
        Person person1 = new Person("Tony", 20);
        Person person2 = new Person("Tom", 20);
        var person3 = new Person("Joe", 20);

        System.out.println(person1 == person2);        // false
        System.out.println(person1.equals(person2));   // true
        System.out.println(person1.equals(person3));   // true
    }
}

```

person1 和 person2 使用 == 比较结果是 false，因为它们是不同的对象；使用 `equals()` 方法比较结果是 true。

## 包装类

