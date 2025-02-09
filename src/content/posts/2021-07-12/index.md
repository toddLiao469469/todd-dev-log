---
title: "轉生成為Flutter工程師 - 01 | 依賴注入到底是什麼(上)？"
description: "一個不熟OOP的 React 前端工程師如何看待依賴注入"
published: 2021-07-12
category: "轉生成為Flutter工程師"
tags: ["Flutter", "OOP"]
---

### 前言

上半年大部分時間都花在學習 Flutter，覺得可以把這半年所接觸到的東西整理起來，除了能夠建立起自己的學習筆記供未來的自己參考外，也希望能幫助到跟我一樣剛好對 Flutter 有興趣想瞭解看看的菜鳥前端工程師，因此開始撰寫這個「轉生成為 Flutter 工程師」這系列文

眾所周知 Dart 是一個有支援 OOP 的程式語言，因此讓我開始學習了許多 OOP 的概念，其中依賴注入（dependency injection, DI）是早在剛開始工作的菜鳥時期就常常聽到的名詞，但實際上我並沒有特別的了解或刻意的去實作這個 pattern 但其實大家可能已經默默的用過 DI，只是自己不知道自己在做的事情是 DI。

這篇文會提到的：

- 簡單描述為什麼需要依賴注入及依賴注入到底是什麼
- 網頁前端中的類似概念

這篇文不會提到：

- 依賴注入的 Best practice
- 依賴注入與其他 pattern 的比較
- 依賴注入的框架／plugin
- 本文所使用的程式碼沒有特別標注即是 Dart 2.13（null safety）

### 依賴？

說明「依賴注入」之前，我們必須先來說說到底什麼是依賴，有依賴的話會發生什麼事？假設今天我們有兩個 `Class` 分別為 `Todd` 及 `MRT` 來表示我及我使用的交通工具：

```dart
/// showLineNumber
class Todd {
  late MRT transportation;

  Todd() {
    this.transportation = MRT();
  }
  void commute() {
    transportation.go();
  }
}

class MRT {
  void go(){}
}

```

我在 `Todd` 的 **constructor function** 裡宣告我的交通工具是 `MRT` ，並且宣告我去辦公室方式是使用 `MRT` 的 `go()`，這時候就可以說：

> Todd 依賴於 MRT

那如果我之後想改搭公車呢？又或者是今天 MRT 及 Todd 的隨著時間過去，兩個類別的內部實作變得愈來愈複雜時，這個依賴可能會導致我改了 A 但是 B 壞掉的情況發生。

### 依賴反轉

熟悉 OOP 的人應該會知道利用 SOLID 中的依賴反轉原則（ Dependency inversion principle）來讓 `Todd` 不再依賴 `MRT` 而是同時依賴於一個抽象使這兩個類別解耦。

```dart
/// showLineNumber
abstract class Transportation {
  void go() {}
}

class MRT implements Transportation {
  void go() {}
}

class Bus implements Transportation {
  void go() {}
}

class Ubike implements Transportation {
  void go() {}
}

```

這樣做的好處是什麼？如果 `MRT` 跟 `Todd` 是不同人甚至不同團隊開發時，這時候只要先定義好這個介面就好，開發 `Todd` 類別的人不用先知道 `go()` 內部的實作也能繼續開發他的程式。

但即使這樣我還是得在 `Todd` 裡實例化 `MRT` 這個類別，我要更換交通工具時還是得更改 Todd 的實作並沒有辦法動態的控制，那到底要怎麼做才能 `Todd` 自由選擇交通工具呢？

### 依賴注入？或者可以先說說控制權反轉

為什麼又突然跑出一個名詞？什麼是控制權反轉（Inversion of Contr,IoC）？跟依賴注入到底有什麼關係？

先說結論

> 之所以要依賴注入就是為了控制權反轉

回到我們已經使用抽象類的 `Todd` 類別

```dart
/// showLineNumber
class Todd {
  late Transportation transportation;

  Todd() {
    this.transportation = MRT();
  }

  void commute() {
    transportation.go();
  }
}
```

如同前面所說我們現在還是得在 `Todd` 實例化 `MRT` ，畢竟我們無法實例化一個抽象類。但我們已經將 Todd 內部的控制權慢慢釋放出去了，一開始我們的 `commute()` 是直接使用 `MRT.go()` 而現在我們是使用一個抽象類的 `go()` 。

