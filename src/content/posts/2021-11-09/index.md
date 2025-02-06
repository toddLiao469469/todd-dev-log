---
title: "轉生成為Flutter工程師 — 03 | Dart 基本介紹"
description: "最基礎的變數宣告到類別語法"
published: 2021-11-09T00:00:00.000+08:00
category: "轉生成為Flutter工程師"
tags: ["Flutter", "dart"]
---

## 前言

前一陣子剛完成了人生第一次的 it 邦幫忙的鐵人賽，連續寫三十天的文章意外地折騰人。 這次我選擇的主題是「Flutter web」，雖然現在回頭看跟「Flutter web」基本沒有太大的關係大部分都是在講「Flutter」及「Dart」

這篇文主要是彙整我在這次鐵人賽的中有關 Dart 基本介紹的部分，大部分內容就是直接搬運過來然後扣掉一些廢話 xD

系列文連結：Flutter web 的奇妙冒險 :: 2021 iThome 鐵人賽

## Dart 是什麼？

Dart 是一個靜態強型別的語言，同時支援物件導向程式設計（OOP） 及函數式程式設計（FP）的特性，

而 Dart 正是「Flutter」所使用的語言，原本是 google 為取代 JavaScript 而設計的語言，所以在語法上借鑑許多 JS 的特點，而也剛好補足一些我認為的缺點。

相似的地方：

1. first-class function
2. 非同步機制
3. 基本語法、運算子大部分類似

相異的地方：

1. JS 是 prototype-base 而 Dart 則是 class-base
2. Dart 是強型別且支援型別推斷
3. Dart 擁有健全的 null safety 功能
4. 執行環境

根據以上幾點我認為**「Dart 是具有 Type 保障且是 class-base 的 JS」**，基本上只要是熟悉 JS 的開發者轉而學習 Dart 的學習曲線是相當友善的。在網路上其他文章也有看過「Dart 是融合 JavaScript 與 Java 優點的語言」，但因為我沒使用過 Java 所以對這個觀點就不多做評論了。如果有使用過 Java 的讀者可以在底下留言與大家分享一下你的觀點。

特別說明一下差異裡的後三點，型別這個問題，有寫過 JS 的讀者應該都有遇過「xxx is not defined」這種 runtime error，但如果有型別系統，在開發期間的編輯器靜態檢查就能很大的一部份避免這些問題了。

當然如果跟 TypeScrpit 相比一樣也能達成上面的需求且對於開發體驗的提升也很大，但使用 TS 有時會遇到第三方 package 的 generic type 很難標，甚至最後標成 `any` 。但因為 Dart 本身就有型別系統所以基本上第三方的 pub 還是有型別保障的。

那 null safety 指的是什麼？最大的好處就是我們可以在開發時很有把握的知道這個變數是不是`null`的而不必其他額外的 null 判斷，至於是怎麼做到的後面的篇章會介紹到。

（題外話：因為 null safety 所以現在 Dart/Flutter 在使用第三方的 pub 時也是有很多的坑）

至於執行環境，JS 在 node 出現之前大部分就是直接跑在瀏覽器上

而 Dart 本身可以分成兩個平台

1. Dart Native
2. Dart web

Dart Native：簡單來說就是同時利用 Dart 兩種編譯模式 JIT（即時編譯）及 AOT（預先編譯），開發時是使用 JIT 編譯模式跑在 Dart VM 上（可以想像成跟 node.js 一樣）然後到 production 時則是採用 AOT 的形式。 這樣就能讓我們是開發時享受到 hot reload 的之類的好處，而到了 production 環境時 AOT 編譯器就會產生出該環境要用 machine code，讓程式的啟動時間減少。

Dart web：基本上就是將 Dart 轉成 JS，開發環境會使用 dartdevc，production 則是用 dart2js。而 flutter web 也是利用已經成熟的 dart2js 才得以實現的。

## 變數宣告

dart 主要有四種方式宣告變數

分別為 `const` 、 `var` 、 `type`、 `final`

```dart
const a = 10;
final b = 10;
var c = 123;
string d = '123'
```

首先 `const` 及 `final` 這兩個宣告方式就跟 js 的 `const` 一樣是用於宣告一個「不可變的常數」。

亦即這之後不能將這些變數重新賦值。那為什麼還有分 `const` 及 `final` `呢？最主要的差異是const` 更為嚴格，它代表的是「編譯時的常數」，什麼意思？

```dart
int getNumber(a){
  const b = a;
  return b;
}
void main() {
  int a = 10;
  getNumber(a);

}
```

