---
title: "Rust 筆記 - 1 | ownership"

published: 2022-10-27T00:00:00.000+08:00
image: ./cover.webp
category: "Rust 學習筆記 🦀🦀🦀"
tags: ["Rust"]
---

> Photo by [Raitis Raitums](https://www.pexels.com/zh-tw/photo/10009499)

大概從 2021 年底左右就打算要學習 Rust，主要是覺得這個語言的特性真的太酷了以及它在前端的影嚮力日益劇增讓我開始對它產生了興趣，斷斷續續自學了這麼久，總覺得還是需要寫些筆記讓自己印象更深刻一點。

---

### 為什麼會需要 ownership？

最主要的原因應該是「在不使用 GC 的情況下，確保記憶體的安全性」，確實 GC 對於開發者來說是一個相當方便的功能，但這也是必須犧牲部分效能且會有一個較為肥大的 runtime 所換來的。

所以 Rust 使用了 ownership 來當作控制記憶體的手段，讓我們可以在靜態編譯期間能夠得知哪些記憶體操作會有風險而不是 runtime 時才去做檢查，這在某種程度上讓魚與熊掌都能兼得，但大前提是要能通過 Rust 的編譯器 XD。

### 所以到底什麼是 ownership？

在開始說明前，ownership 有三個主要的規則

每一個值都有一個 owner
每個值同時只能擁有一個 owner
如果 owner 離開這個 scope 則這個值將會被丟棄(drop)

### move 與 copy

在 rust 裡固定記憶體長度的資料（可以理解成 Primitive type，精確定義是放在 stack 裡的資料）在做 y = x 等賦值的動作時都是採用 copy。

```rust
let x = 5;
let y = x;
println!("{},{}", x,y); // 5,5
```

但如果是 String 這種不固定長度的 type 當我們 s2 = s1 時會是採用 move

```rust
// 這段code無法通過編譯
let s1 = String::from("hello");
let s2 = s1;
println!("{}, world!", s1);
```

當執行完第二行後 String::from(“hello”)的所有權已經轉移給 s2 了，
所以在第三行，我們再一次使用`s1` 就會發生錯誤。

要解釋這件事情首先我們要先知道 String 是會被存放在 heap 裡，所以我們變數並不會存放值而是「heap 中存放該值的記憶體地址」。所以我們在做 s2=s1 就是將 s1 所存放的記憶體位置給了 s2
但為什麼不是直接複製給 s2 呢？

回想一下最一開始說的三大規則的第二條「每個變數同時只能有一個 owner」。

至於為什麼需要避免同一個變數擁有兩個 owner 呢？就是為了避免當這個 scope 結束後這兩個 owner 都會進行 drop，也就是釋放記憶體位置進而導致「double free error」的發生。

### ownership 與 function

前面有提到離開 scope 就會進行 drop，以下面的 code 為例

```rust
//這段code無法通過編譯
fn foo(word: String) {
    println!("{}", word);
}
fn main() {
    let s1 = String::from("hello");
    foo(s1);
    println!("{}, world!", s1);
}
```

乍看之下沒什麼問題但其實這段 code 無法通過編譯，因為當 `foo()` 執行完畢後， `s1` 的記憶體就會被釋放了，所以 `println!(“{}, world!”, s1);` 並無法正確執行。

而 rust 的編譯器也告訴我們原因了

```rust
error[E0382]: borrow of moved value: `s1`
 --> src/main.rs:8:28
  |
5 |     let s1 = String::from("hello");
  |         -- move occurs because `s1` has type `String`, which does not implement the `Copy` trait
6 |     foo(s1);
  |         -- value moved here
7 |
8 |     println!("{}, world!", s1);
  |                            ^^ value borrowed here after move
  |
  = note: this error originates in the macro `$crate::format_args_nl` which comes from the expansion of the macro `println` (in Nightly builds, run with -Z macro-backtrace for more info)

For more information about this error, try `rustc --explain E0382`.
error: could not compile `playground` due to previous error

```

從這些訊息我們能知道 s1 被 move 到 foo 裡的 word ，然後執行結束記憶體釋放最後 s1 是沒有東西的。

那我們能怎麼修正這個問題？

```rust
fn foo(word: String) -> String {
    println!("{}", word);
    word // 沒有分號的這種寫法相當等於return word;
}
fn main() {
    let s1 = String::from("hello");
    let s1 = foo(s1); // 預設是immutable所以是用shadowing
    println!("{}, world!", s1);
}
```

最直覺想到會是那把 word 再傳出來然後用值接住就好了，也許你會覺得這樣已經夠彆扭了，那如果我今天是要計算字數呢？

```rust
fn get_len(word:String)->(String,usize){
    let length = word.len();
    (word,length)
}
fn main() {
    let s2 = String::from("HELLO");
    let (s2,s2_len)= get_len(s2);

    println!("s2:{} ,length={} ", s2,s2_len);
}
```

會發現為了所有權我需要多回傳那個變數本身，但其實 Rust 有提供其他手段讓我們可以把「變數借出去」。
這部分就留到下篇文章再繼續說明了。

---

參考資料：

1. [What is Ownership? — The Rust Programming Language (rust-lang.org)](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
2. [Rust 學習之路 ─ 第四章：瞭解擁有權(Ownership) | MagicLen](https://magiclen.org/rust-ownership/)
