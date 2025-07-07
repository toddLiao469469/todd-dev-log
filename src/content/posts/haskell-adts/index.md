---
title: "Haskell 從入門到放棄 - Algebraic Data Types"
published: 2025-07-09T12:00:00.000+08:00
updated: 2025-07-09T12:00:00.000+08:00
image: ./cover.jpg
coverStyle: "TOP"
category: "Haskell 從入門到放棄"
series_title: "Haskell 從入門到放棄"
tags: ["Haskell", "FP"]
---

## Tuple

在介紹 Algebraic Data Types (ADTs) 前我覺得先知道 Tuple ，可能會更好理解為什麼會需要 ADTs ，或者 ADTs 在哪些場景更好用。

跟大部分語言的 Tuple 一樣就是可以把多種資料型態塞進一個容器來表示資料的型別，像是 `("Todd",100,True)` 他的型別就是 `(String,Num,Bool)`。

那如果是要描述一個三角形可能會是這樣 `(Double, Double, Double)` ，

### 基本操作

跟其他型別一樣 Haskell 也為 Tuple 提供了幾個好用的 function

`fst` 可以回傳的首項

```haskell
fst ("Todd",False) -- "Todd"
```

`snd` 可以回傳的尾項

```haskell
snd ("Todd",False) -- False
```

`zip` 可以把兩個 List 組成一個 list of tuple 。

```haskell
zip [1..3] [True,True,True] -- [(1,True),(2,True),(3,True)]
```

那如果兩個 List 長度不一樣呢？

```haskell
zip [1..] [True,True,True,True,True]
-- [(1,True),(2,True),(3,True),(4,True),(5,True)]

zip [1..] ['A'..'Z']
-- [(1,'A'),(2,'B'),(3,'C'),(4,'D'),(5,'E'),(6,'F'),(7,'G'),(8,'H'),(9,'I'),(10,'J'),(11,'K'),(12,'L'),(13,'M'),(14,'N'),(15,'O'),(16,'P'),(17,'Q'),(18,'R'),(19,'S'),(20,'T'),(21,'U'),(22,'V'),(23,'W'),(24,'X'),(25,'Y'),(26,'Z')]
```

會發現主要是會根據短的 List 去匹配。

### 稍微進階一點點

當然我們可以把之前介紹過語法拿來跟 tuple 一起使用，像是我們用來產生描述等腰三角形的 List

```haskell
[ (a,b,c) | c <- [1..10], b <- [1..c], a <- [1..b], a==b || a==c || b==c ]
```

也可以利用 pattern matching ，來匹配對應的元素

```haskell
triangleType :: (Double, Double, Double) -> String
triangleType (a, b, c)
    | a == b && b == c = "Equilateral"
    | a == b || b == c || a == c = "Isosceles"
    | otherwise = "Isosceles"

```

這邊可以看到 我們用 `(a,b,c)` 可以分別匹配到這個 tuple 的第一二三項

昨天我們說到可以使用 tuple `(Double, Double, Double)` 用三個 double 來表示三角形的三邊長。

但我們使用 tuple 來描述的話我們是根據位置來決定這個 field 的定義，所以假設我們是要來描述三角形 `t` 那可能會是長這樣

```haskell
t = (3.0,4.0,5.0)
```

我們沒辦法直覺地想說哪個值代表哪一個邊，而且如果今天剛好出現一個也是 `(Double, Double, Double)` 的數值時我也無法確定這個 tuple 到底是指什麼東西，像是如果今天我要描述一個三維座標系統上的某一個點也許也會是 `(Double, Double, Double)` 。

那有其他方法可以幫助我們解決這個問題嗎？沒錯，就是 Algebraic Data Types。

# Product type

所謂 product type 簡單來說就是多個型態結合在一起的型別，我們需要使用一個新的語法 `data`來定義一個 data type

