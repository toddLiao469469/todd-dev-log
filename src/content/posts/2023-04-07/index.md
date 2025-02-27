---
title: "medium -> 自架blog的小小心得"

published: 2023-04-07T10:00:00.000+08:00
updated: 2023-04-07T10:00:00.000+08:00
image: ./cover.jpeg
category: "雜談"
tags: ["Svelte"]
---

> Photo by Ave Calvar Martinez on <a href="https://www.pexels.com/zh-tw/photo/3139473/">Pexels</a>

大概從去年年底我就開始進行從 medium 轉移到這裡的工作，但一路拖到連假才完成這次的搬遷。

## 為什麼要離開 medium ？

> 根本的原因是**手癢**，畢竟樂於折騰自己是一個前端工程師的天性。

其餘比較實務上的理由就是：

1. 自己的工作流程
2. medium 的 `markdown` 語法支援程度
3. 文章整理
4. 版面自由度

我自己是先習慣在支援 `markdown` 的筆記軟體（原本是 notion 現在是 obsidian ）上撰寫後再貼到 medium 。會選擇這樣做的最大理由是在剛開始決定寫文章時我並沒有特別想說要使用哪個平台，所以就先使用筆記軟體撰寫且也方便管理進度或文章種類。

但開始使用後就遇到了一些問題，因為 medium 對於 `markdown` 支援的問題，我直接把從筆記軟體寫好的文章直接貼過去後往往需要稍微修改一下，然後如果看到一些書寫上的小錯誤也會順便修正，但這時我往往會忘記把已經在這邊修正的錯誤貼回去筆記軟體導致這兩個地方的文章不同步，這在當時並不會產生太大的問題頂多就是我在筆記軟體上不一定會是最新的狀態，直到我決定邀遷移出來後才真正造成困擾。因為通常 medium 的文章我可能還有再次編輯過所以當我在遷移時一定都會是從 medium 複製，但貼到 `markdown` 的編輯器，我就又要再修改一次文章。

在整理方面 medium 的文章 tag 對於分類上沒有太多用處，應該是只有給推薦演算法使用的功能而已。所以沒辦法在 medium 整理出系列文或者特定類型的文章出來。且對於草稿的管理而言 medium 也沒有太多著墨，但如果是筆記軟體我就可以手動新增一些 tag 來輔助我管理。

## 那我找了哪些替代品呢？

在尋找替代品時我有設定幾個需求，能夠滿足愈多點愈好。

1. 最好是沒碰過的框架
2. SSG
3. 部署的難易程度
4. 建立環境的難易程度
5. 一定的自由

所以我大概有考慮過幾個工具： `next.js`、`gatsby`、`svelte-kit`。

首先不選 `next.js` 的理由是**它太強以致於我不想去用**，我需要可能只是我下個指令就可以有一個開箱即用的 `markdown` processor 的環境，且 `next.js` **應該是沒辦法直接把 markdown 當作路由的 entry** ， 所以我可能還是需要一個 `index.tsx` 去載入 markdown 吧，即使可以使用 `index.md` 但應該還是需要額外的套件及開發時間。想想如果我還要額外花時間處理才能讓我享受在其他工具的開發體驗，那我還是直接使用其他工具好了。所以後來就直接不考慮 `next.js` 了

接下來是 `gatsby` 做為一個 SSG 框架，基本上我想要的功能他都能滿足，我也差一點點就決定選擇 `gatsby` 直到我找到了 `urara`（一個使用 `svelte-kit` 的主題），主要是 `urara` 的樣式設計的蠻好看的，再加上是使用 `svelte-kit` 我就更有理由選擇他了。

但實際用上了之後發現了一點問題，特別是在效能上以及一些無法修正的 bug，我就心灰意冷地準備回去使用 `gatsby`，但後來偶然發現 [`QWER`](https://github.com/kwchang0831/svelte-QWER) 一個參考 `urara` 的主題，基本上也是作者使用了 `urara` 後遇到了某些問題後乾脆自己做了一版。實際用起來雖然還是有一些小問題，但我比較在意的點都已經被解決掉了。

## QWER

首先他的版面設計很對我的味口

![首頁](./QWER-2.jpeg)

如果我要新增一篇文章也只要新增一個資料夾以及 `.md` 檔就好。
![檔案路由](./QWER-1.png)

然後在 `markdown` 的 meta 中有一些好用的參數，像是常用的 cover 圖、tags 之類的。
![檔案路由](./QWER-3.png)

也內建自動生成文章目錄，這點我真的超推。
![檔案路由](./QWER-4.png)

總而言之 `QWER` 已經滿足我 90% 的需求了，但還是在搬遷時遇到了一些小小問題。

## 搬遷過程

如前面提到的大部分的時間都是花在將 medium 的文章貼到 vscode 裡，然後修改一下語法。

而在部署方面我是使用 `QWER` 文件中推薦的 **Vercel** 來部署，基本上也沒多做什麼事情大概就一直按下一步就完成這個網站的部署，整體而言體驗是非常舒服。

稍微有改動的程式碼的部分，不知道為什麼在文章頁最後的上下頁的 section 裡左邊會是下一篇右邊會是上一篇，看起來總是覺得有點怪怪的然後就把他們順序對調了。

以及對於 code block 的語言支援程度有限， `QWER` 是使用 `prismjs` 這個 package 作為 processor ，雖然它是有支援我目前有用到的所有語言，但在 `QWER` 中並沒有載入某些我有在用的語言，感覺這個部分應該要是在 user config 設定並動態載入所需要語言的 package 。當然我還是有辦法更改 server side 部分的 code，但這個修改就會在我要更新 `QWER` 時被覆蓋掉，所以後來乾脆實作這個語言的 dynamic import 的功能並開 PR 回去了。

弄的差不多後就想說既然都自己架站了乾脆來處理 domain 及 CDN 好了。domain 的話我是在 **google domain** 上買的，會選擇 google 的原因就只是**便宜**，至少我現在這個 domain 在 Vercel 以及 cloudflare 都是比在 google 上買還貴，至於 CDN 服務則是用了 **cloudflare 的免費版**。

設定上也不會太複雜，在 Vercel 新增新買的 domain，並把 google domain 改用 cloudflare 的 name server 之後在 cloudflare 新增 Vercel 的 DNS Record 即可。

### 結語

經過這一陣子的折騰，其實我還是蠻推薦有在寫部落格的人自主架站的，原因是現在有許多好用且免費的服務可以用，除了 domain 以外我並沒有再花到錢，所以這整個網站的花費不到 15 美元，算是相當便宜的...吧？

而且如果剛好你也是個開發者而且剛好沒接觸過一些網路概念或者架站的知識的話，實際走一次流程還是有一點點收穫的，像我其實也早忘記 DNS 以及 CDN 在做什麼，CNAME 、 A record 又是什麼意思。

當然架站也不是只有優點，最大缺點應該會是放棄原本擁有的流量但反正我原本的 medium 也沒什麼人看 _(QQ)_ 所以這些就當作沒有吧。而且還少了原本部落格平台的 promote ，像是 medium 就會時不時寄信或者 follower 的功能。

參考資料:
<https://github.com/kwchang0831/svelte-QWER>
