---
title: "Haskell 從入門到放棄 - List"

published: 2024-09-16T00:00:00.000+08:00
updated: 2024-09-16T00:00:00.000+08:00
image: ./cover.jpg
coverStyle: "TOP"
category: "Haskell 從入門到放棄"
series_title: "Haskell 從入門到放棄"
tags: ["Haskell", "FP"]
---

## 基本操作

在 Haskell 中 List 的宣告方式為

```haskell
x = [1,2,3,4,5,6,7]
```

在 Haskell 中 List 中每個元素只能是同樣型別

```haskell
-- ⭕️
[1,2,3,4,5,6]
['a','b','c']

-- ❌
[1,2,'c',4,'a',6]
[1,'b','c']
```

有一個比較重要的概念是**在 Haskell 中 `String` 與 `[Char]` 是相等的**，也就是說`"abc"` 以及 `['a','b','c']` 是一樣的東西

```haskell
['a','b','c'] == "abc" -- True
```

### 常用運算子

```haskell
[1,2,3,4] ++ [5,6] -- [1,2,3,4,5,6]
['a','b'] ++ ['c']  -- "abc"
"ab" ++ "c" -- "abc"
```

在使用 `++` 要特別注意的是他是會將左邊運算元遍歷過一次，所以如果左邊是一個很長的 List 的話必須小心使用。

而在 List 前面塞入一個元素可以使用 `:`

```haskell
'a' : "bc" -- "abc"
1 : [2,3,4] -- [1,2,3,4]
```

特別注意一下這裡是 `'a'` 而不是 `"a"` 差異為一個是 `Char` 與 `[Char]` (`String`)

我們也可以一直使用 `:` 來組成一個 List

```haskell
'f' : 'o' : 'o' : [] -- "foo"
0 : 1 : 2 : [] -- [0,1,2]
```

其實 Haskell 在建立 List 時就是不斷遞迴用 `:` 把左邊運算子不斷的塞入來建立出 List 的，所以`[0,1,2]` 實際上就是 `0 : 1 : 2 : []` 的語法糖。

如果我們要存取特定的元素的話我們能用 `!!`

```haskell
[1,2,3,4,5,6] !! 0 -- 1

"abc" !! 0 -- 'a'
"abc" !! 1 -- 'b'
```

### 常用 function

Haskell 有提供四個比較基礎的 function 來讓我們取得 List 的頭尾

```haskell
x = [1,2,3,4,5,6]
head x -- 1
tail x -- [2,3,4,5,6]
last x -- 6
init x -- [1,2,3,4,5]
```

`head` 會回傳 List 中第一個元素

`tail` 會回傳扣除第一個元素後的 List

`last` 會回傳 List 的最後一個元素

`init` 會回傳扣除最後一個元素後的 List

有這些我們就能夠來寫出一個簡單小 function 來操作 List

```haskell

listSum :: [Int] -> Int
listSum x = if null x then 0 else head x + listSum (tail x)

main :: IO ()
main = do
  let x = [1,2,3,4,5,6,7,8,9,10]
  putStrLn (show(listSum x))
```

這裡我們使用了 `head` 及 `tail` 協助我們加總 List 中的所有元素，`listSum` 解釋起來就是當 `x` 不為 null 時就會將 `x` 的第一個元素與`listSum (tail x)` 相加。

沒錯就是使用 recursive ，因為在 Haskell 中所有 variable 都是 immutable 的所以我們寫不出像 js 這樣的程式碼

```javascript
// in js
a = 0;
list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
list.forEach((x) => {
  a += x;
});
```

當然 Haskell 還是有提供一些基本的 List 操作

```haskell
length [1,2,3,4,5] -- 5
reverse [1,2,3,4,5] -- [5,4,3,2,1]
take 2 [1,2,3,4,5] -- [1,2]
maximum [1,2,3,4,5] -- 5
minimum [1,2,3,4,5] -- 1
product [1,2,3,4,5] -- 120
sum [1,2,3,4,5] -- 15
elem 4 [1,2,3,4,5] -- True
```

`length` 會回傳 List 長度

`take` 會根據根據傳入的長度及 List 回傳一個新的 List

`reverse` 會回傳一個反轉的 List

`maximum` 回傳 List 中最大的數

`minimum` 回傳 List 中最小的數

`sum` List 所有元素的加總

`product` List 所有元素的乘積

`elem` 判斷該元素是否屬於該 List

## 稍微進階一下

