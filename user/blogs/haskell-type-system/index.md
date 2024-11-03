---

title: Haskell 從入門到放棄 - 型別系統與一點點 Typeclass
summary: ''
published: '2024-11-04T00:34:00.000+08:00'
cover: ./cover.jpg
coverStyle: 'TOP'
coverCaption: <a href="https://www.pexels.com/photo/window-blind-2924107//>Photo by Athena Sandrini </a>
series_tag: 'Haskell 從入門到放棄'
series_title: 'Haskell 從入門到放棄'
tags:
  - ['haskell','fp']

---

## 基本的型別

Haskell 的是一個靜態語言，也就是說每個 expression 在編譯期間就已經被確定型別了，又因為 Haskell 不支援自動轉型所以基本上我們能相信 Haskell 在大部分情況不太會有 runtime 的型別問題。

首先來看看 Haskell 裡的各種型別，可以在 `ghci` 裡使用 `:t`  來輸出 expression 的型別

```haskell
-- in ghci
:t True -- True :: Bool
:t 'a'  -- 'a' :: Char
:t  "abc" -- "abc" :: String
:t ["2"] -- ["2"] :: [String]
:t  True || False --  True || False :: Bool
:t  5 == 3  -- 5 == 3 :: Bool
```

這邊可以看出輸出都是 `expression::Type` 的形式，然後在 Haskell 中所有明確的 Type 都是以大寫字母為開頭，像是`Bool` 、 `Char` 等等。

順便說明一下 Haskell 中其他常見的型別

1. **`Int`**: 代表整數，範圍取決於運行系統。
2. **`Integer`**: 代表任意大的整數，不受範圍限制，但效率比 `Int` 慢。
3. **`Float`**: 代表單精度浮點數，用於表示近似的實數。
4. **`Double`**: 代表雙精度浮點數，提供更高的精度。

## 型別推斷

也許有人會想說 Haskell 明明是靜態語言那為什麼不需要在宣告變數時就指定型別呢？這是因為 Haskell 是支援型別推斷 (type inference) 的。意思是 Haskell 能從前後文得知這個 expression 的型別。

拿一個 List comprehension 的範例稍微改一下，這會生成一個從某個字串濾出小寫字母的新字串

```haskell
foo l  = [x| x<- l , x `elem` ['a'..'z']]

:t foo  
-- foo :: [Char] -> [Char]
```

這邊可以看出 Haskell 幫我們推斷出 `foo` 的型別是 `[Char] -> [Char]` ，這又代表什麼意思呢？翻譯成中文是 `foo` 這個 expression 接受一個參數`[Char]` 並最後回傳 `[Char]` 型別。

至於是要從哪裡看出來哪個是參數型別哪個是回傳型別呢？基本上在 Haskell 的型別簽名中，多個 **`->`** 符號分隔了不同的參數型別，而最後一個 **`->`** 符號之後的型別是該函數的回傳型別。因此，最後一個 **`->`** 符號右邊的型別表示函數的結果型別。

```haskell
add' x y z = x+y+z

:t add'
-- add' :: Num a => a -> a -> a -> a
```

這裡會發現 Haskell 幫我們推斷出`add’ :: Num a ⇒ a → a → a → a` ，會發現這裡一樣有四個 `a` ，也就代表這個 function 有三個參數。

> 更精確點說是因為所有 function 都是 curried ，所以  `Num a ⇒ a → a → a → a`   實際上是代表， `add’ x`  的 type 會是 `Num a ⇒ a → a → a`   、 `add’ x y` 則是 `Num a ⇒ a → a`
> 

### Type variables

或許有人會感到好奇 `Num a ⇒ a → a → a → a` 的 `a` 是什麼意思，這個就是所謂的 type variables。

在沒有約束的情況下 `a` 可以是任意型別，像是 `head` 這個 function，它就只是拿出 List 中的第一個元素，理論上他不需要管這個 List 是什麼型別。

```haskell
:t head
-- head :: GHC.Stack.Types.HasCallStack => [a] -> a
```

