---
title: "Haskell 從入門到放棄 - 認識 Haskell"
description: "一切都從 expression 說起"
published: 2024-04-26T12:00:00.000+08:00
updated: 2024-04-29T23:42:00.000+08:00
image: ./cover.jpg
category: "Haskell 從入門到放棄"
tags: ["Haskell", "FP"]
---

> Photo by <a href="https://www.pexels.com/photo/close-up-of-a-modern-building-facade-13078441/">Robert Kozakiewicz </a>

## 一切都從 expression 說起

### expression vs statement

在開始介紹 Haskell 的語法之前我想有這個概念應該是對於 Haskell 的學習相當有幫助的，不管你之前是用什麼語言開發都應該會聽過 **expression** 以及 **statement** 這兩個名詞。

以我最常用的 JS 來**簡單解釋**的話，可以用這個段程式碼被執行時有沒有**回傳值**來判斷他是不是 expression 還是 statement 。

```js
3 + 5; // 這是 expression
a[(1, 2, 3, 4)] // 這也是 expression
  .map((x) => x + 1); // 這還是 expression
```

也就是說它可以被拿來放在 `=` 右邊都是 expression

> 雖然我覺得這麼說有點倒果爲因，但至少比較好理解這個概念。

而 statement 就是沒有回傳值，像是 `if` \***\*、`for` 等等控制迴圈及分支流程等等**操作\*\*語法

```js
if (a === 1) {
  // ...
}

for (let i = 0; i <= 10; i++) {
  //..
}
```

所以大概可以說 expression 用來描述這段程式碼「是什麼」而 statement 說明了這段程式碼「做了什麼」。

### 到處都是 expression

那這跟 Haskell 又有什麼關係呢？ **Haskell 是沒有 statement 的，全部都是 expression**

所以你可以在 Haskell 寫出類似這種程式碼：

```hs
let a = 10
let b = if a > 5 then 1 else 0

print a  -- 10
print b  -- 1
```

即使是 `if-then-else` 最後還是回傳一個 expression 的，有了這個概念後對於看到各種語法或者函式的「組合」會比較習慣一點點，大致上可以想成 Haskell 的每一個程式碼片段都是回傳一個值來讓方便你接續處理。

> 即使是像是沒有回傳一個「確切的值」像是 I/O 之類的操作最後也會回傳 monad ，至於什麼是 monad 那就以後再說吧 XD。

## 基本語法

```hs
2 + 2               -- 4
2 - 2               -- 0
3 * 2               -- 6
3 / 2               -- 1.5
True || False       -- True
True && False       -- False
5  == 5             -- True
5  /= 2             -- False
5  >= 2             -- True
5  <= 2             -- False
"hello" == "hello"  -- True
"he" ++ "llo"       -- hello
```

如果是寫習慣 js 的讀者可能會想試試看一下平常寫的語法在 Haskell 運行起來會是怎樣，像是把數字跟布林值一起做邏輯運算：

```hs
0 || True
error:
    • No instance for (Num Bool) arising from the literal ‘0’
    • In the second argument of ‘(||)’, namely ‘0’
      In the expression: True || 0
      In an equation for ‘it’: it = True || 0

```

這裡會編輯器告訴我們  `||`  運算子並不能傳入  `0` ，又因為 Haskell 是一個強型別語言所以並不會自動地幫我轉換數值的型別。

> 但如果詳細一點解釋的話，是因為 `Bool` 本身不是 `Num` 這個 `typeclass` 的 `instance` 所以我們無法把 `0` 作為 `Bool` 來看待。

### 宣告變數

在 Haskell 宣告變數我們只要  `name = expression`  就可以了

```hs
x = 5
x  -- 5

x = 2 + 2
x   -- 4

x = "1" ++ "23"
x  -- "123"

```

### scope

`let`  在 Haskell 中是用來宣告區域變數所使用我們可以搭配  `in`  來限制這個區域變數所在的 scope

這邊為了較好示範先寫一個  `.hs`  檔

> 這個範例只是為了解釋 scope 的差異，所以對於:: 、show、do  等等沒看過的東西各位可以先無視 xD