當然我們要建立一個 List 不一定每次都要直接寫出所有的元素

```haskell
x = [1,2,3,4]
```

我們可使用 `..` 來幫我快速建立一個 List

```haskell
[1..10] -- [1,2,3,4,5,6,7,8,9,10]
['a'..'z']  -- "abcdefghijklmnopqrstuvwxyz"
```

這種方式稱為 **range** ，而能夠使用 range 來建立 List 那個值本身必須是可以被枚舉的，像是 A 到 Z，1 到 10。

那我們也能限制 range 所產生的元素之間的距離，只要多放一個元素且標註上限就好

```haskell
[2,4..20] -- [2,4,6,8,10,12,14,16,18,20]
[5,10..49] -- [5,10,15,20,25,30,35,40,45]
```

那如果我們不限制 range 上限呢？那我們就可以產生出一個**無限**的 List 。

```haskell
[1..] -- 這會產生一個無限 List 如果要在 ghci 停止請使用 command+c 來停止
```

所以假設我們今天想產生前 10 個 3 的倍數，我們除了直接標註上限是 `3*10` 以外，我們也可以利用 `take` 加上無限 List 來幫助我們達成這個需求

```haskell
[3,6..3*10]
take 3 [3,6..]
--[3,6,9,12,15,18,21,24,27,30]
```

除了使用 range 我們也可以用 `cycle` 以及 `repeat` 來產生無限 List

```haskell
take 5 (cycle "abc") -- "abcab"
take 5 (repeat 'a') -- "aaaaa"

-- 上面的 repeat 的寫法可以使用 replicate 簡化
replicate 5 'a' -- "aaaaa"
```

## List Comprehension

所謂的 List comprehension 就是我們可以用一些符號來描述一個 List，類似在數學上的我們想要說明一個集合是偶數的話我們會說

```
{ x | x=2k , k∈N }
```

那如果我們要在 Haskell 描述一個偶數 List

```haskell
[ x*2 | x <- [1..]]
```

可以看出來我們一樣只要說明元素的如何產生以及範圍就好，這裡說明了每個元素都是 `x*2` 且 `x`的範圍是從 1 開始的無限 List

所以如果我們想要產生前 10 個 3 的倍數的話

```haskell
[x*3 | x <- [1..10]]
-- [3,6,9,12,15,18,21,24,27,30]
```

### 限制條件

當然 List comprehension 不只如此，假設我們今天條件更刁鑽了，例如：我想要前 10 個 3 的倍數但又不行是偶數呢？

```haskell
[x*3 | x <- [1..10], x `mod` 2 /=0 ]
-- [3,9,15,21,27]

```

我們只要在後面加上限制條件，`x`mod `2 /= 0` 就好了

> `/=` 就是不等於， `` `mod` `` 的 ` `` `是把 function 變成 infix 的用法

那假設我想要把一個 List 大於 10 的數字 `+1` 小於 10 的 `*2` 且為 3 的倍數要丟掉呢？

```haskell
foo  l = [if x>10 then x+1 else x*2 | x <- l , x `mod` 3 /= 0]

foo [1..20]
-- [2,4,8,10,14,16,20,12,14,15,17,18,20,21]
```

除此之外 List comprehension 也支援多個變數跟多個條件，像是生成一個 List 它是由`x` 及 `y` 的乘積，但`x`的範圍為 1 到 5，`y`的範圍為 6 到 10，且 `x+y` 還不能是 5 的倍數

```haskell
[x*y | x<-[1..5],y<-[6..10], (x+y) `mod` 5 /= 0]
```

### 字串處理

還記得字串也是一種 List 嗎？ 所以 List Comprehension 理所當然的能夠用來生成字串或者處理字串。

像是我想要將一個 List 全部轉為小寫或者濾出這個 List 的小寫字母

```haskell
[toLower x| x <- "asdqwAsdcqAsdasd" ]
[x| x <- "asdqwAsdcqAsdasd" , x `elem` ['a'..'z']]
```

或者找出合法的 email

```haskell
emailList = ["toddliao.dev@gmail.com","toddliao.dev","todd"]

[email | email <- emailList, '@' `elem` email && '.' `elem`  email ]
--  ["toddliao.dev@gmail.com"]
```

這邊的限制條件就是說 `@` 及 `.` 都要存在於 `email` 裡面。

> 就只是簡單的驗證，當然光是這些條件不足以說明屬於 email 的格式
