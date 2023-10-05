---
title: Rust 筆記 - 3 | struct & enum
summary: ''
published: '2023-08-25T12:00:00.000+08:00'
updated: '2023-08-25T12:00:00.000+08:00'
cover: https://toddliao.dev/2023-08-25-cover.webp
coverStyle: 'TOP'
tags:
- ['Rust']
series_tag: 
  - 'Rust-Learning-Notes'
series_title:
  - 'Rust 學習筆記 🦀🦀🦀'
---

# 前言

這篇文章主要簡單介紹在 rust 中我個人認為非常好用且常用的兩種型別 `enum` 以及 `struct`。

# struct

## 基本使用

struct 我個人認為蠻像 js 中的 `object` ，就是可以用一些欄位來描述一個資料。
首先用 `struct` 來宣告，然後加上名稱以及每個欄位的名稱以及型別，乍看之下跟 ts 的 `interface` 一模一樣。

```rust
struct User {
    active: bool,
    userName: String,
    email: String,
}

```

那我們宣告一個 `struct` 後，接著就是創造它的 instance ：

```rust
 let user1 = User {
		active: true,
        email: String::from("foo@bar.com"),
        userName: String::from("foo"),
    };

```

如果剛好欄位名稱跟值所使用的變數名稱一樣就可以直接縮寫

```rust
fn build_user(email: String, userName: String) -> User {
    User {
			userName,
			email,
			active: false,
		}
}

```

我們在初始化 `struct` 時有一個重點是**所有欄位都要被初始化**，也就是不能這樣使用：

```rust
// ❌ 這段 code 有錯
let user2 = User {
        email: String::from("foo@bar.com"),
        userName: String::from("foo"),
    };

```

## struct update syntax

如果要復用一個舊的 `struct` 就只需要在新的 `struct` 的初始化時使用 `..`  （**特別注意這裡是兩個.**）這個被稱為 struct update syntax 的功能。即可。

```rust
 let user1 = User {
			active: true,
      email: String::from("foo@bar.com"),
      userName: String::from("foo"),
    };

 let user2 = User {
	   active: true,
       ..user1
    };

```

需要注意的是 `..user1` **一定要放在最後，且不需要在句尾加上`,`**

struct update syntax 其實跟 variable  assignment ( `=` ) 很像，我們一樣用`user1`
、`user2`當作例子

```rust
// ❌ 這段 code 有錯

//下面這一行是一個macro，目的是為實現`Debug` trait，但本篇文章並不會特別說明這個語法。
#[derive(Debug)]
struct User {
    active: bool,
    userName: String,
    email: String,
}

fn main() {

let user1 = User {
		active: true,
        email: String::from("foo@bar.com"),
        userName: String::from("foo"),
    };

 let user2 = User {
	   userName: String::from("foo2"),
       ..user1
    };

    println!("{:?}, {:?}",user1,user2);
}

```

這段程式之所以有錯誤的原因我們也能從 compiler 給的訊息得知

```

  let user2 = User {
   |  ______________-
18 | |        userName: String::from("foo2"),
19 | |        ..user1
20 | |     };
   | |_____- value partially moved here
21 |
22 |       println!("{:?}, {:?}",user1,user2);
   |                             ^^^^^ value borrowed here after partial move

```

因為 `user1` 已經有 borrow 值出去，所以這邊沒辦法再把 ownership 給 `println!`
，主要原因是 `User` 中的 `email` 是 `String` type ，而在 rust 中 `String` 是沒有實作 `Copy` trait ，導致在做variable  assignment 時，會是 move 而不是 copy。

但如果我們要改用 `&str` 來取代 `String` 就會遇上 **lifetime** 這個比起 ownership 我覺得更勸退初學者的概念。~~（未來有機會再寫成文章）~~

## mutable

rust 裡的 `struct` 並無法做到單一欄位的 mutable 所以我們只能在宣告 `struct` 時加上 `mut`

然後我們只要對我們想要更改的欄位直接覆寫就好了

```rust
struct User {
    active: bool,
    userName: String,
    email: String,
}

fn main() {
    let mut user1 = User {
        active: true,
        userName: String::from("Todd"),
        email: String::from("Todd@bar.com"),
    };
    
    user1.userName = String::from("Todd2");
    
    println!("The user is {}", user1.userName,); // The user is Todd2
}
```

## struct method

method 就很像 function 一樣，只是他是針對一個 `struct`  （精確來說不只 `struct` 可以使用 `method` ）去說明只有它可以使用這些 function。

首先我們使用 `impl` 語法並在後面接我們被實作的 method 的 `struct` 

接下來就是實作 function 本身，就跟我們平常使用 `fn` 一樣

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

從上面看到 我們 `impl Rectangle`  後我們就可以在 `rect1` 直接使用 `area()` ，這裡需要注意的是 `$self` 其實是 `self:&Self`  (大小寫注意)的縮寫。

也因為這是 function 所以這裡也是有 ownership 概念的，我們先把 `&self` 改為 `self:Self` 故意將 `self` move 到 `fn` 裡。

