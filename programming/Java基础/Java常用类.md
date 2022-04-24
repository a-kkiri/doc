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

### getClass() 方法

原型声明：

```java
final Class<?> getClass()
```

返回引用中储存的实际对象类型，通常用于判断两个引用中实际存储的对象类型是否一致。

示例代码如下：

```java
package com.irikka;

public class test {
    public static void main(String[] args){
        Student s1 = new Student("Lihua", 16);
        Teacher t1 = new Teacher("Joe", 32);

        Class c1 = s1.getClass();
        Class c2 = t1.getClass();

        if (c1 == c2){
            System.out.println("它们属于一个类");
        }else{
            System.out.println("它们不属于一个类");
        }
    }
}
```

### hashCode() 方法

原型声明：

```java
public int hashCode()
```

返回该对象的哈希码值，哈希值是根据对象的地址、字符串或数字使用 hash 算法计算出来的 int 类型的数组。

一般情况下相同对象返回相同的哈希码。

示例代码如下：

```java
package com.irikka;

public class test {
    public static void main(String[] args){
        Student s1 = new Student("lihua", 16);
        Teacher t1 = new Teacher("White", 32);
        Student s2 = s1;

        System.out.println(s2.hashCode());
        System.out.println(s1.hashCode());
        System.out.println(t1.hashCode());
    }
}   

```



## 包装类

在 Java 8 中有 8 种数据类型不属于类，不具备 “对象” 的特征，没有成员变量和方法，不方便进行面向对象的操作。为此，Java 提供包装类（Wrapper Class）将基本数据类型包装成类，每个 Java 基本数据类型在 java.lang 包中都有一个对应的包装类，每个包装类对象封装一个基本数据类型数值。除 int 和 char 类型外，其他类型的对应规则就是第一个字母大写。

:::caution

包装类都是 final 的，不能被继承。包装类都是不可变类，类似于 String 类，一旦创建了对象，其内容就不可修改。

::: 

包装类还可分为三种不同的类别：数值包装类（Byte、Short、Integer、Long、Float 和 Double）、Character 类和 Boolean 类，下面分别详细介绍。

### 数值包装类

这些数值包装类（Byte、Short、Integer、Long、Float 和 Double）都有一些共同的特点。

1. 共同的父类

   这 6 个数值包装类有一个共同的父类——Number，Number 是一个抽象类，除了这 6 个子类，它的子类还有 AtomicInteger、AtomicLong、BigDecimal 和 BigInteger，其中 BigDecimal，其中 BigDecimal 和 BigInteger 后面会详细介绍。Number 是抽象类，要求他的子类必须实现如下 6 种方法。

   - `byte byteValue()`：将当前包装的对象转化为 byte 类型的数值
   - `double doubleValue()`：将当前包装的对象转化为 double 类型的数值
   - `float floatValue()`：将当前包装的对象转化为 float 类型的数值
   - `int intValue()`：将当前包装的对象转化为 int 类型的数值
   - `long longValue()`：将当前包装的对象转化为 long 类型的数值
   - `short shortValue()`：将当前包装的对象转化为 short 类型的数值

   通过这 6 种方法，数值包装类可以互相转换这 6 种数值，但是需要注意的是大范围数值转换为小范围的数值，如果数值本身很大，则可能会导致精度的丢失。

2. 返回数值包装类对象

   每个数值包装类都会提供一些静态 valueOf() 方法返回数值包装类对象。以 Integer 为例，方法定义如下：

   - `static Integer valueOf(int i)`：将 int 参数 i 转换为 Integer 对象。
   - `static Integer valueOf(String s)`：将 String 参数 s 转换为 Integer 对象。

3. 字符串转换为基本数据类型

   每个数值包装类都提供一些静态 parseXXX() 方法实现将字符串转换为对应的基本数据类型。以 Integer 为例，方法定义如下：

   - `static int parseInt(String s)`：将字符串 s 转化为有符号的十进制整数。
   - `static int parseInt(String s, int radix)`：将字符串 s 转化为有符号的十进制整数，radix 是指定基数，基数用来指定进制。注意，这种指定基数的方法在浮点数包装类（Double 和 Float）中是没有的。

