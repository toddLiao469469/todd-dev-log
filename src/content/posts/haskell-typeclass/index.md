---
title: "Haskell 從入門到放棄 - Typeclass"
published: 2025-11-19T12:00:00.000+08:00
updated: 2025-11-19T12:00:00.000+08:00
image: ./cover.jpg
coverStyle: "TOP"
category: "Haskell 從入門到放棄"
series_title: "Haskell 從入門到放棄"
tags: ["Haskell", "FP"]
---

## Typeclass

讓我們重新回顧一下 typeclass 是什麼，它類似於其他語言中的介面（interface）。Typeclass 提供了一種定義一組類別所需具備的行為和特性的方式，就像 **`Eq`** 這個 typeclass 提供了比較是否相等的行為。

Typeclass 是通過 function 來描述這些行為的，所以當我們將一個 type 定義為這個 typeclass 的實例（instance）時，代表這個 type 具備了 typeclass 所定義的這些 function 的實作，可以使用這些 function 來操作該型別的值。

## 基本用法

### 建立一個屬於 `Eq` typeclass 的 instance

我們可以先來看 `Eq` 是怎麼被定義的

```haskell
class Eq a where
  (==) :: a -> a -> Bool
  (/=) :: a -> a -> Bool
  {-# MINIMAL (==) | (/=) #-}
```

首先我們看到了新語法 `class Eq a where` 代表定義一個 typeclass 叫做 `Eq` 然後 `a` 則是 type parameters 也就代表我們在實作 class 的 instance 時的 type 。

那接下來我們來為 Eq 定義一個新的 instance，首先我們先定義一個新的 data type

```haskell
data Color = Red | Green | Blue
```

在我們不使用 `deriving(Eq)` 的情況下我們就需要手動建造 `Eq` 的 instance

```haskell
instance Eq Color where
    Red == Red = True
    Green == Green = True
    Blue == Blue = True
    _ == _ = False
```

這點可以看到我們用了一個新語法 `instance` 然後接上我們要實作的 typeclass 及 type 。

還記得我們前面 `Eq` 的定義嗎，我們至少需要實作 `==` ，所以我們這邊就將 `Color` 對於 `==` 的實作加上去。

這邊依然是使用 pattern matching 來實作，當我們配對到 `Red == Red` 時那就是 `True` 其他以此類推直到最後 `_ == _` 也就是當任意兩種進行 `==` 運算都會是 `False` 也就是結果來說只要不是匹配到前三種的情況就一定會是 `False` 。

然後我們也可以順便實作 `Show` 的 instance

```haskell
instance Show Color where
    show Red = "Color: Red"
    show Green = "Color: Green"
    show Blue = "Color: Blue"
```

如果我們直接使用`deriving(Show)` 在這個例子就會把 value constructor 直接轉成 `String` ，但我們現在既然是自己實作 instance 我們就可以自己改變一下想輸出的字串，這邊一樣是用 pattern matching 來實作，就是匹配到哪種 value constructor 就回傳對應的字串。

運行起來會像是這樣

```haskell
print $ Red == Red -- True
print $ Red == Green -- False
print $ Red == Blue -- False
print $ Green == Green -- True
print $ Green == Blue -- False
print $ Blue == Blue -- True
print $ show Red -- "Color: Red"
print $ show Green -- "Color: Green"
print $ show Blue -- "Color: Blue"
```

## 建立一個新的 typeclass

就像一開始提到的 typeclass 是用來規範怎樣的類別擁有怎樣行為的，所以我們可以先定義一個行爲是看用來規範一個類別擁有面積計算的邏輯。

```haskell
class HasArea a where
    area :: a -> Double
```

這表示任何一個想要成為 `HasArea` 一員的型別 `a` 必須要擁有 `area` 這個 function，且 `area` 的型別為 `a → Double` 。

那就開始讓我們的 data type 成為 `HasArea` 的 instance

```haskell
data Circle = Circle Double
data Rectangle = Rectangle Double Double

instance HasArea Circle where
    area (Circle r) = pi * r * r

instance HasArea Rectangle where
    area (Rectangle w h) = w * h
```

我們先宣告兩個 data type `Circle` 及 `Rectangle` 分別是需要一個 `Double` 及兩個 `Double` 組成，以及實作他們要符合的 `HasArea` 這個 typeclass 時需要實作的 `area` 。

`instance` 實作的部分就是說明了當 `area` 這個 function 接受到一個 `Circle r` 參數時，回傳值會是 `pi * r * r` 而 `area` 接受到 `Rectangle w h` 則是回傳 `w * h` 。

**沒錯這裡依然是 pattern matching ！**

接著看一下整段程式碼