```rust
// ❌ 這段 code 有錯

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(self: Self) -> u32 {
        self.width * self.height
    }

    fn perimeter(self: Self) -> u32 {
        2 * (self.width + self.height)
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.\n
        The perimeter of the rectangle is {} square pixels.,",
        rect1.area(),
//            ------ `rect1` moved due to this method call
        rect1.perimeter()
//      ^^^^^ value used here after move
    );
}
```

從註解中的錯誤訊息就可以很清楚的知道，因為我們已經將 `rect1` 的 ownership move 到 `area()` 裡，所以下一行的 `perimeter()` 就無法使用 `rect1` 了。

# enum

## 基本使用

 `enum`  在字面上的意思就是枚舉的意思，我的個人理解是它在描述**「某個值只能取特定值之一的情況」**，像是撲克牌只有四種花色、硬幣只有正反面。

我認為 rust `enum` 比起 ts 好用許多，當然一部份是因為 rust 本身提供其他語法讓 enum 具有那麼強的能力，像是 pattern matching ，但光是 rust 本身給 `enum` 就有許多好用的特性了

首先我們定義一個 enum 只需要 使用 `enum` 去宣告  

```rust
enum IpAddrKind {
    V4,
    V6,
}

let four = IpAddrKind::V4;
let six = IpAddrKind::V6;
```

使用起來只需要使用 `IpAddrKind::{variants}`

```rust
let four = IpAddrKind::V4;
let six = IpAddrKind::V6;
```

 現在回頭想想上面的範例，如果我們要用 `IpAddrKind` 去描述一個 ip 位址顯然是不夠的，所以我們可能直接是想到用 `enum` 加上 `struct` 來輔助我們

```rust
enum IpAddrKind {
    V4,
    V6,
}

struct IpAddr {
    kind: IpAddrKind,
    address: String,
}

let home = IpAddr {
    kind: IpAddrKind::V4,
    address: String::from("127.0.0.1"),
};

let loopback = IpAddr {
    kind: IpAddrKind::V6,
    address: String::from("::1"),
};
```

我們宣告了 `IpAddr` 這個 `struct` 來幫助我們描述這兩種 ip 位址的形式。但這顯然不夠簡潔因為我們早就可以確定 `IpAddrKind::V4` 一定是四個數字，但如果我直接把  `address` 改為 `(u8,u8,u8.u8)` 來描述時我在 `kind`  是 `IpAddrKind::V6` 又會有問題 ，總不能直接拆成兩個 `struct` 吧？那有沒什麼辦法更加的優雅描述這種情況呢？

這時 rust 的 `enum` 就提供一個很好的特性：`enum` 的 variants 是**允許擁有數值**的我覺得可能比較相近的比喻是**「盒子裡面裝著一個數值」**。這可以讓我們更加簡單的描述這種類別的數值。

所以可以將 `IpAddr` 改為：

```rust
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let localhost_v4 = IpAddr::V4(127, 0, 0, 1);
let localhost_v6 = IpAddr::V6(String::from("::1")); 
```

但其實在 `std::net::IpAddr` 這個標準函式庫裡就有幫我們示範了這個例子大神們會怎麼實現

首先他把 `IpAddr` 的 `V4` 及 `V6` 分別改接 `struct` : `Ipv4Addr` 、`Ipv6Addr`

```rust
enum IpAddr {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}

let localhost_v4 = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
let localhost_v6 = IpAddr::V6(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1));
```

那在 `std::net::Ipv4Addr` 及 `std::net::Ipv6Addr` 有 `impl` `new`  這個 `method` 我們就可以直接建立好這個 `struct` 並放入 `enum` 裡。

### 簡單的 pattern matching

其實 pattern matching 並不是只有用在 `enum`  但大部分時候我們使用 `enum` 時會一起使用 pattern matching ，畢竟 `enum` 就是代表 **「某個值只能取特定值之一的情況」**所以我們常常需要判斷這値處於哪一種特定值。

```rust
use std::net::{Ipv4Addr, Ipv6Addr};

// std::net::IpAddr 本身其實就有 impl Debug trait
// 但為了下面的範例這邊就自己自己宣告 IpAddr
#[derive(Debug)]
enum IpAddr {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}

fn main() {
    let localhost_v4 = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
    let localhost_v6 = IpAddr::V6(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1));

    println!("The ip is {:?}", localhost_v4); // V4(127,0,0,1)
    if let IpAddr::V4(i) = localhost_v4 {
        println!("The ip is {:?}", i); //  127,0,0,1
    }
}
```

我們可以看到我們可以利用 `if let` (一種pattern matching 語法）將 `enum` 這個**「盒子」`V4`** 給打開並取出裡面的值 `127.0.0.1` 。 

當然 pattern matching 在 rust 遠遠不止如此，未來有機會再詳細說明xD 。

# 參考資料：

[Using Structs to Structure Related Data - The Rust Programming Language (rust-lang.org)](https://doc.rust-lang.org/book/ch05-00-structs.html)

[Enums and Pattern Matching - The Rust Programming Language (rust-lang.org)](https://doc.rust-lang.org/book/ch06-00-enums.html)

[方法 Method - Rust语言圣经(Rust Course)](https://course.rs/basic/method.html)

[复合类型 - Rust语言圣经(Rust Course)](https://course.rs/basic/compound-type/intro.html)