4. 基本数据类型转换为字符串

   每个数值包装类都会提供一些静态 toString() 方法实现将基本数据类型数值转换为字符串。以 Integer 为例，方法定义如下：

   - `static String toString(int i)`：将该整数 i 转换为有符号的十进制表示的字符串。
   - `static String toString(int i, int radix)`：将该整数 i 转换为有符号的特定进制表示的字符串，radix 是基数，可以指定进制。注意，这种指定基数的方法在浮点数包装类（Double 和 Float）中是没有的。

5. compareTo() 方法

   每个数值包装类都有 `int compareTo(数值包装类对象)` 方法，可以进行包装对象的比较。方法返回值是 int。如果返回值是 0，则相等；如果返回值小于 0，则此对象小于参数对象；如果返回值大于 0，则此对象大于参数对象。

示例代码如下：

```java title="HelloWorld.java"
//HelloWorld.java文件
package com.zhijieketang;

public class HelloWorld {
    public static void main(String[] args) {
        // 1.构造方法
        //创建数值为80的Integer对象
        Integer objInt = Integer.valueOf(80);
        //创建数值为80.0的Double对象
        Double objDouble = Double.valueOf(80.0);
        //通过"80.0"字符串创建数值为80.0的Float对象
        Float objFloat = Float.valueOf("80.0");
        //通过"80"字符串创建数值为80的Long对象
        Long objLong = Long.valueOf("80");

        // 2.Number类方法
        //Integer对象转换为long数值
        long longVar = objInt.longValue();
        //Double对象转换为int数值
        int intVar = objDouble.intValue();
        System.out.println("intVar = " + intVar);
        System.out.println("longVar = " + longVar);

        // 3.compareTo()方法
        Float objFloat2 = Float.valueOf(100);
        int result = objFloat.compareTo(objFloat2);
        // result = -1，表示objFloat小于objFloat2
        System.out.println(result);

        // 4.字符串转换为基本数据类型
        // 10进制"100"字符串转换为10进制数为100
        int intVar2 = Integer.parseInt("100");
        // 16进制"ABC"字符串转换为10进制数为2748
        int intVar3 = Integer.parseInt("ABC", 16);
        System.out.println("intVar2 = " + intVar2);
        System.out.println("intVar3 = " + intVar3);

        // 5.基本数据类型转换为字符串
        // 100转换为10进制字符串
        String str1 = Integer.toString(100);
        // 100转换为16进制字符串结果是64
        String str2 = Integer.toString(100, 16);
        System.out.println("str1 = " + str1);
        System.out.println("str2 = " + str2);

    }
}
```



### Character 类

Character 类是 char 类型的包装类。Character 类常用方法如下：

- `static Character valueOf(char c)`：将 char 参数 c 转换为 Character 对象。

- `char charValue()`：返回此 Character 对象的值。

- `int compareTo(Character anotherCharacter)`：方法的返回值是 int。如果返回值是 0，则相等；如果返回值小于 0，则对象小于参数对象；如果返回值大于 0，则此对象大于参数对象。

  示例代码如下：

  ```java
  //HelloWorld.java文件
  package com.zhijieketang;
  
  public class HelloWorld {
      public static void main(String[] args) {
          // 创建数值为'A'的Character对象
          Character objChar1 = Character.valueOf('A');
          // 从Character对象返回char值
          char ch = objChar1.charValue();
  
          // 字符串比较
          Character objChar2 = Character.valueOf('C');
          int result = objChar1.compareTo(objChar2);
          // result = -2，表示objChar1小于objChar2
          if (result < 0) {
              System.out.println("objChar1小于objChar2");
          }
      }
  }
  ```



### Boolean 类

Boolean 类是 boolean 类型的包装类。Boolean 类常用方法如下：

1. 返回 Boolean 对象

   Boolean 类提供一些静态 valueOf() 方法返回 Boolean 对象。方法定义如下：

   - `static Boolean valueOf(boolean b)`：将 boolean 参数 b 转换为 Boolean 对象。
   - `static Boolean valueOf(String s)`：将 String 参数 s 转换为 Boolean 对象。

2. 构造方法

   Boolean 类有两个构造方法，其定义如下：

   - `Boolean(boolean value)`：通过一个 boolean 值创建 Boolean 对象。
   - `Boolean(String s)`：通过字符串创建 Boolean 对象。s 不能为 null，s 如果是忽略大小写的 “true”，则转换为 true 对象，其他字符串都转换为 false 对象。

