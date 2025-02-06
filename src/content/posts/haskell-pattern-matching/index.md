---
title: "Haskell 從入門到放棄 - pattern matching"

published: 2025-01-14T10:00:00.000+08:00
updated: 2025-01-14T10:00:00.000+08:00
image: ./cover.jpg
coverStyle: "TOP"
category: "Haskell 從入門到放棄"
series_title: "Haskell 從入門到放棄"
tags: ["Haskell", "FP"]
---

> Photo by <a href=" https://www.pexels.com/photo/low-angle-shot-of-an-architectural-building-8366656/">Henry & Co.</a>

# Haskell 從入門到放棄 - pattern matching

許多語言都有的概念「pattern matching」，在 Haskell 中我們可以在定義 function 時，直接讓 function 輸入（匹配）到特定值時就給出相應的輸出。

# 基本使用

舉個例子我想寫一個 function ，如果讀到特定字元就輸出特定字串的話我可以這樣寫：

```haskell
word 'a' = "Apple"
word 'b' = "Banana"
word 'c' = "Candy"

word 'a' -- "Apple"
word 'b' -- "Banana"
word 'c' -- "Candy"
```

但如果我們超出我們所規定的 pattern 的話

```haskell
word 'd'
"*** Exception: <interactive>:116:1-18: Non-exhaustive patterns in function word
```

所以通常還是需要定義一個通用的 pattern 這樣才能避免 runtime 的錯誤，可以使用 `_` 來代表「任何值」

```haskell
word _ = "Unknown"

word 'd' -- "Unknown"
```

# 稍微進階一點點

我們也可以用 pattern matching 來達成之前遞迴加總 List 的元素

```haskell
sumList :: [Int] -> Int
sumList [] = 0
sumList (x:xs) = x + sumList xs

print (sumList [1..5]) -- 15
```

我們先定義了`sumList [] = 0` 意思是 `sumList` 的輸入為 `[]` 時會回傳 `0` ，而當輸入不是 `[]` 時就是會到下一行 `sumList (x:xs) = x + sumList xs`

這個 expression 第一次看到時會感到有點疑惑，但只要先記得 `[1,2,3]` 就是 `1:[2:3]` （精確來說是 `1:2:3:[]` ) ，那這邊我們就能用 `(x:xs)` 的形式去拿出 List 中的第一個元素及剩餘的 List 。 然後我就把第一項與放入 `sumList` 的剩餘 List 相加即可。

過程會像是：

```haskell
sumList [1..5]
1 + sumList [2..5]
1 + (2 + sumList [3..5])
1 + (2 + (3 + sumList [4..5]))
1 + (2 + (3 + (4 + sumList [5..5])))
1 + (2 + (3 + (4 + (5 + sumList []))))
1 + (2 + (3 + (4 + (5 + 0))))

```

# as-pattern

在 Haskell 中還有兩個蠻常搭配 pattern matching 的語法 `@` 及 `_`

```haskell
concatFirstElement :: [String] -> String
concatFirstElement [] = "Empty list, whoops!"
concatFirstElement all@(x:_) = "The first element of the list " ++ show all ++ " is " ++ x

print (concatFirstElement []) -- "Empty list, whoops!"
print (concatFirstElement ["foo","bar","baz"]) -- "The first element of the list [\"foo\",\"bar\",\"baz\"] is foo"
```

我們先從 `(x:_)` 開始看，這裡意思就是我們當我們匹配到一個 List 後，只會用到 `x` 而 `x` 所串接的 List 我並不在乎，跟前面的 `x:xs` 來比較的話，是因為在 `concatFirstElement` 並不會使用到 `xs` 所以可以用 `_` 來避免宣告一個不會用的值。

而 `all@(x:_)` 就是記住這個 pattern 的 reference ，也就是說 `all` 就是 `(x:_)` 這個 List ，如果不使用 `@` 的話，我還是得改為 `x:xs` 來讓我可以表示出整個 List 。

也就是會變成這樣：

```haskell
concatFirstElement (x:xs) = "The first element of the list " ++ show (x:xs) ++ " is " ++ x
```

# Guard

前面的用法只能用在如果是遇到「特定的值」或「結構」時就做什麼行為，但如果是要做大於小於之類的比較或者是有多個參數要一起參與判斷式的組成，那感覺就不太夠用了。

這時我們可以使用 Guard，我們先來寫了一個 function 來判斷三個邊長是否可以構成一個合法的三角型

```haskell
calcTriangle :: Int -> Int -> Int -> String
calcTriangle a b c
    | a + b <= c || a + c <= b || b + c <= a = "Invalid"
    | a == b && b == c = "Equilateral"
    | a == b || b == c || a == c = "Isosceles"
    | otherwise = "Scalene"
```

Guard 的用法很簡單，只要用 | 並在後面加上一個最後會回傳 `Bool` 的 expression 以及 match 到後要回傳的 expression ，然後依序從上到下如果失敗就會往下繼續 match 。

首先我們用三角形任意兩邊一定大於第三邊來當作判斷，如果成立為 `True` 就會回傳 `"Invalid"` ，如果不是就會接到下一個 guard ，接下來我們來判斷如果三邊相等那就代表他為正三角形所以回傳 `"Equilateral"` ，如果還不是就會繼續到下一個 guard ，以此類推直到最後的 `otherwise` 。

