---
title: "2021的年中回顧"
description: "今年也過了一半，是時候來回顧一下這半年自己做了哪些事。"
published: 2021-06-30
image: "./cover.webp"
category: "回顧"
---

### Web 技術

工作一陣子後開始覺得自己的基礎不太穩，開始研究一些以前沒有特別清楚的基礎概念像是：event loop、React Fiber、Hook 的實作。
然後像是一些 react 常用的 pattern：一直不太熟悉該如何去使用 render props。今年漸漸地讀懂這類的寫法及好用的地方：

```jsx
/// showLineNumber
<ComponentA>{(val) => <ComponentB someProp={val} />}</ComponentA>
```

除了開發中分離程式碼外有些第三方套件也用這類形式像是：antd 的 form item 在某些複雜情況必須使用 render props 將 fieldValue 注入進去。

因為團隊的專案中使用了**Apollo（GraphQL framework）**所以較少使用到狀態管理套件。這也導致在平常較少查閱這類的文章，但還是稍微關注了一下新興的狀態管理的套件，特別是 recoil 及 Jōtai 這類 atomic 形式的狀態管理插件。當然在實作上兩者還是些許差異：如何判斷 atom 更新、如何更新 atom 之類的。

也開始閱讀一些開源項目的程式碼，上半年主要都是看專案常用的 ant-design，其中的 form 的設計讓我覺得還蠻有趣且蠻受益的，畢竟在工作上 antd 我常卡在複雜 form field 的資料結構的設計以及與較為複雜客製互動元件的 validate 與 form filed value 之間的轉換。

### Flutter

這上半年最大的嘗試就是開始撰寫 Flutter 了吧。剛好前陣子 Flutter community 有一個 30DaysOfFlutter 的活動，就藉此開始學習這項技術。

先說一下我對於 flutter 的看法，我認為這是對於前端工程師來說是一個跨足到 App 開發的好機會，因為 Flutter 主要是使用 Dart 撰寫，而 Dart 一開始也是 Google 打算開發來取代 JS 的語言，所以某種程度上跟 JS 有一定的相似。

對我而言最不適應的應該是 Dart 是一個相對於 JS 來說是一個還蠻物件導向(附註\*)的語言。對於比較偏好 Functional programing 且主要以 JS 來開發的我來說即使 JS 擁有 `Class` 的語法糖，基本上我依然跟物件導向的概念沒有太多的交集，跟甚至是 JS 不會碰到 `abstract classes`、`mixins`等。

就算如此我還是覺得 Dart 是一個相當不錯的語言，有一些我覺得很棒的特性：強型別、支援 `higher-order-function`、`future`、`async/await` 的概念。

特別說一下強型別，對於 JS 開發者來說我想 `undefined` 的 runtime 錯誤應該是永遠的痛吧。雖然團隊是有用 TS 作為開發所以對於型別是有一定的保障。
但還是有一些小不足，像是對於某些 libary 的型別推斷並不夠令人滿意（特別是我們很愛用的 ramda ）

至於 `HOF`、`prmoise（future）`及 `async/await` 等等 JS 擁有的東西就不多說了，總之開發起來還是相對有親切感的。

但也因為 flutter，讓我有動力補足以前在學校時沒好好學的 OOP。
我覺得對於前端工程師來說 OOP 真的是比較少接觸的概念。我自己認為原因會是 Declarative 的形式非常適合前端，特別是在撰寫 UI 上，而且也因為 prototype based 還是有那麼一點不直觀，進而導致 FP 變成前端近幾年的顯學。  
但 Declarative UI 這點也可以從 flutter 的設計理念看到，至於這種風格之所以特別適合 UI 使用，我覺得原因是：
其實我們根本不關心 **「某個 Widget 要如何變成某個樣子 」**
我們只在意 **「Widget 要變成某個樣子」**

```dart
/// showLineNumber
Widget.setColor(color);
Widget.setWidth(width);
Widget.setHeight(height);
Widget.setOnClick(handleClick);
Widget(
 color:color,
 width:width,
 height:height,
 onClick:handleClick
);
```

兩者的差異大概是會像上面那樣，用這種形式我猜測最大的好處可能會是，如果我們用一堆`setXXX`後續補上關於這個 Widget 的敘述，但我們也許要將這些`setXXX`全部放在某個生命週期的 callback，讓 widget 在 mount 或者 update 時可以再次將這個 Widget 描繪出來。

總而言之開發 Flutter 可以同時體會到兩種程式設計風格，這還不夠香嗎？

### 關於去年訂下的目標

這半年對於 Rust 並沒有太多研究，一來是因為工作的關係有在開發 Flutter 也導致上半年的學習重心都放在 Flutter，再來是可能因為是沒有特別有興趣的應用也讓我覺得並沒有那麼想要迫切學習 Rust。

還有不在目標裡但一直都想接觸的 RxJS 也因為對於 FP 有比較多的理解再加上 Dart 很常用到 stream 或者其他類似於 observer pattern 的概念讓我偶而看到一些 RxJS 的文章時有辦法理解。

雖然看似學的很雜但工作一年多發現**「所有的道路匯聚到同一個座標上」**，各種程式語言中總是有辦法找到一樣的概念。

---

附註\*：雖然 JS 也是在「物件導向語言」的範疇中，但我覺得 prototype based 還是沒有那麽「物件導向」，但也就是一個感覺問題。但也有可能我沒有徹底了解過 OOP 才會有這種感覺。