3. compareTo() 方法

   Boolean 类有 `int compareTo(Boolean 包装类对象)`方法，可以进行包装对象的比较。方法返回值是 int。如果返回值是 0，则相等；如果返回值小于 0，则此对象小于参数对象；如果返回值大于 0，则此对象大于参数对象。

4. 字符串转换为 boolean 类型

   Boolean 包装类都提供静态方法 `parseBoolean()` 方法实现将字符串转换为对应的 boolean 类型，方法定义如下：

   ```java
   static boolean parseBoolean(String s)
   ```

   将字符串转换为对应的 boolean 类。s 不能为 bull，s 如果是忽略大小写的 “true”，则转换为 true 对象，其他字符串都转换为 false 对象。

示例代码如下：

```java
//HelloWorld.java文件
package com.zhijieketang;

public class HelloWorld {
    public static void main(String[] args) {

        // 创建数值为true的Boolean对象
        Boolean obj1 = Boolean.valueOf(true);
        // 通过字符串"true"创建数值为true的Boolean对象
        Boolean obj2 = Boolean.valueOf("true");
        // 通过字符串"True"创建数值为true的Boolean对象
        Boolean obj3 = Boolean.valueOf("True");
        // 通过字符串"TRUE"创建数值为true的Boolean对象
        Boolean obj4 = Boolean.valueOf("TRUE");
        // 通过字符串"false"创建数值为false的Boolean对象
        Boolean obj5 = Boolean.valueOf("false");
        // 通过字符串"Yes"创建数值为false的Boolean对象
        Boolean obj6 = Boolean.valueOf("Yes");
        // 通过字符串"abc"创建数值为false的Boolean对象
        Boolean obj7 = Boolean.valueOf("abc");
        // 当字符串为null时创建数值为false的Boolean对象
        Boolean obj8 = Boolean.valueOf(null);

        System.out.println("obj1 = " + obj1);
        System.out.println("obj2 = " + obj2);
        System.out.println("obj3 = " + obj3);
        System.out.println("obj4 = " + obj4);
        System.out.println("obj5 = " + obj5);
        System.out.println("obj6 = " + obj6);
        System.out.println("obj7 = " + obj7);
        System.out.println("obj8 = " + obj8);
    }
}
```



### 自动装箱/拆箱

包装类丰富了 Java 语言的面向对象，提供了原来基本数据类型没有的方法。但是也带来了使用的不便。例如，如下代码试图对包装类对象进行算数运算，在 Java 5 之前代码第 ① 行会发生编译错误，想想可以理解，这些对象不能简单地使用算数运算符连接起来。

```java
//创建数值为 80 的 Integer 对象
Integer objInt = new Integer(80);
//创建数值为 80.0 的 Double 对象
Double objDouble = new Double(80.0);
//算数运算
double sum = objInt + objDouble;	//Java 5 之前有编译错误	①
```

但是代码第 ① 行在 Java 5 之后可以编译通过了，并且能计算出正确的结果。这是因为 Java 5 之后提供了拆箱（unboxing）功能，拆箱能够将包装类对象自动转换为基本数据类型的数值，而不需要使用 intValue() 或 doubleValue() 等方法。类似 Java 5 还提供了相反的功能——自动装箱（autoboxing），装箱能够自动地将基本数据类型的数值转换为包装类对象，而不需要使用构造方法。

示例代码如下：

```java
//HelloWorld.java文件
package com.zhijieketang;

public class HelloWorld {
    public static void main(String[] args) {

        Integer objInt = Integer.valueOf(80);
        Double objDouble = Double.valueOf(80.0);

        //自动拆箱
        double sum = objInt + objDouble;

        //自动装箱
        //自动装箱'C'转换为Character对象
        Character objChar = 'C';
        //自动装箱true转换为Boolean对象
        Boolean objBoolean = true;
        //自动装箱80.0f转换为Float对象
        Float objFloat = 80.0f;

        //自动装箱100转换为Integer对象
        display(100);

        //避免出现下面的情况
        Integer obj = null;		//	①
        int intVar = obj;//运行期异常NullPointerException	②
    }

    /**
     * @param objInt Integer对象
     * @return int数值
     */
    public static int display(Integer objInt) {

        System.out.println(objInt);

        //return objInt.intValue();
        //自动拆箱Integer对象转换为int
        return objInt;
    }
}
```

在自动装箱和拆箱时要避免空对象，代码第①行 obj 是 null，则代码第 ② 行会发生运行期 NullPointerException 异常，这是因为拆箱的过程本质上是调用 intValue() 方法实现的，试图访问空对象的方法和成员变量，就会抛出运行期 NullPointerException 异常。