> GHC.Stack.Types.HasCallStack 是 ghci 裡追蹤程式碼所用的，總之這裡可以忽略這個東西
> 

會看到 `[a] -> a` 其中不像 `add’ :: Num a ⇒ a → a → a → a`  一樣是 `a` 前面沒有任何看起來像是型別的東西。

這時候就是代表這個 `a` 可以任意的型別。

# 一點點 Typeclass

那 `add’ :: Num a ⇒ a → a → a → a` 的 `Num a =>`   到底是什麼？簡單來說它就是一個型別約束的語法，意思是 `a` 必須屬於 `Num` typeclass，像是前面所介紹的 `Int` 、`Integer` 、`Float` 等等就是屬於 `Num` 。

那 typeclass 又是什麼呢？我自己認為它比較像是 type 的 interface，它提供了一個定義一群類別所需具備的行為跟特性。

常見的 typeclass 像是 `Eq` 、`Ord` 、`Show` 、`Num`

1. `Eq` 主要就是提供了判斷是否相等的介面，所以如果一個型別可以被比較那它勢必屬於 `Eq` typeclass
    
    ```haskell
    :t (==)
    -- (==) :: Eq a => a -> a -> Bool
    ```
    
    > `(==)`  是因為通常這種運算子都是 infix ，所以為了可以使用 :t 這邊需要使用 `()` 包住他
    > 
    
    `Eq a => a -> a -> Bool` 就表示了我必須傳入兩個屬於 `Eq`  typeclass 的值才能使用且最後會回傳 `Bool` ，至於怎麼哪些 type 才是屬於 `Eq` 可以在 ghci 使用 `:i Eq` 查詢 
    
    ```haskell
    :i Eq
    
    instance Eq Bool -- Defined in ‘GHC.Classes’
    instance Eq Char -- Defined in ‘GHC.Classes’
    instance Eq Double -- Defined in ‘GHC.Classes’
    instance Eq Float -- Defined in ‘GHC.Classes’
    instance Eq Int -- Defined in ‘GHC.Classes’
    instance Eq Ordering -- Defined in ‘GHC.Classes’
    ```
    
2. `Ord` 提供了比較大小的介面
    
    ```haskell
    :t (>)
    -- (>) :: Ord a => a -> a -> Bool
    ```
    
    `Ord a => a → a → Bool`   說明了 `(>)` 的型別是傳入兩個必須屬於 `Ord` typeclass 的參數且最後會回傳 `Bool`
    
3. `Show` 就是可變為字串表示的 type class，基本上應該是除了函數以外都是屬於這個type class。
    
    ```haskell
    :t show
    -- show :: Show a => a -> String
    
    :t show 1.2
    -- show 1.2 :: String
    ```
    
4. `Num` 也就是數字的type class，
    
    ```haskell
    :t 1
    -- 1 :: Num a => a
    
    :t (*)
    -- (*) :: Num a => a -> a -> a
    ```
    
    這裡會發現 `*` 也是約束了 `a` 的型別一定得是屬於 `Num` 才行。
    

那如果今天我想要讓兩個同時屬於 `Num`  typeclass 但又不是同一個型別的參數相乘呢？

```haskell
(5 :: Int) * (6 :: Integer)

<interactive>:99:15: error:
    • Couldn't match expected type ‘Int’ with actual type ‘Integer’
    • In the second argument of ‘(*)’, namely ‘(6 :: Integer)’
      In the expression: (5 :: Int) * (6 :: Integer)
      In an equation for ‘it’: it = (5 :: Int) * (6 :: Integer)
```

這個編譯器錯誤告訴了我們因為 `Int` 和 `Integer` 是不同的型別所以發生錯誤，這邊雖然 `Int`  及 `Integer` 都是同屬於 `Num`  的 `instance` ，但實際上還是不同的型別所以這邊才無法進行運算。

可以想成這件事情相當等於從 `Int ->  Interger -> ????`   推導出這裡的 `????` 是什麼，但不管是 `????` 是 `Int` 還是 `Interger` 都無法符合 `a -> a -> a` ，由此可見 Haskell 的型別系統到底有多嚴格了。