```haskell
class HasArea a where
    area :: a -> Double

data Circle = Circle Double
data Rectangle = Rectangle Double Double

instance HasArea Circle where
    area (Circle r) = pi * r * r

instance HasArea Rectangle where
    area (Rectangle w h) = w * h

main :: IO ()
main = do
    let myCircle = Circle 10.0
    let myRect   = Rectangle 4.0 5.0
    putStrLn $ "area myCircle: " ++ (show $ area myCircle)
    -- area myCircle: 314.1592653589793
    putStrLn $ "area myRect: " ++ (show $ area myRect)
    -- area myRect: 20.0

```

我們就能透過 `area myCircle` 及 `area myRect` 算出他們的面積了。

### 將 typeclass 作為 function 的型別約束

typeclass 之所以好用除了可以定義共用的行為，它也能拿來我們當作 function 的型別約束

```haskell
reportArea :: (HasArea a) => a -> IO ()
reportArea shape = do
    putStrLn $ "My area is: " ++ (show $ area shape)
```

`reportArea :: (HasArea a) => a -> IO ()` 就說明了 當我有一個符合 `HasArea` 這個型別約束的 `a` 傳入時最後要會傳 `IO ()` ，也因為我們約束了 `a` 所以我們就能夠保證我們可以直接 `area shape` 。

```haskell
reportArea myCircle -- My area is: 314.1592653589793
reportArea myRect -- My area is: 20.0
```

### 組合型別

那我們也可以將我們的 data type 組成 sum type 後讓它去實作 `HasArea` 並且可以 reuse 之前的實作。

```haskell
data Shape = AShapeCircle Circle
           | AShapeRectangle Rectangle

instance HasArea Shape where
    area (AShapeCircle c) = area c
    area (AShapeRectangle r) = area r

totalArea :: [Shape] -> Double
totalArea shapes = sum (map area shapes)
```

這裡 `data Shape` 代表了 `Shape` 不是 `AShapeCircle Circle` 不然就是 `AShapeRectangle Rectangle` 。然後我們就能實作 `HasArea` 這時候一樣是 **patten matching** ，當遇到 `AShapeCircle c` 就是 `area c` 等等。

而我們也能接著延伸這個 data type 的用法，像是宣告一個 function 用來處理 `[Shape]` 的面積加總。因為我們有寫了 `totalArea :: [Shape] -> Double` 所以我們就能確保 `area shapes` 是可以動的。

> 補充說明一下 `map` 的型別是 `(a -> b) -> [a] -> [b]` 所以 `map area shapes` 最後會是一個 `[Double]` ，而 `sum` 對於 `[Double]` 的實作是 `Num a => [a] -> a` 所以最後會回傳一個 `Double` 也就是符合我們一開始的型別簽名 `totalArea :: [Shape] -> Double`

最後整個程式碼為：

```haskell

class HasArea a where
    area :: a -> Double

data Circle = Circle Double
data Rectangle = Rectangle Double Double

instance HasArea Circle where
    area (Circle r) = pi * r * r

instance HasArea Rectangle where
    area (Rectangle w h) = w * h

reportArea :: (HasArea a) => a -> IO ()
reportArea shape = do
    putStrLn $ "My area is: " ++ (show $ area shape)


data Shape = AShapeCircle Circle
           | AShapeRectangle Rectangle

instance HasArea Shape where
    area (AShapeCircle c) = area c
    area (AShapeRectangle r) = area r

totalArea :: [Shape] -> Double
totalArea shapes = sum (map area shapes)

main :: IO ()
main = do

    let myCircle = Circle 10.0
    let myRect   = Rectangle 4.0 5.0
    putStrLn $ "area myCircle: " ++ (show $ area myCircle)
    -- area myCircle: 314.1592653589793
    putStrLn $ "area myRect: " ++ (show $ area myRect)
    -- area myRect: 20.0

    reportArea myCircle
    reportArea myRect

    let mixedShapes = [ AShapeCircle myCircle
                      , AShapeRectangle myRect
                      , AShapeCircle (Circle 1.0)
                      ]
    let t = totalArea mixedShapes
    putStrLn $ "Total area of all shapes: " ++ (show t)
    -- Total area of all shapes: 337.3008580125691
```

## 總結

- **`class` 像「介面」**：它定義哪些「行為」，也就是說為了成為這個 class 需要擁有哪些行為。
- **`instance` 是「實作」**：它為「特定型別」提供「特定行為」的具體程式碼。
- **`(Class a) =>` 是「約束」**：它向編譯器保證型別 `a` 必定具備該 typeclass 的行為，讓我們能夠寫出通用的 function。

## 參考資料

1. [構造我們自己的 Types 和 Typeclasses | Haskell 趣學指南](https://learnyouahaskell.mno2.org/zh-tw/ch08/build-our-own-type-and-typeclass)