## Math 类

Java 语言是彻底地面向对象的语言，哪怕是进行数学运算也要封装到一个类中，这个类是 java.lang.Math，Math 类是 final 的，不能被继承。Math 类中包含用于进行基本数学运算的方法，如指数、对数、平方根和三角函数等。

1. 舍入方法

   - `static double ceil(double a)`：返回大于或等于 a 的最小整数。
   - `static double floor(double a)`：返回小于或等于 a 的最大整数。
   - `static int round(float a)`：四舍五入方法

2. 最大值和最小值

   - `static int min(int a, int b)`：取两个 int 整数中较小的一个整数。
   - `static int min(long a, long b)`：取两个 long 整数中较小的一个整数。
   - `static int min(float a, float b)`：取两个 float 浮点数中较小的一个浮点数。
   - `static int min(double a, double b)`：取两个 double 浮点数中较小的一个浮点数。

   max 方法取两个数中较大的一个数，max 方法与 min 方法参数类似也有四个版本。

3. 绝对值

   - `static double abs(double a)`：Returns the absolute value of a `double` value.
   - `static float abs(float a)`：Returns the absolute value of a `float` value.
   - `static int abs(int a)`：Returns the absolute value of an `int` value.
   - `static long abs(long a)`：Returns the absolute value of a `long` value.

4. 三角函数

   - `static double sin(double a)`：返回角的三角正弦。
   - `static double cos(double a)`：返回角的三角余弦。
   - `static double tan(double a)`：返回角的三角正切。
   - `static double asin(double a)`：返回一个值的反正弦。
   - `static double acos(double a)`：返回一个值的反余弦。
   - `static double atan(double a)`：返回一个值的反正切。
   - `static double toDegrees(double angrad)`：将弧度转换为角度。
   - `static double toRadians(double angdeg)`：将角度转换为弧度。

5. 对数运算

   - `static double log(double a)`：返回 a 的自然对数。
   - `static double log10(double a)`：返回 a 以 10 为底的对数。
   - `static double log1p(double x)`：返回x + 1的自然对数。

6. 平方根

   - `static double sqrt(double a)`：返回 a 的正平方根。

7. 幂运算

   - `static double pow(double a, double b)`：返回第一个参数的第二个参数次幂的值。

8. 计算随机值

   - `static double random()`：返回大于或等于 0.0 且小于 1.0 的随机数。

9. 常量

   - 圆周率 PI
   - 自然对数的底数 E

示例代码如下：

```java
//HelloWorld.java文件
package com.zhijieketang;

public class HelloWorld {
    public static void main(String[] args) {

        double[] nums = {1.4, 1.5, 1.6};

        // 测试最大值和最小值
        System.out.printf("min(%.1f, %.1f) = %.1f\n", nums[1], nums[2], Math.min(nums[1], nums[2]));
        System.out.printf("max(%.1f, %.1f) = %.1f\n", nums[1], nums[2], Math.max(nums[1], nums[2]));
        System.out.println();

        // 测试三角函数
        // 1π弧度 = 180°
        System.out.printf("toDegrees(0.5π)	= %f\n", Math.toDegrees(0.5 * Math.PI));
        System.out.printf("toRadians(180/π) = %f\n", Math.toRadians(180 / Math.PI));
        System.out.println();

        // 测试平方根
        System.out.printf("sqrt(%.1f) = %f\n", nums[2], Math.sqrt(nums[2]));
        System.out.println();

        // 测试幂运算
        System.out.printf("pow(8, 3) = %f\n", Math.pow(8, 3));
        System.out.println();

        // 测试计算随机值
        System.out.printf("0.0~1.0之间的随机数 = %f\n", Math.random());
        System.out.println();

        // 测试舍入方法
        for (double num : nums) {
            display(num);
        }

    }

    // 测试舍入方法
    public static void display(double n) {
        System.out.printf("ceil(%.1f)	= %.1f\n", n, Math.ceil(n));
        System.out.printf("floor(%.1f) 	= %.1f\n", n, Math.floor(n));
        System.out.printf("round(%.1f) 	= %d\n", n, Math.round(n));
        System.out.println();
    }
}
```

## 大数值

