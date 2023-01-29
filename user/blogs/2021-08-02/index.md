---
title: 轉生成為Flutter工程師 — 02 | 依賴注入到底是什麼(下)？
summary: Flutter 中的「依賴注入」
published: '2021-08-02T00:00:00.000+08:00'
tags:
  - ['flutter','OOP']

---


### 前言

我很常在Flutter的各類「狀態管理」套件的相關文章看到 「依賴注入」 等相關字眼，而這又跟上一篇文章中提到「依賴注入」有什麼不同？。

如果從前一篇文章的脈絡下來，我們會想使用 DI 的原因最主要為了讓兩個類別解耦，然後我們利用 DI 實作 IoC 來降低耦合度。

這篇文會提到的：

- Flutter 的狀態管理所面臨的問題
- 在 Flutter 的依賴注入想解決的問題
  
本文所使用的程式碼沒有特別標注即是 Dart 2.13（null safety）

### 狀態管理

所謂「狀態管理」通常都會討論到「跨組件狀態共享」這個重要的議題。我們先來看看如果在最原生的狀況進行跨組件的狀態共享該如何做，通常都會將一個 `setState` 包裝在 handler 裡後將 state 及handler 向下傳遞

```dart
///showLineNumber
class Parent extends StatefulWidget {
  Parent({Key? key}) : super(key: key);

  @override
  _ParentState createState() => _ParentState();
}

class _ParentState extends State<Parent> {
  bool _active = false;
  void _handler(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Child1(
            active: _active,
            handler: _handler,
          ),
          Child2(
            active: _active,
            handler: _handler,
          ),
        ]
      ),
    );
  }
}

class Child1 extends StatelessWidget {
  const Children({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: null,
    );
  }
}


class Child2 extends StatelessWidget {
  const Children({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: null,
    );
  }
}

```

這樣就能讓 `Child1` 及 `Child2` 這兩個 Widget 共享 `_active` 這個狀態，但相信大家在實際專案中並不會單純使用`setState`在管理狀態，畢竟當狀態及Widget 一多會變得十分麻煩，而且如果某個狀態不只需要傳一層 Widget 時你必須在期間每層的 Widget 的參數都放入這個狀態，這將會讓我們更難管理狀態。

### 依賴注入
那所以這跟「依賴注入」有什麼關係 ？在 Flutter 裡我們 Widget 結構通常都是非常巢狀的，意味著如果我們 Widget 拆得愈細，我們就要在愈多Widget 的參數寫入要傳遞的狀態。那有沒有可能不管隔了多少層 Widget ，而且也不想要中間的 Widget constructor 都要傳入狀態，我只想要在我需要用的時候再將狀態取出來就好？

只在需要「依賴」的時候才「注入」到 Widget 裡

而這也是大多數 Flutter 文章裡提到「依賴注入」最主要想解決的問題：「從深層widget 取出上層的依賴」，以 provider 這個套件舉例，它取出依賴的方法大概長這樣：

```dart
int data = Provider.of<int>(context);
```

而在其他套件的實作中多半會有一個 `of()` 或者類似的方法來取得上層的依賴，至於`of()` 裡是不是`BuildContext`，就是看各library的實作了。至於是不是依賴於`BuildContext` 有什麼差，就要牽扯到`BuildContext` 這個坑了以後有機會再來填。

### 結論

其實跟我們上篇文章在講得這麼久的DI、IoC、DIP沒有太大關係，甚至有時會在reddit上看到有人在爭吵有些被稱為「依賴注入」的套件不是 DI 而是另一種pattern 「service locator 」，至於「service locator」是什麼或者如何實現我就沒有特別研究了。