這邊會看到我在 `getNumber` 裡使用 `const` 宣告 b 將 a 的值給 b ，但這無法通過 Dart 的編譯器。因為 `const` 的是要在編譯期間就已經是有數值的常數。所以 const a = b ; 這種直到 runtime 才完成初始化的事情是不被允許的。

所以 const 較常用地方是一些「永遠不變的數值」像是`const pi = 3.14;` 或者 `const textColor = Color.fromARGB(255, 66, 165, 245);`

而 `final` 就會比較接近於 js 裡 `const` 的用法，就是在接下來的 runtime 這個數值都會是不可變更的。

var 就可以想成是 js 的 `let` 就是可以被變更的變數。但最大的差異就是 Dart 在宣告完後就會進行型別推斷（Type inference）意即如果 `var b = 10` 後不能在進行 `b='123'` 了（可以想像成 ts 一樣），因為在初始化後將會進行型別推斷（Type inference）將 b 的 type 定為 `int` `了所以不能將string` 給 b 了

而直接用型別宣告的方式就跟 `var` 差不多一樣了就不詳細介紹了，就差別是一個是交由 dart 推斷型別一個是我們自己宣告型別。

但其實在變數宣告以及初始化還有一些細節，這部分就留到之後提到「null safety」時再來說明。

## 常用型別

Dart 有以下基本型別

1.int, double
2.String
3.bool
4.List
5.Set
6.Map
7.Runes
8.Symbol
9.Null

基本的 int （整數）、 double （浮點數）、 String （字串）、bool （布林）就不多做介紹。

以下只稍微介紹一下比較常用到的 List 、 Set、 Map

### List

而 List 就是其他語言中的陣列（Array）在 Dart 中的最基礎形式如下：

`final listA = [1,2,3,4];`
在 Dart 裡的 List 有提供其他建構子（constructor） `.filled` 及 `.generate` 都是可以用來動態產生 list 的建構子：

```dart
final listB = List.filled(3, 1); // [0, 0, 0]
final listC = List.generate(3, (index) => index); // [0, 1, 2]
```

差異是 filled 每一個 element 都是同一個 reference 而 generate 不是。

```dart
listB[0].add(1);
listC[0].add(1);
print(listB); // [[1], [1], [1]]
print(listC); // [[1], [], []]
```

以及其中有一個控制這個 List 是不是可變長度的 named parameters growable 的預設值不一樣。但詳細就不贅述了有興趣的讀者可以到官方的 API 文件閱讀。

### Set

定義為「沒有索引值且不可重複的集合」

我們可以用 `{}` 來做初始化並用逗號分隔每一個元素：

```dart
final setA = {0, 1, 2, 3, 4};
print(setA); // {0, 1, 2, 3, 4}
```

也可以利用 `Set.from` 放入一個可迭代的值來產生 Set

```dart
final listX = [0, 1, 0, 0, 1, 2, 1, 3, 4, 5, 6, 7];
final setB = Set.from(listX);
print(setB); //{0, 1, 2, 3, 4, 5, 6, 7}
```

因為 Set 裡並沒有存放索引值，所以我們無法直接存取特定位置的值。但因為 Dart 底層實作的關係，其實還是有將 Set 的順序存入，也因此我們迭代時是會跟初始化時的順序一樣：

```dart
setB.forEach((element) {
    print(element);
});
// 0
// 1
// ...
// 7
```

### Map

Map 就是有 key-value 型式的資料結構，而且 key 不能重複，也因為了有了 key 所以我們有辦法直接存取 Map。

```dart
final mapA = {
  'a': 1,
  'b':2,
  'c':3
};
mapA['a'] // 1
```

當然 Map 也有提供其他的 constructor：

```dart
final mapB = Map.fromIterable([1, 2, 3, 4]);
// {1: 1, 2: 2, 3: 3, 4: 4}
final valueList = [0, 1, 2];
final keyList = ['z', 'x', 'c'];
final mapC = Map.fromIterables(keyList, valueList);
// {z: 0, x: 1, c: 2}
```

當然這些資料結構還有其他 API 可以介紹，但我覺得還是等到之後實際有用到時在一起介紹好了，有興趣的讀者可以先查閱 Dart API 的文件。

泛型
泛型（generic）最簡單的解釋大概就是型別有了參數。

通常都是使用 `<>` 來實作，像是 List 的實作是`List<E>` 而這個 E 就是我們可以傳入的型別：

```dart
final intList = <int>[1, 2, 3, 4];
final stringList = <String>['1', '2', '3', '4'];
```

而當我們使用了不一樣的型別時就會跳出 Error，像是我在 `List<String>` 裡放入一個 int 就會跳出以下錯誤：