```
data Triangle = Triangle Double Double Double deriving (Show,Eq)
data Point = Point Double Double Double deriving (Show,Eq)
```

以 `Triangle` 為例，`=` 左邊就是我們要定義一個 data type 的語法 `data typeName` ，`=` 右邊就是 constructor 及這個建構這個 data type 所需要的 type

至於 `deriving (Show,Eq)` 現在我們只要知道他是能讓我將這個 data type 也屬於 `Show` type class 中的一員方便我們輸出結果及比較用。

使用起來會像是

```haskell
t0 =  Triangle 1.0 2.0 2.0
t1 =  Triangle 1.0 2.0 2.0
t2 =  Triangle 2.0 2.0 3.0

t0 -- Triangle 1.0 2.0 2.0
t1 -- Triangle 1.0 2.0 2.0
t2 -- Triangle 2.0 2.0 3.0

t0 == t1 -- True
t0 == t2 -- False

p0 = Point 1.0 2.0 2.0
p1 = Point 1.0 2.0 2.0
p1 = Point 2.0 2.0 3.0

p0 -- Point 1.0 2.0 2.0
p1 -- Point 1.0 2.0 2.0
p2 -- Point 2.0 2.0 3.0

p0 == p1 -- True
p0 == p2 -- False
```

那如果我們拿 `p0` 與 `t0` 比較呢？

```haskell
p0 == t0

<interactive>:174:7: error:
    • Couldn't match expected type ‘Point’ with actual type ‘Triangle’
    • In the second argument of ‘(==)’, namely ‘t0’
      In the expression: p0 == t0
      In an equation for ‘it’: it = p0 == t0
```

編譯器會告訴我們 `Point` 無法 match 到 `Triangle` ，雖然就數值上他們都是 `1.0 2.0 3.0` 但是因為他們的 type 不一樣，這也是 data type 的好處因為如果換作是 tuple 的話，他們會是相等的

```haskell
(1.0,1.0) == (1.0,1.0)
```

之所以 叫做 product type 是因為這個 type 的可能性剛好是各個 field 的 type 的可能性相乘的結果

```haskell
data Foo = Foo Bool Bool
```

`Bool` 只有 `True` 或者 `False` 所以 `Foo` 窮舉後只會有 2\*2 的可能性

```haskell
Foo True True
Foo True False
Foo False False
Foo False True
```

# Record Syntax

雖然上面的範例可以解決我們就算數值一樣也不能代表兩個變數是一樣的，但我們還是很難一眼知道各欄位所代表的意義，所以 Haskell 提供了 record syntax

```haskell
data  Triangle' = Triangle  {
    ab :: Double,
    bc :: Double,
    ca :: Double
} deriving (Show)

let t0' = Triangle' 1.0 2.0 3.0
print $ Triangle' {ab = 1.0, bc = 2.0, ca = 3.0}
-- Triangle' {ab = 1.0, bc = 2.0, ca = 3.0}

```

這樣我們就能很簡單的看出這個 data type 的欄位是什麼了，稍微提醒一下就算我們使用了 record syntax 其實也是屬於 product type 哦。

# Sum Type

我們先來看一下 `Bool` 在 Haskell 是如何被定義的

```haskell
data Bool = False | True deriving  (Read, Show, Eq, Ord, Enum, Bounded)
```

這裡會看到 `False` 跟 `True` 中間不是空格而是 `|` ，其實就跟 or 的概念有點像，也就代表 `Bool` 不是 `False` 就是 `True` ，這種非 a type 不然就是 b type 的形式就很適合使用 sum type 來實現。

那至於為什麼是 sum ，很明顯的因為他不是 `True` 不然就是 `False` 總共是 1 + 1 種可能的狀態，所以被稱為 sum type

# 稍微組合一下

那假設我們想要表示一個 data type 叫做 `Shape` 且它包含了三角形與四邊形，我們可以這樣定義