对货币等大值数据进行计算时，int、long、float 和 double 等基本数据类型在精度方面已经不能满足需求了。为此 Java 提供了两个大数值类：BigInteger 和 BigDecimal，这两个类都继承自 Number 抽象类。

### BigInteger 类

java.math.BigInteger 是不可变的任意精度的大整数。

BigInteger 构造方法有很多，其中字符串参数的构造方法有如下两个：

- `BigInteger(String val)`：将十进制字符串 val 转换为 BigInteger 对象。
- `BigInteger(String val, int radix)`：Translates the String representation of a BigInteger in the specified radix into a BigInteger.

BigInteger 提供多种方法，下面列举几个常用方法：

- `int compareTo(BigInteger val)`：将当前对象与参数 val 进行比较，方法返回值是 int。如果返回值等于 0，则相等；如果返回值小于 0，则此对象小于参数对象；如果返回值大于 0，则此对象大于参数对象。
- `BigInteger add(BigInteger val)`：Returns a BigInteger whose value is (this + val).
- `BigInteger subtract(BigInteger val)`：Returns a BigInteger whose value is `(this - val)`.
- `BigInteger multiply(BigInteger val)`：Returns a BigInteger whose value is `(this * val)`.
- `BigInteger divide(BigInteger val)`：Returns a BigInteger whose value is `(this / val)`.