當然我們也可以運用到其他地方像是 Class 或者 Function 上

```dart
E ientityFunc<E>(E e) => e;
class A<T> {
  T? value;
}
print(ientityFunc<int>(2)); // 2
final a = A<int>();
a.value = 'string';  // 這行會出錯因為 A傳入的是 int type
```

而關於型別有一些進階應用像是利用 `typedef` 對 Function 的型別做更進一步的抽象

`typedef Identity<E> = E Function(E e);`
這行的意思就是我定義了一個型別叫做 Identity，而這個型別代表的意義就是他是一個會回傳 type E 的 Function 且只有一個 type E 的參數。

```dart
class Utils<T> {
  Identity<T> ientity = (x) => x;
}
final utils = Utils<int>();
print(utils.ientity(1));
```

我們可以從 vs code 中看到因為我們傳入了 int 所以 `utils.ientity` 也變成有一個 int 參數且會回傳 int 的 Function

### Class

前面說到 Dart 是一個支援 OOP 的程式語言，不同於 JS 的 Prototype-based，Dart 則是 Class-based，所以在 OOP 上會比較像是 Java 之類的語言。

在 Dart 中 class 的宣告很簡單

```dart
class Person {
  final String name;
  final int age;
  final String email;
  late final String position; // 請先無視這個late 之後會提到null safety時會再說明
  Person(this.position,
      {required this.name, required this.age, required this.email});
  Person.developer(
      {required this.name, required this.age, required this.email}) {
    this.position = 'developer';
  }
  void hello() {
    print('hi 我是 $name 我的職業是 $position');
  }
}
```

我們可以直接宣告一些變數來表示這個 class 的 fields 以及一些 function 來表示這個 class 的 method，這些統稱是 class members，那這個與 class 同名的 function Person 是什麼呢？

這個就是所謂的建構子（constructor），在 OOP 中 class 可以想像成一個模板，而所謂的物件就是按照模板產生出來的東西，這個過程又稱為實體化（instantiation）

而在 OOP 裡負責這件事情就是 constructor ，而 constructor 當然可以不只有一個，我們可以宣告多個 constructor 來因應各種需求，像是可能許多人的 position 都是 developer 那我們可以宣告一個 constructor 叫做 Person.developer 來減少我們只用原本的 constructor 還要一直多傳 position 的煩躁感。

真正在程式中 run 起來會像是這樣子：

```dart
void main() {

  final todd = Person('developer',name:'todd',age:25,email:'123@gamil.com');
  final larry = Person.developer(age:25,name:'larry',email:'456@gamil.com');
  print(todd.email);
  print(todd.name);
  print(todd.job);
  print(todd.age);
  todd.hello();
  larry.hello();
}
```

也許有人已經注意到為什麼在 `Person(this.position, {required this.name, required this.age, required this.email});`

有些參數是放在 `{}` 裡有些參數是放在前面，他們差別在哪裡？  
直接放在前面的參數是 required positional parameters 而放到大括號中的是 Named parameters。

從這個例子先不考慮有 default value（optional parameters ）的情況下我們就能看得出 positional parameters 它就跟一般 function 一樣我們要依照參數的順序放入我們的數值，而 Named parameters 就是我們以 key:value 的形式傳入參數而且順序可以隨意。

## Factory

在 Dart class constructor 中有提供一個語法糖 factory ，我們先來看看它的大概會長怎麼樣，稍微將上面的 Person Class 修改一下後：

```dart
class Person {
  final String name;
  final int age;
  final String email;
  late final String position;
  Person(
      {required this.name,
      required this.age,
      required this.email,
      required this.position});
  Person.developer(
      {required this.name, required this.age, required this.email}) {
    this.position = 'developer';
  }
  factory Person.todd(String name) {
    return Person(
        name: name, age: 25, email: '123@gamil.com', position: 'developer');
  }
  void hello() {
    print('hi 我是 $name 我的職業是 $position');
  }
}
```

最直觀的差異就是 factory constructor 會回傳一個 instance ，而不是像一般的 constructor 只要傳入值或者對 this 操作來設定值且不用另外撰寫 return 相關的語法。也因為是直接回傳 instance 所以就無法對 this 操作。

那實際上 factory 有什麼用途？

大致上有三種

我希望不是每一次呼叫 constructor 都一定會建立一個新的 instance，而是根據情況來決定要不要創建新的 instance
我希望這個 class 只能有一個 instance（沒錯就是單例模式，singleton pattern ）
不是要回傳這個 class 而是要回傳這個它的子 class
詳細用法請參考：<https://stackoverflow.com/questions/53886304/understanding-factory-constructor-code-example-dart>