```haskell
data Shape = Triangle Double Double Double | Rectangle Double Double Double Double deriving (Show)
```

我們可以將 sum type 與 product type 輕鬆地組合起來

使用起來會像是這樣

```haskell
t = Triangle 1.0 2.0 2.0
r = Rectangle 1.0 1.0 1.0 1.0

t -- Triangle 1.0 2.0 2.0
r -- Rectangle 1.0 1.0 1.0 1.0

:t t -- t :: Shape
:r r -- r :: Shape
```

看起來就跟我們分開定義 product type 一樣直到最後的 `:t` ，雖然他們分別是用 `Triangle` 跟 `Rectangle` 這兩個不一樣的 value constructor 建造出來，但他們依然屬於同一個 type `Shape` ，那知道這點之後我們可以怎麼運用？

舉個例子，假設我們想要寫出一個 function 是計算 `Shape` 的周長的話可以利用 `Shape` 來限制這個 function type。

```haskell
surface :: Shape -> Double
surface (Triangle a b c) = a + b + c
surface (Rectangle a b c d) = a + b + c + d

print $ surface $ Triangle 3.0 4.0 5.0 -- 12.0
print $ surface $ Rectangle 4.0 4.0 4.0 4.0 -- 16.0
```

會看到我們這個 function 的 type 既不是 `Triangle` 也不是 `Rectangle` 或者該說是什麼都不重要只要知道是 `Shape` 就好，至於遇到 `Triangle` 或者 `Rectangle` 該怎麼計算就交給 pattern matching 。

會發現 sum type 配合 pattern matching 十分的舒服，我只要匹配到是 `Triangle` ，我就知道我要怎麼做。

# Type Parameter

就是利用做為參數的 type 藉此來產生一個新的 type 。我們從 Haskell 內建的一個 type 來看

```haskell
data Maybe a = Nothing | Just a
```

這裡的 `a` 就是就是所謂的 type parameter，也就是我們之前很常看到的 `Num a => a` 裡面的 `a` 是一樣的意思。

用起來會像是這樣

```haskell

parseToInt :: String -> Maybe Int
parseToInt str =
  case reads str of
    [(x, "")] -> Just x
    _         -> Nothing

main :: IO ()
main = do
  putStrLn "input a integer:"
  input <- getLine
  case parseToInt input of
    Just num -> putStrLn $ "output " ++ show num
    Nothing  -> putStrLn "invalid input"
```

簡單來說我們傳入一個 `Int` 給 `Maybe a` 讓它成為 `Maybe Int` **這個新的** **type** 。

先忽略還沒介紹的語法的話，我們主要的重點會是在 `parseToInt :: String -> Maybe Int` 以及 `case parseToInt input of` 及後面的兩行 pattern matching 。

首先我們實作一個 function `parseToInt` 來作為將輸入的字串轉為 `Int` 這件事情，但我們無法保證使用者一定會輸入 `Int` 所以我們只能先使用 `Maybe Int` 然後根據使用者的輸入而回傳 `Just x` 或者 `Nothing` 。

之後在利用 pattern matching 如果是匹配到 `Just num` 那我們當然就能直接輸出這個數字，而且我們也能匹配到使用者錯誤的輸入。

# **Recursive Data Type**

我們除了裡用 product 或者 sum 來組成的我們 type 以外，還可以使用 recursive 的概念來定義 type，簡單來說就是一個 type 的定義包含他自己本身。

從一個我們最常見的 List 來看，還記得 `[1,2,3,4,5]` 其實只是 `1:2:3:4:5:[]` 的語法糖，所以其實我們可以說 List 是一個要馬是空的不然就是有一個值的 type。

```haskell
data List = Empty | Cons Int List deriving(Show)
```

那我們使用 `Cons` 這個 value constructor 時大概會像是這樣