```hs
a :: Integer
a = 1

b :: Integer
b = 100

main :: IO ()
main = do
  let b = 10
  do
    print ("b = " ++ show b)
  let a = 2
   in do
        print ("a = " ++ show a)
        print ("a + b = " ++ show (a + b))
  print ("a = " ++ show a)
  print ("b = " ++ show b)
  print ("a + b = " ++ show (a + b))

```

從上面的範例我們在最上面宣告了兩個變數`a` 、`b`  然後在  `main`  裏面分別  `let b`  及  `let a`  但直得注意的是一個後面有接  `in`  另一個則沒有。

我們先來看一下這個程式碼的輸出：

```hs
"b = 10"
"a = 2"
"a + b = 12"
"a = 1"
"b = 10"
"a + b = 11"

```

第一個  `print`  很好理解，在  `main`  裡面我就先  `let b = 10`  所以第一個  `print`  是  `10`  而不是最外層的`100`

第二個及第三個  `print`  因為我們  `let a = 2`  所以第二個  `print`  就會是  `2` ，然後因為還是在  `main`  裡面所以  `a+b`  就會是  `12`

剩下的  `print`  因為我們離開  `let a = 2 in ...`  的範圍，所以  `a`  就會是最外面的  `1`  但還是在  `main`  裡面所以  `b`  依然是  `10`  那  `a + b`  就會是  `11`

### Immutable

在 Haskell 中所有變數都是 Immutable 的也就代表這些變數被宣告後就不能被變更了，像是我先宣告了 `a = 1` 之後緊接著 `a = 1000`

```haskell
a :: Integer
a = 1
a = 1000

main :: IO ()
main = do
  print ("a = " ++ show a)
```

```hs
    Multiple declarations of ‘a’
    Declared at: /Users/todd/Desktop/foo/main.hs:2:1
                 /Users/todd/Desktop/foo/main.hs:4:1
  |
4 | a = 10000
  | ^
```

會發現編譯器指出這個錯誤 `Multiple declarations of ‘a’` ，雖然這個 `=` 很像是在其他語言中
用來賦值給某個變數的行為，但實際上在 Haskell 中 `=` 比較像是「定義」的意思，也就是說我不能同時定義「a 是 1 」和「a 是 1000」。

> Haskell 是一個蠻貼近數學概念的語言，所以很多時候就想想數學上的定義及概念來理解或許會更好懂（或更不好懂 XD）

## 簡單地認識 function

在 Haskell 中要宣告一個 function 也很簡單只要  `name args(看有幾個) = expression`

```hs
add x y = x + y
```

使用上也很簡單只要在 function name 後面加上參數就可以呼叫了

```hs

add 5 2 -- 7

x = 10

add x 5 -- 15
```

當然也許第一次看到這種語法時會覺得有一點怪就是好像沒有所謂的**「呼叫 function」** 這件事情，我自己的理解是因為這樣子可以很靈活地操作 function ，又因為在 Haskell 允許 function 可以不用一次傳入所有參數所以我們可以做到這些操作

> 也就是說因為 Haskell 中所有 function 都是 curried function 所以才能這麼做。

```hs
add2 = add 2

add2 10  -- 12

multiplication x y = x * y
multiply2 = multiplication 2

multiply2 10 -- 20
```

### 呼叫的順序

在 Haskell 中我們有許多方式可以調整我們呼叫 function 的位置及順序，以剛剛的例子來說如果想要先 `add2` 再 `multiply2` 的話直覺來看可能會這樣寫

```hs
multiply2 add2 2
```

但這樣子很明顯地會有問題因為這樣子會先把 `add2` 當作參數給 `multiply2` 最後再傳入 `2`

所以 Haskell 還是有提供 `()` 來讓我們調整順序的，也就是把優先級調高讓它們先執行的意思

```hs
multiply2 (add2 2) -- 8
```

但還有看起來更簡潔的表示法

```hs
multiply2 $ add2 2 -- 8
```

而所謂的 `$` 就是把前面的 function 的優先級調為「最低」，以面的例子來說就是讓 `multiply2` 的優先級變為最低所以 `add2` 就會先執行。

參考資料

1. <https://www.haskellforall.com/2013/07/statements-vs-expressions.html>
2. <https://book.realworldhaskell.org/read/getting-started.html>