另外，BigInteger 继承了抽象类 Number，所以它还实现抽象类 Number 的 6 种方法，具体方法参考[数值包装类](/programming/Java基础/Java常用类/#数值包装类)

示例代码如下：

```java
//HelloWorld.java文件
package com.zhijieketang;

import java.math.BigInteger;

public class HelloWorld {
    public static void main(String[] args) {

        //创建BigInteger，字符串表示10进制数值
        BigInteger number1 = new BigInteger("999999999999");
        //创建BigInteger，字符串表示16进制数值
        BigInteger number2 = new BigInteger("567800000", 16);

        // 加法操作
        System.out.println("加法操作：" + number1.add(number2));
        // 减法操作
        System.out.println("减法操作：" + number1.subtract(number2));
        // 乘法操作
        System.out.println("乘法操作：" + number1.multiply(number2));
        // 除法操作
        System.out.println("除法操作：" + number1.divide(number2));
    }
}
```

### BigDecimal 类

java.math.BigDecimal 是不可变的任意精度的有符号十进制数。

BigDecimal 构造方法有很多，例如：

- `BigDecimal(BigInteger val)`：Translates a BigInteger into a BigDecimal.
- `BigDecimal(double val)`：将 double 转换为 BigDecimal 对象，参数 val 是 double 类型的二进制浮点值准确的十进制表示形式。
- `BigDecimal(int val)`：Translates an int into a BigDecimal.
- `BigDecimal(long val)`：Translates a long into a BigDecimal.
- `BigDecimal(String val)`：Translates the string representation of a BigDecimal into a BigDecimal.

BigDecimal 提供多种方法，下面列举几个常用的方法：

- `int compareTo(BigDecimal val)`：将当前对象与参数 val 进行比较，方法返回值是 int。如果返回值等于 0，则相等；如果返回值小于 0，则此对象小于参数对象；如果返回值大于 0，则此对象大于参数对象。
- `BigDecimal add(BigDecimal val)`：Returns a BigDecimal whose value is (this + val).
- `BigDecimal subtract(BigDecimal val)`：Returns a BigDecimal whose value is `(this - val)`.
- `BigDecimal multiply(BigDecimal val)`：Returns a BigDecimal whose value is `(this * val)`.
- `BigDecimal divide(BigDecimal val)`：Returns a BigDecimal whose value is `(this / val)`.
- `BigDecimal divide(BigDecimal divisor, RoundingMode roundingMode)`：除运算，当前对象数值除以参数 val。[RoundingMode](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/math/RoundingMode.html) 为枚举类，它指要应用的舍入模式。

另外，BigDecimal 继承了抽象类 Number，所以它还实现抽象类 Number 的 6 种方法，具体方法参考[数值包装类](/programming/Java基础/Java常用类/#数值包装类)

示例代码如下：

```java
//HelloWorld.java文件
package com.zhijieketang;

import java.math.BigDecimal;

public class HelloWorld {

    public static void main(String[] args) {

        // 创建BigDecimal，通过字符参数串创建
        BigDecimal number1 = new BigDecimal("999999999.99988888");
        // 创建BigDecimal，通过double参数创建
        BigDecimal number2 = new BigDecimal(567800000.888888);

        // 加法操作
        System.out.println("加法操作：" + number1.add(number2));
        // 减法操作
        System.out.println("减法操作：" + number1.subtract(number2));
        // 乘法操作
        System.out.println("乘法操作：" + number1.multiply(number2));
        // 除法操作
        System.out.println("除法操作：" + number1.divide(number2, RoundingMode.HALF_UP));	//①
    }
}
```

上述代码第 ① 行是进行除法运算，该方法需要指定舍入模式，如果不指定舍入模式，则会发生运行期异常 ArithmeticException，舍入模式 RoundingMode.HALF_UP 是指四舍五入。

## 日期和时间相关类

Java 中最常用的日期和时间类是 java.util.Date，与日期和时间相关的类还有 DateFormat、Calendar 和 TimeZone，DateFormat 用于日期格式化，Calendar 是日期类，TimeZone 是时区类。

:::tip

在 Java SE 核心类中有两个 Date，分别是 java.util.Date 和 java.sql.Date。java.util.Date 就是本节要介绍的日期时间类，而 java.sql.Date 是 JDBC 中的日期字段类型。

:::

### Date 类

Date 类中有很多构造方法和普通方法。

首先介绍 Date 类构造方法如下：

- `Date()`：用当前时间来创建 Date 对象，精确到毫秒。
- `Date(long date)`：指定标准基准时间以来的毫秒数创建 Date 对象。标准基准时间是格林尼治时间 1970 年 1 月 1 日 00:00:00

Date 类的普通方法如下：

- `boolean after(Date when)`：Tests if this date is after the specified date.
- `boolean before(Date when)`：Tests if this date is before the specified date.
- `int compareTo(Date anotherDate)`：比较两个日期的顺序。如果参数日期等于此日期，则返回值 0；如果此日期在参数日期之前，则返回小于 0 的值；如果此日期在参数日期之后，则返回大于 0 的值。
- `long getTime()`：返回自 1970 年 1 月 1 日 00:00:00 以来此 Date 对象表示的毫秒数。
- `void setTime(long time)`：用毫秒数 time 设置日期对象，time 是自 1970 年 1 月 1 日 00:00:00 以来此 Date 对象表示的毫秒数。

示例代码如下：

```java
//HelloWorld.java文件
package com.zhijieketang;

import java.util.Date;

public class HelloWorld {

    public static void main(String[] args) {

        Date now = new Date();
        System.out.println("now = " + now);
        System.out.println("now.getTime() = " + now.getTime());
        System.out.println();

        Date date = new Date(1234567890123L);
        System.out.println("date = " + date);

        // 测试now和date日期
        display(now, date);

        // 重新设置日期time
        date.setTime(9999999999999L);

        System.out.println("修改之后的date = " + date);

        // 重新测试now和date日期
        display(now, date);

    }

    // 测试after、before和compareTo方法
    public static void display(Date now, Date date) {
        System.out.println();
        System.out.println("now.after(date) 	= " + now.after(date));
        System.out.println("now.before(date)	= " + now.before(date));
        System.out.println("now.compareTo(date)	= " + now.compareTo(date));
        System.out.println();
    }
}
```



### 日期格式化和解析

上面示例日期的输出结果，如 Sun Apr 24 14:48:34 CST 2022，这个时间并不符合中国人的习惯，此时需要对日期进行格式化输出。日期格式化类是 `java.text.DateFormat`，DateFormat 是抽象类，它的常用具体类是 `java.text.SimpleDateFormat`。

DateFormat 中提供日期格式化和日期解析方法，具体方法说明如下：

- `final String format(Date date)`：将一个 Date 格式化为日期/时间字符串。
- `Date parse(String source)`：从给定的字符串开始解析文本，以生成一个日期对象。如果解析失败。则抛出 ParseException。

另外，具体类 SimpleDateFormat 构造方法如下：

- `SimpleDateFormat()`：用默认的模式和默认语言环境的日期格式符号构造 SimpleDateFormat。
- `SimpleDateFormat(String pattern)`：用给定的模式和默认语言环境的日期格式符号构造 SimpleDateFormat。pattern 参数是日期和时间格式模式。下表是常用的日期和时间格式模式：

| 字母 | 日期或时间元素           |      | 字母 | 日期或时间元素 |
| ---- | ------------------------ | ---- | ---- | -------------- |
| y    | 年                       |      | a    | AM/PM 标记     |
| M    | 年中的月份               |      | m    | 小时中的分钟数 |
| D    | 年中的天数               |      | s    | 分钟中的秒数   |
| d    | 月份中的天数             |      | S    | 毫秒数         |
| H    | 一天中的小时数           |      | Z    | 时区           |
| h    | AM/PM 中的小时数（1~12） |      |      |                |

示例代码如下：

```java
//HelloWorld.java文件
package com.zhijieketang;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class HelloWorld {

    public static void main(String[] args) throws ParseException {		//①

        Date date = new Date(1234567890123L);		//②
        System.out.println("格式化前date = " + date);

        DateFormat df = new SimpleDateFormat();		//③
        System.out.println("格式化后date = " + df.format(date));		//④
        df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");		//⑤
        System.out.println("格式化后date = " + df.format(date));		/⑥

        String dateString = "2018-08-18 08:18:58";
        Date date1 = df.parse(dateString);		//⑦
        System.out.println("从字符串获得日期对象 = " + date1);

    }

}
```

上述代码第 ② 行创建日期对象；代码第 ③ 行采用默认构造方法创建日期格式化 SimpleDateFormat 对象；代码第 ④ 行进行格式化输出，结果是 "2019/2/14 上午 7:31"，这个格式化采用的是当前操作系统默认的格式，在实际开发过程中使用得不多。代码第 ⑤ 行重新创建 SimpleDateFormat 对象，这里指定他的日期时间格式模式为 "yyyy-MM-dd HH:mm:ss"；代码第 ⑥行是格式化输出，结果是 "2009-02-14 07:31:30"，开发人员还可以根据自己的需要设置其他格式。

:::caution

并不是所有的字符串都能够转换为日期，如果转换失败，parse 方法会抛出异常 ParseException。由于 ParseException 异常是受检查类型异常，这种异常必须处理，本例是抛出处理，见代码第 ① 行 main 方法后的 throws ParseException 语句。

:::



### Calendar 类

有时为了取得更多的日期时间信息，或对日期时间进行操作，可以使用 java.util.Calendar 类。Calendar 是一个抽象类，不能实例化，但是可以通过静态工厂方法 getInstance() 获得 Calendar 实例。

Calendar 类的主要方法如下：

- `static Calendar getInstance()`：Gets a calendar using the default time zone and locale.
- `void set(int field, int value)`：Sets the given calendar field to the given value.
- `final void set(int year, int month, int date)`：Sets the values for the calendar fields YEAR, MONTH, and DAY_OF_MONTH.
- `final Date getTime()`：返回一个表示此 Calendar 时间值（从 1970 年 1 月 1 日 00:00:00 至现在的毫秒数）的 Date 对
- `boolean after(Object when)`：Returns whether this Calendar represents a time after the time represented by the specified Object.
- `boolean before(Object when)`：Returns whether this Calendar represents a time before the time represented by the specified Object.

- `int compareTo(Calendar anotherCalendar)`：比较两个 Calendar 对象表示的时间值。

示例代码如下：

```java
//HelloWorld.java文件
package com.zhijieketang;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class HelloWorld {

    public static void main(String[] args) throws ParseException {

        // 获得默认的日历对象
        Calendar calendar = Calendar.getInstance();
        // 设置日期2018年8月18日
        calendar.set(2018, 7, 18);		//①

        // 通过日历获得Date对象
        Date date = calendar.getTime();
        System.out.println("格式化前date = " + date);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println("格式化后date = " + df.format(date));
        System.out.println();

        calendar.clear();		//②
        // 设置日期2018年8月28日
        calendar.set(Calendar.YEAR, 2018);		//③
        calendar.set(Calendar.MONTH, 7);		//④
        calendar.set(Calendar.DATE, 28);		//⑤

        // 通过日历获得Date对象
        date = calendar.getTime();
        System.out.println("格式化前date = " + date);
        System.out.println("格式化后date = " + df.format(date));
    }
}
```

:::caution

上述代码第 ① 行是设置日历的年、月、日字段，注意在设置 “月” 时，应该是 “月份 - 1”，因为日历中月份的第一个月是 0，第二个月是 1，以此类推。

:::

代码第 ② 行 calendar.clear() 语句是重新初始化日历对象。代码 ③ ~ ⑤ 行分别设置日历的年、月和日字段。

> 创建日期：2022年4月24日
