<!-- auto-generated by QWER -->
<script lang="ts">
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  // @ts-nocheck
  import Post from '$lib/layouts/post.svelte';
  import ImgZoom from '$lib/components/image_zoom.svelte';
  import Video from '$lib/components/video.svelte';
  import CodeCopy from '$lib/components/code_copy.svelte';
  import InfoBox from '$lib/components/info_box.svelte';
</script>

<Post>
  <article slot="post_content">
    <h2 id="tl-dr"><a href="#tl-dr">TL;DR</a></h2>
    <p>
      先說結論，我覺得 Svelte 開發體驗很讚但終究有缺點，所以要我把現行主要產品都改成 Svelte
      的話，即使有足夠的時間跟資源重寫 <strong>「我也不要」</strong>
    </p>
    <p>
      這篇文章順便紀錄了一下開發的心路歷程及抱怨 Next.js ，所以如果只是想知道 Svelte 哪裡比較好，可以直接跳到 <a
        href="#why-svelte">
        「為什麼選Svelte」
      </a>
    </p>
    <h2 id="qian2-qing2-ti2-yao4"><a href="#qian2-qing2-ti2-yao4">前情提要</a></h2>
    <p>
      給第一次認識我的讀者一點點背景介紹，我在前端的工作經歷大概有五年，除了出社會一開始用了幾個月 jQuery
      以外我都是只有使用 React ，直到最近。
    </p>
    <p>
      去年年末我們團隊開始了一個全新產品的開發，因為它的性質較為特殊且主管給了非常非常非常大的彈性，所以我們算是把這個產品當作實驗室想幹嘛就幹嘛，也因此我們也開始思考要不要玩玩看其他框架。
    </p>
    <p>
      我自己認為大部分工程師應該都是比較喜歡嘗試新技術的（喜歡折騰自己），所以我們當初決定不使用 React
      大概有一半以上的原因是「想要使用新技術」。
    </p>
    <h2 id="nextjs-zhen1-de-you3-dian3-ma2-fan2">
      <a href="#nextjs-zhen1-de-you3-dian3-ma2-fan2">Next.js 真的有點麻煩</a>
    </h2>
    <p>
      早在我進這間公司前，內部就已經使用 Next.js 做為主要的開發框架了，但當初採用它的人只是作為 CRA (create-react-app)
      的替代品，並不是為了 SSR 之類的功能才選擇，沒錯其實我們所有專案都是完完全全的 SPA ，雖然 Next.js 不是不行做 SPA
      ，只是會有點殺雞焉用牛刀的感覺。
    </p>
    <p>所以當我們目前主力產品還在規劃階段時我就懶得想直接選擇沿用 Next.js</p>
    <blockquote>
      <p>
        但以那時的時空背景來說其實 React 生態系也沒什麼框架或者 bundler 可以選就是了， Vite 才 v2 、 Remix
        剛開源，所以那時最穩定、社群最多人推崇的選擇依然還是 Next.js 。
      </p>
    </blockquote>
    <blockquote>
      <p>
        雖然還是有其他的 bundler 可以來幫助我們建立專案，像是 webpack 、 esbuild 之類的。但純粹是我被 Next.js
        開箱即用所迷惑了
      </p>
    </blockquote>
    <p>
      一開始覺得還好，但直到專案開始成長之後我們就被 Next.js 的編譯速度搞到崩潰了，實在是有點太久了，雖然後來有
      Turbopack 的出現，但我記得一開始好像沒有支援 Page routes ，然後又因為我們不需要 App Router 所以那時也沒急著升到
      v14。
    </p>
    <p>
      另外一個不那麼客觀的原因是，我自己的體感加上觀察周遭的人的抱怨大概在 App routes 出現後 Next.js
      的穩定度開始沒那麼好了，常常聽到別人抱怨可能升個 minor 版號都會遇到不少問題，但以我們只有 SPA
      的情況下升版可能也不會遇到什麼問題？
    </p>
    <blockquote>
      <p>就在寫這篇文的期間 Next.js 15 正式發佈了，而且他依賴在 React 19 RC 上ㄏㄏ</p>
    </blockquote>
    <h3 id="qi4-yong4-nextjs"><a href="#qi4-yong4-nextjs">棄用 Next.js</a></h3>
    <p>
      總而言之 Next.js 的能力十分強大但我們的產品好像不需要那麼複雜的功能，導致就算想要繼續使用 React 我們也一定不會選擇
      Next.js ，主要是我們不需要 App Router 、不需要 Server Actions、比起 webpack 我們更喜歡 Vite 。
    </p>
    <p>
      因為我們對於 Next.js 已經沒有什麼好感，所以從去年年底開始的新專案我們一律不使用 Next.js
      ，而直到兩個月前我們才把使用 Next.js 的產品改用 Vite 重寫了。
    </p>
    <blockquote>
      <p>再次說明，因為這些產品都是純粹的 SPA 所以才能簡單地用 Vite 替代。</p>
    </blockquote>
    <p>所以在不喜歡 Next.js 加上手癢的前提下我們就不繼續使用 Next.js 了。</p>
    <blockquote>
      <p>當然我相信 Next.js 在許多場景都還是相當好用的框架，只是對於我們來說的確不是那麼必要而已。</p>
    </blockquote>
    <h2 id="a-namewhysveltea-wei2-shen2-mo2-xuan3-svelte">
      <a href="#a-namewhysveltea-wei2-shen2-mo2-xuan3-svelte">
        <a name="why-svelte" />
        為什麼選 Svelte
      </a>
    </h2>
    <p>扣掉 React 後再評估自己要花多少心力才能順利導入後，我想選且我可以選的框架只剩「Svelte」和「SolidJS」了</p>
    <p>
      先說說為什麼不是 SolidJS ，最主要的還是因為它相對年輕了點所以在整個生態系上我覺得還是略遜 Svelte 一點以及
      SolidStart 也是今年九月左右才發了 1.0 版，所以個人覺得還是不太穩定。
    </p>
    <blockquote>
      <p>
        但我覺得 SolidJS 還是一個可以關注看看的框架，一樣是不使用 virtual DOM 且透過編譯器提升效能，而且 API 設計也跟
        React 較為貼近，如果它再更成熟一點或許會更接近我理想中的選項。
      </p>
    </blockquote>
    <h3 id="svelte-hao3-zai4-na3"><a href="#svelte-hao3-zai4-na3">Svelte 好在哪</a></h3>
    <p>至於 Svelte 我是看上他的「學習門檻」、「快速」以及「開發體驗」</p>
    <p>
      畢竟還是要跟同事一起合作所以「學習門檻」還是一個相當重要的指標，Svelte 的 SFC(Single file componnet)
      就是讓我覺得降低門檻的一個重要特性，基本上只要會 HTML、 CSS 和 JS 就能夠快速入門了。
    </p>
    <p>
      「快速」這件事情除了理論上的性能以外還有「打包速度」以及「開發速度」，特別是跟之前的 Next.js
      專案比較起來打包速度體感上快了不只一點。
    </p>
    <blockquote>
      <p>我們沒有使用過 turbopack ，所以現在 Next.js 打包進步多少我就不清楚了。</p>
    </blockquote>
    <p>
      所以我自己非常主觀的想法是 Svelte 不用刻意寫就可以寫出效能不會太爛的程式碼但 React
      通常要刻意寫才能寫出效能還可以的程式碼。這部分就是得益於 Svelte 5 的 fine-grained reactivity
      設計，每次狀態更新後重新渲染的部分只會是跟該狀態相關的部分，不會是整個 component 。
    </p>
    <p>Svelte 的設計也讓「開發體驗」變得十分舒服，像是以下的程式碼</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-svelte">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token keyword">let</span> state <span class="token operator">=</span> <span class="token function">&#36;state</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onclick=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span>state <span class="token operator">+=</span><span class="token number">1</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span> +1 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>range<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">bind:</span>value=</span><span class="token language-javascript"><span class="token punctuation">{</span>state<span class="token punctuation">}</span></span> <span class="token attr-name">min</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">max</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onclick=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span>state <span class="token operator">-=</span><span class="token number">1</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span> -1 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    state: <span class="token language-javascript"><span class="token punctuation">{</span>state<span class="token punctuation">}</span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      在 state 的使用上我們只要使用 <code class="inline-code-block">$state</code>
      rune 來宣告 state 它就能擁有reactivity ，要更新只要直接去改變它的值就好不需要透過
      <code class="inline-code-block">setState</code>
       之類的 function。
    </p>
    <p>
      以及 Svelte 中最吸引我的 <code class="inline-code-block">bind:value</code>
       directive，只要一行就能達成等同 React 的 controlled component 的效果，而不去額外去寫 onChange 之類的 function 然後再傳入
      props 之類的事情。
    </p>
    <p>在 React 中要實現同等效果的程式碼大概會是這樣，可以看出簡潔不少</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-jsx">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  <span class="token keyword">const</span> <span class="token punctuation">[</span>state<span class="token punctuation">,</span> setState<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  <span class="token keyword">return</span> <span class="token punctuation">(</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token parameter">prev</span> <span class="token operator">=></span> prev <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">+1</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>range<span class="token punctuation">"</span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>state<span class="token punctuation">}</span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token attr-name">min</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token attr-name">max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      <span class="token punctuation">/></span></span><span class="token plain-text"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token parameter">prev</span> <span class="token operator">=></span> prev <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">-1</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">state: </span><span class="token punctuation">{</span>state<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  <span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      當然 Svelte 還有很多很多功能像是 logic block 、 animate 和 transition 等等，特別是 universal reactivity
      的出現更是讓我在全域狀態管理上省心不少。
    </p>
    <p>
      universal reactivity 簡單來說就是可以在 <code class="inline-code-block">.svelte</code>
      以外使用 rune ，進而可以實作全域狀態管理，只要將副檔名改為
      <code class="inline-code-block">.svelte.[jt]s</code>
       就可以了。
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-ts">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// in progressStore.svelte.ts </span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">interface</span> <span class="token class-name">ProgressState</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  loading<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">const</span> <span class="token function-variable function">createProgressStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  <span class="token keyword">const</span> progressState <span class="token operator">=</span> <span class="token generic-function"><span class="token function">&#36;state</span><span class="token generic class-name"><span class="token operator">&lt;</span>ProgressState<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> loading<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  <span class="token keyword">const</span> <span class="token function-variable function">setLoading</span> <span class="token operator">=</span> <span class="token punctuation">(</span>loading<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    progressState<span class="token punctuation">.</span>loading <span class="token operator">=</span> loading<span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  <span class="token punctuation">}</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  <span class="token keyword">return</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token keyword">get</span> <span class="token function">loading</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      <span class="token keyword">return</span> progressState<span class="token punctuation">.</span>loading<span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token punctuation">}</span><span class="token punctuation">,</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    setLoading</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  <span class="token punctuation">}</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">export</span> <span class="token keyword">const</span> progressStore <span class="token operator">=</span> <span class="token function">createProgressStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      像是這樣我就能簡單實現一個「讀取中」的全域狀態，然後我就能在其他地方使用 <code class="inline-code-block">
        progressStore.setLoading&lpar;true&rpar;
      </code>
      或者
      <code class="inline-code-block">progressStore.setLoading&lpar;false&rpar;</code>
       去控制這個全域狀態，像是放在自己封裝的 fetch 、 axios 之類的地方。
    </p>
    <p>
      然後在控制 progress 的元件的地方使用
      <code class="inline-code-block">progressStore.loading</code>
       就做出當整個網站有發出任何 request 就會在網頁上出現讀取條的功能。
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-svelte">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>progress</span> </div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>progress sticky top-3 w-full<span class="token punctuation">"</span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token attr-name"><span class="token namespace">class:</span>invisible=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token operator">!</span>progressStore<span class="token punctuation">.</span>loading<span class="token punctuation">}</span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"> <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>progress</span><span class="token punctuation">></span></span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>所以我認為如果只是要開發一個小專案，Svelte 已經可以說得上開箱即用了。</p>
    <h3 id="svelte-bu4-hao3-zai4-na3"><a href="#svelte-bu4-hao3-zai4-na3">Svelte 不好在哪</a></h3>
    <p>
      相較於 React 來說 Svelte 在各種第三方 library 的選擇是少了許多，像是「圖表」、「狀態管理」、「地圖」、「UI
      框架」等等我在工作上其他專案會用到的 library，在 Svelte
      就找不到相對成熟的解決方案，只是剛好目前這個專案不會用到所以我也沒太在意。
    </p>
    <p>
      但上述 library 的缺乏也有可能是相對於 React 來說在操控 DOM 這件事情上在 Svelte
      是相對自然的，所以圖表等等的功能其實也不一定需要特別封裝過後的 library 來實現。以及上面提到的 universal reactivity
      也解決了一部份全域狀態的需求了。
    </p>
    <p>
      所以只能說目前生態系狀況剛好可以滿足我的需求，只是如果換成公司內其他專案要改為使用 Svelte
      我就會覺得可能就不是那麼好的選擇了。
    </p>
    <p>
      寫法太有彈性這件事情也是讓我有一點點困擾的，像是 state 更新這件事情，在 Svelte 5 裡即使是 object 或者 array 進行
      mutable update 依然能夠擁有 reactivity 。
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-svelte">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token keyword">let</span> state <span class="token operator">=</span> <span class="token function">&#36;state</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token language-javascript"><span class="token punctuation">{</span>state<span class="token punctuation">.</span>value<span class="token punctuation">}</span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onclick=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span> state<span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"> add state.value </div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      以這個例子來說我只更新了 <code class="inline-code-block">state</code>
       其中一個 property 畫面依然能夠重新渲染，這項特性雖然很方便但如果變得程式變複雜了、狀態多了，就會變的比較不好維護（相較於
      React）。我的理由是「沒辦法快速找到哪裡去更新狀態」在 React 中基本上我只要去搜尋檔案中的 setState 之類 function 的通常都能夠找到哪裡去更新這個狀態。
    </p>
    <h2 id="suo3-yi3-react-zhen1-de-bu4-hao3-ma2">
      <a href="#suo3-yi3-react-zhen1-de-bu4-hao3-ma2">所以 React 真的不好嗎？</a>
    </h2>
    <p>
      即使我已經負責這個 Svelte 專案半年左右了，我卻陷入了一種 React 是我真正的歸宿但 Svelte
      寫起來真的好舒服的奇怪困境。
    </p>
    <p>
      我是認為 React 的行為比較好預測，只要先知道了 closure 是什麼、每一次 render 其實只是 function 的重新執行、非
      primitive type 在每一次 render 的 reference 都不一樣、Hook 背後其實是 Linked List 所以某些規則要遵守等等 JS 或者
      React 的基本知識，就會覺得「哦，就那樣」。
    </p>
    <p>
      雖然聽起來複雜但至少是有跡可尋，因為大致上都能以「我現在是在寫 JS 而不是寫一個全新語言的思維在思考」，但 Svelte
      可能直接把它當作一個新的語言會比較好理解，雖然一樣是用 JS 在開發但因為某些功能是 Svelte
      專屬的概念所以就會有一些額外的心智負擔。
    </p>
    <p>
      可以說 template 語法本身就是雙面刃吧，方便是方便只是就是要記一些只屬於 Svetle 的語法，特別是我現在偶而會穿插寫
      React 及 Svelte ，腦袋會常常轉不過來 XD
    </p>
    <p>
      除此之外，即使 <code class="inline-code-block">Snippet</code>
      已經比 v4 的
      <code class="inline-code-block">&lt;slot/&gt;</code>
      還要彈性許多，可以在 SFC 裡面 reuse markup 以及取代掉
      <code class="inline-code-block">&lt;slot /&gt;</code>
       ，但終究是不及 React component 的抽象化程度，因為說到底React component 就是一個 function ，要傳進 props 、放在 object
      的 value 裡以及放在 array 裡都是可以被允許的。
    </p>
    <p>
      所以 React 倒也沒那麼不好，我依然認為如果今天要開發一個比較嚴謹或者該說上面會比較在意的專案， React
      可能會比較安全的選擇。
    </p>
    <p>
      但如果今天我是要開發一個簡單的網站、自己的 side project 我會選擇
      Svelte，總而言之本來就沒有一個框架能夠涵蓋所有人的喜好以及所有場景的需求，就選擇自己習慣、開發起來舒服的框架即可。
    </p>
    <blockquote>
      <p>當然所謂的「簡單」就因人而異了</p>
    </blockquote>
    <hr />
    <p>
      如果看到這裡的讀者對於 Svelte 又了那麼一點點興趣的話，可以參考我今年在鐵人賽所寫的文章
      <a href="https://ithelp.ithome.com.tw/users/20159893/ironman/7477" rel="external">
        https://ithelp.ithome.com.tw/users/20159893/ironman/7477
      </a>
    </p>
    <p>如果對於這篇文章有什麼想法或者任何回饋歡迎底下留言或者 twitter 私訊我。</p>
  </article>
</Post>