```haskell
lt1 = Cons 1 Empty
:t lt -- lt :: List

lt2 = Cons 2 lt
lt2 -- Cons 2 ( Cons 1 Empty)
:t lt2 -- lt2 :: List

lt3 = 3 `Cons` lt2
lt3 -- Cons 3 (Cons 2 (Cons 1 Empty))
:t lt3 -- lt3 :: List

lt' = 1 `Cons` Empty
lt' -- Cons 1 Empty
:t lt' -- lt' :: List
```

會發現大致上就跟 list 的 `:` 很像，還記得 `[1,2,3]` 跟 `1:2:3:[]` 是同一回事，就如同我們上面先從 `Cons 1 Empty` 開始串接。

而且我們一樣也可以用 infix 的呼叫方式 `1` Cons `Empty` 讓這個我們重新實作的 `List` 更趨近於原生的 list 。

再更進階點我們能指定特殊字元來當作我們的 value constructor

```haskell
infixr 5 :!
data List' = Empty' | Int :! List' deriving (Show)
```

這裡會看到新的關鍵字 `infixr` 這種語法被稱為 fixity 宣告，當我們需要將 function 定義成 operator 且需要改變優先權的時候就會使用到它，而 fixity 的宣告有三種 `infixl`、`infix`、`infixr` 分別代表左結合、無結合、右結合，而旁邊的數字 `5` 則是代表優先權。

就像原本的 `*` 、`+` 這些 operator 一樣，他們也有優先權之分，像是我們都知道 `*` 比 `+` 更優先所以 `3 * 3 + 3` 就是等同於 `(3 * 3) + 3` 。

那我們也能用 `:info` 來看一下我們常見的 operator 的資訊

```haskell
:info :
type [] :: * -> *
data [] a = ... | a : [a]
      -- Defined in ‘GHC.Types’
infixr 5 :
```

```haskell
:info +
type Num :: * -> Constraint
class Num a where
  (+) :: a -> a -> a
  ...
      -- Defined in ‘GHC.Num’
infixl 6 +
```

這邊告訴我們大致告訴我們 `:` 及 `+` 怎麼使用、優先級、適用的 type 。

回到我們的 `List'` ，我們已經用了 `:!` 來當作我們的 value constructor 所以程式碼就會變成

```haskell
lt1' = 1 :! Empty'
lt2' = 2 :! lt1'
lt3' = 3 :! lt2'

lt1' -- 1 :! Empty'
lt2' -- 2 :! (1 :! Empty')
lt3' -- 3 :! (2 :! (1 :! Empty'))
```

會看到我們原本的 `Cons` 都已經變成 `:!` 看起來舒服許多。

那既然 `+` 、`*` 這些 operator 也是 function ，而且現在我們也知道我們自己定義 operator ，那我們是不是可以自己創造來類似 `++` 的 operator 串接 `List'` ？

沒錯當然可以，而且在 Haskell 實作起來也相當簡單

```haskell
infixr 5  .++
(.++) :: List' -> List' -> List'
Empty' .++ ys = ys
(x :! xs) .++ ys = x :! (xs .++ ys)
```

我們就把他設計的跟 `++` 很像，首先看到我們定義 `.++` 的 fixity 為 `infixr 5` ，以及 `(.++)` 這個 function 的 type 是 `(.++) :: List' -> List' -> List'` ，也就是他接受兩個 `List'` 並最後回傳一個 `List'` 。

再來就是 pattern matching 的部分，首先我們說如果`Empty'` 與 `ys` 進行 `.++` 也就是會回傳 `ys`

`(x :! xs) .++ ys = x :! (xs .++ ys)` ，這邊就是運用到遞迴的概念，如果匹配到 `x:! xs` 及 `ys` 的形式時，就是將 `x` 使用 `:!` value constructor 塞進 `xs .++ ys` 然後不斷遞迴直到最後一個與 `Empty'` 進行 `.++` 運算

```haskell
lt1' .++ lt2' -- 1 :! (2 :! (1 :! Empty'))
```