`otherwise` 就是 `True` ，意思就是一定會執行右邊的 expression ，通常就是放在最後面有點類似其他語言的 `switch case` 的 `default` 之類的用途。但如果沒有提供 `otherwise` 且最後沒有匹配到任何一個 guard ，那跟一班的 pattern matching 一樣最後會拋出錯誤。

# Where

上面的程式感覺還是有點羅嗦，有什麼辦法可以簡化重複的 pattern 嗎？這時候我們可以使用 `where` 幫定義我們需要重複的 expression。

```haskell
calcTriangle' :: Int -> Int -> Int -> String
calcTriangle' a b c
    | a + b <= c || a + c <= b || b + c <= a = "Invalid"
    | abEq && bcEq = "Equilateral"
    | abEq || bcEq || acEq = "Isosceles"
    | otherwise = "Scalene"
    where
        abEq = a == b
        bcEq = b == c
        acEq = a == c
```

`where` 的用法就是放在 | 的後面定義名稱及值 ，所以我們可以 `a == b` 等等的布林運算定義成另外一個名稱，然後原本的

```haskell
| a == b && b == c = "Equilateral"
```

就可以變成

```haskell
| abEq && bcEq = "Equilateral"
```

讓我們在使用 pattern matching 時增加整體的可讀性，且 `where` 中所綁定的名稱只在這個 function 也就是 `calcTriangle'` 裡才有用。

除了綁定數值以外，`where` 也可以用來綁定 function

```haskell
calcTriangle'' :: Int -> Int -> Int -> String
calcTriangle'' a b c
    | isInvalid a b c || isInvalid a c b || isInvalid b c a= "Invalid"
    | abEq && bcEq = "Equilateral"
    | abEq || bcEq || acEq = "Isosceles"
    | otherwise = "Scalene"
    where
        abEq = a == b
        bcEq = b == c
        acEq = a == c
        isInvalid x y z = x + y <= z
```

我們可以把 `a + b <= c` 這類的運算改用 `where` 來定義成一個 function ，雖然在這裡看不出有太多的差異或者有什麼理由一定要這樣寫，但假設我們今天有一個很小的 function 想要抽出原本的 expression 但又不需要寫成全域的 function 我們也可以用 `where` 來協助我們達成這件事情。

拿我們前幾天的 List comprehension 的例子舉例：

```haskell
[email | email <- emailList, elem '@' email && elem '.' email ]
```

原本我們有一個 List comprehension 然後他的限制條件是判斷 `email` 裡有無 `@` 且 `.` 但假設我們想把這個判斷抽出來也可以使用 `where` 來達成

```haskell
filterValidEmail :: [String] -> [String]
filterValidEmail xs =
    [email | email <- xs,  isValid email ]
    where
        isValid email = '@' `elem` email &&  '.' `elem` email
```

這裡可以看到我們使用 `where` 來將 `isValid` 的邏輯抽出來，然後我再把原本的限制條件改為使用 `isValid`

總結來說 `where` 有點像是局部變數的概念，我們可以將某些數值或者 function 固定在某個 scope 有作用而已。

> 雖然沒有特別提到，但在 Haskell 中 function 也是一種變數。

# Let

說到區域變數，也許有人會疑惑那跟 `let` 又差在哪裡？

我們先把上面的程式碼改為用 `let in`

```haskell
filterValidEmail' :: [String] -> [String]
filterValidEmail' xs =
  let
    isValid email = '@' `elem` email && '.' `elem` email
  in
    [email | email <- xs, isValid email]
```

跟之前所介紹的一樣 `let` 綁定的名稱只在 `in` 裡面有作用，`let` 與 `where` 的根本差異是 `in` 後面是接一個 expression 且 `let` 可以在任何地方使用

```haskell
-- ghci
foo = let a = 200 in a +1
foo -- 201

foo = [let a = 200 in a+1 , 202]
foo -- [201,202]
```

那至於該選擇 `let` 還是 `where` 呢？只能說看習慣與場合，但多數情況**「我個人認為」** `where` 比較好讀一點點

# Case

`case` 使用其實就真的很像其他語言的 `switch case` 一樣 ，我們 `case` 一個值然後根據他的值而執行什麼。

```haskell
sumList :: Num a => [a] -> a
sumList [] = 0
sumList (x:xs) = x + sumList xs

sumList' :: Num a => [a] -> a
sumList' list = case list of
    [] -> 0
    (x:xs) -> x + sumList' xs
```

那這樣 `sumList` 跟 `sumList'` 有什麼差？答案就是「沒差」，我們在 function 使用的 pattern matching 就只是 `case` 的語法糖而已。

但 `case` 看的出來也是一種 expression 所以我們一樣能在任何地方，所以也能這樣做

```haskell
foo x =
    [case x of
        'a' -> 10
        'b' -> 11
        'c' -> 12
        'd' -> 13
        'e' -> 14
        'f' -> 15
        _ -> error "Invalid hex digit"
    ,1]
```