`Todd` 內部 method 的實作已經不需要管`go()`到底是哪個類別的了，也就是說`Todd`在運行時不再需要主動尋找 `MRT` 這個類別而是被動的等待 transportation，決定這個實作類別控制權已經從內部轉向外部了，這已經可以說是類似於控制權反轉概念了

### 依賴注入

講了那麼多終於要到今天的主題依賴注入

```dart
/// showLineNumber
class Todd {
  late Transportation transportation;

  Todd({required this.transportation});


  void commute() {
    transportation.go();
  }
}

void main() {
  final todd1 = Todd(transportation: MRT());
  final todd2 = Todd(transportation: Bus());
}

```

對，就是這麼簡單，依賴注入就是這樣。

在 constructor 的參數放入我們所依賴的類別，也就是我們將「依賴」從外部「注入」進而讓 `Todd` 裡並不需要實例化另外一個類別。同時這也代表：

> transportation 實例化的地方從`Todd`內部「反轉」到外部

也就像前面所說的

> 之所以要依賴注入就是為了控制權反轉

而我們除了可以經由 constructor 來進行依賴注入也可以使用 setter 將我們所需要的類別傳入。

```dart
/// showLineNumber
class Todd {
  late Transportation transportation;

  Todd();
  void setTransportation(Transportation transportation) {
    this.transportation = transportation;
  }

  void commute() {
    transportation.go();
  }
}

void main() {
  final todd = Todd();
  todd.setTransportation(Bus());
}

```

這兩種注入分別被稱為 **constructor injection** 及 **setter injection** 至於這兩種方式哪個比較好，雖然在軟體設計中如果有多個方案可以選擇時通常都是意味著他們可能適合在不同的場景。但我個人是偏好使用 **constructor injection** ，並沒有那麼喜歡使用 **setter injection**。

如果使用 setter injection 意味著這個依賴是 mutable 的（我們的 transportation 不是用 final 來宣告了）有可能會忘記 set ，導致如果我們直接調用這個依賴的 method 時 IDE 的靜態偵錯應該是查不出來這個依賴沒實例化，而忘記 set 的這個問題要直到 runtime 才會被發現。

我們並無法一眼得知這個類別到底依賴什麼，就必須去查找這個類別所有 setter。
也許 **setter injection** 有更多的彈性或者讓依賴多的時候讓 constructor 不用傳那麼多參數，但如果是這個原因導致我們用 setter 的話也可能代表這個類別做了太多事了吧？

### 網頁前端中的依賴注入

身為一個 React 前端工程師其實也蠻常碰到類似於 DI 的概念。就是在 React 中相當常見的「render props」，我們將原本在 Component 中的元件抽象成是根據 props 來而不是直接在這個 Component 直接寫死，相當等於我們將這個元件的控制權釋放到外面。

一個小例子：我們有一個共用的 Modal Component ，Modal 一定有一些按鈕，當然我們不能直接在 Modal 裡寫死這些按鈕的樣式及文字或者在 Modal 裡面做過多的判斷來產生這個按鈕畢竟按鈕不只一個而且可能會被包在某個 Footer component 中再一起傳入到 Modal。

以下是用 React 實作的小範例

```jsx
const ModelFooterCloseButton = (props) => {
  const { render, modalType } = props;
  switch (modalType) {
    case "A":
      return render("關閉");
    case "B":
      return render("我知道了");
    case "C":
      return render("取消");
    default:
      return render("關閉");
  }
};
```

```jsx
<ModelFooterCloseButton
  key="close"
  modalType={modalType}
  render={(text) => <Button>{text}</Button>}
/>
```

將 modalType 從外面注入後經由判斷產出新的按鈕樣式
但其實 render props 的核心概念比較像是我們讓一個子元件要經過一層 Function 後再傳入，我們就可以將一些很常用的 UI 格式，以這個例子來說就是樣式跟 onClick 都一樣只是文字不一樣，利用這個形式少寫許多 boilerplate code。

但將按鈕的 render 放到外面是不是也有控制權反轉及依賴注入的感覺呢？

### 小結

我們能夠利用依賴注入使程式碼解耦進而增加軟體的可維護性及靈活度，回到一開始的目的之所以學習這些 desigin pattern 就是為了在 Flutter 開發時派上用場，但隨著我在閱讀 Flutter 相關的文章時提到的「依賴注入」感覺又不是那麼一回事，這部分就留到下集說明。
