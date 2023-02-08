---
title: Rust 筆記 - 2 | reference & borrowing
summary: ''
published: '2022-11-14T00:00:00.000+08:00'
cover: ./cover.webp
coverStyle: 'TOP'
coverCaption: Photo by Raitis Raitums on <a href="https://www.pexels.com/zh-tw/photo/10009499/">Pexels</a>
tags:
  - ['Rust']

---

在[上一篇](../2022-10-27/index.md)裡的最後一個程式碼有提到因為所有權，導致我們在實作function及使用上都造成一定程度的不方便。

```rust
fn get_len(word: String) -> (String,usize) {
    let length = word.len();
    (word,length)
}
fn main() {
    let s2 = String::from("HELLO");
    let (s2,s2_len)= get_len(s2);
    
    println!("s2:{} ,length={} ", s2,s2_len);
}
```

那我們該如何改善這段程式碼呢？
首先我們希望把 `-> (String, usize)` 變成 `-> usize` 就好，畢竟我們只是要計算字數而已。
再來就不用 `shaowing` 變數，也能夠直接在 `println!` 裡繼續使用 `s2`

---

### Borrowing

我們只需要將程式碼稍稍改寫：

```rust
fn get_len(word: &String) -> usize {
    let length = word.len();
    length
}
fn main() {
    let s2 = String::from("HELLO");
    let s2_len = get_len(&s2);
    
    println!("s2:{} ,length={} ", s2,s2_len);
}
```

當我們使用 `&` 運算子時意思是我們要去取 reference，所以 `&s2` 就是去取得 `s2` 的reference。
而所謂rust中的reference，我覺得比較像c++中的pointer（指標），感覺像是指向變數記憶體位置的一個代稱。

而當我們將 `&s2` 傳入到 `get_len` 時，因為我們是將 `s2` 的reference傳入而不是將他的變數傳進去，所以並不會發生move，而這個行為就被稱為borrowing（借用）。

可以發現我們不用再多 `return s2` 本身，只需要將 word的type改為 `&String` 來表示我們要接收的一是個string reference。
而在rust中我們在操作 reference type大多數時刻，都跟我們在操作一般的型別一樣。我們可以直接 `word.len()` 但在某些情況下我們可會需要使用到 `*` 這個運算子來 dereference （解參考）

### Mutable reference

在rust中我們如果讓一個變數是可以被更改的都需要加上 `mut` 這個關鍵字，而reference也是一樣，如果我要建立一個 mutable reference 我們就必須使用 `&mut`

```rust
fn push_string(word: &mut String){
    word.push_str("test");
}
fn main() {
    let mut a = String::from("test");
    push_string(&mut a);
    println!("{}",a) // testtest
}
```

從上面的例子得知，我們必須將參數type改為 `&mut` String且我們也必須在傳入函數時使用 `&mut` ，需要注意的一點是必須是 `let mut` 的變數才能建立 `&mut`。

在rust中為了避免Data race 所以每個變數只能擁有一個mutable reference

```rust
// This code does not compile
fn push_string(word: &mut String){
    word.push_str("test");
}

fn main() {
    let mut a = String::from("test");
    let immut_a = &a;
    let mut_a = &mut a;
    push_string(mut_a);
    println!("{} , {}",a ,immut_a)
}
```

編譯器會很貼心地告訴我們，哪裡重複宣告了mutable reference

```rust
error[E0499]: cannot borrow `a` as mutable more than once at a time
  --> src/main.rs:10:17
   |
9  |     let mut_a = &mut a;
   |                 ------ first mutable borrow occurs here
10 |     let mut_b = &mut a;
   |                 ^^^^^^ second mutable borrow occurs here
...
13 |     push_string(mut_a);
   |                 ----- first borrow later used here
For more information about this error, try `rustc --explain E0499`.
```

而且也不能同時擁有mutable reference和immutable reference

```rust
// This code doesn't compile

fn push_string(word: &mut String){
    word.push_str("test");
}
fn main() {
    let mut a = String::from("test");
    let immut_a = &a;
    let mut_a = &mut a;
    push_string(mut_a);
    println!("{} , {}",a ,immut_a)
}
```


```rust
error[E0502]: cannot borrow `a` as mutable because it is also borrowed as immutable
  --> src/main.rs:10:17
   |
9  |     let immut_a = &a;
   |                   -- immutable borrow occurs here
10 |     let mut_a = &mut a;
   |                 ^^^^^^ mutable borrow occurs here
...
14 |     println!("{} , {}",a ,immut_a)
   |                           ------- immutable borrow later used here
For more information about this error, try `rustc --explain E0502`.
error: could not compile `playground` due to previous error
```

之所以不能允許同時擁有mutable及immutable的reference是因為這樣子那個宣告成immutable reference就不能確保他是immutable的了。

但rust的編譯器有辦法判斷出各個reference的作用範圍，所以這樣子是可以的：

```rust
fn push_string(word: &mut String){
    word.push_str("test");
}
fn main() {
    let mut a = String::from("test");
    let immut_a = &a;
    println!("{} , {}",a ,immut_a); 
    
    let mut_a = &mut a;
    push_string(mut_a);
    println!("{}",mut_a);
}
```

在第一次 `println!` 後再也沒用到 `immut_a` 所以之後再宣告一個 mutable reference 是可以的。

參考資料:

  1. [Rust 學習之路─第四章：瞭解擁有權(Ownership) | MagicLen](https://magiclen.org/rust-ownership/)
  2. [給 C++ 使用者的 Rust 簡介：參考型別與 Borrow Checker | Jason note (jasonblog.github.io)](https://jasonblog.github.io/note/Rust/rust-an-introduction-reference-and-borrow-checker.html)
  3. [写给前端看的Rust教程（5）Borrowing & Ownership — 掘金 (juejin.cn)](https://juejin.cn/post/7039590802275696676/)
  4. [References in Rust | Articles by thoughtram](https://blog.thoughtram.io/references-in-rust/)
  5. [References and Borrowing — The Rust Programming Language (rust-lang.org)](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)

