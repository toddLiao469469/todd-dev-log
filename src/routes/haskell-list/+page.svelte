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
    <h2 id="ji1-ben3-cao1-zuo4"><a href="#ji1-ben3-cao1-zuo4">基本操作</a></h2>
    <p>在 Haskell 中 List 的宣告方式為</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">x = [1,2,3,4,5,6,7]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>在 Haskell 中 List 中每個元素只能是同樣型別</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- ⭕️</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[1,2,3,4,5,6]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">['a','b','c']</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- ❌</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[1,2,'c',4,'a',6]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[1,'b','c']</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      有一個比較重要的概念是
      <strong>
        在 Haskell 中 <code class="inline-code-block">String</code>
        與
        <code class="inline-code-block">[Char]</code>
         是相等的
      </strong>
      ，也就是說
      <code class="inline-code-block">&quot;abc&quot;</code>
      以及
      <code class="inline-code-block">[&#39;a&#39;,&#39;b&#39;,&#39;c&#39;]</code>
       是一樣的東西
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">['a','b','c'] == "abc" -- True</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <h3 id="chang2-yong4-yun4-suan4-zi3"><a href="#chang2-yong4-yun4-suan4-zi3">常用運算子</a></h3>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[1,2,3,4] ++ [5,6] -- [1,2,3,4,5,6]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">['a','b'] ++ ['c']  -- "abc"</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">"ab" ++ "c" -- "abc"</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      在使用 <code class="inline-code-block">++</code>
       要特別注意的是他是會將左邊運算元遍歷過一次，所以如果左邊是一個很長的 List 的話必須小心使用。
    </p>
    <p>
      而在 List 前面塞入一個元素可以使用 <code class="inline-code-block">:</code>
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">'a' : "bc" -- "abc"</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">1 : [2,3,4] -- [1,2,3,4]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      特別注意一下這裡是 <code class="inline-code-block">&#39;a&#39;</code>
      而不是
      <code class="inline-code-block">&quot;a&quot;</code>
      差異為一個是
      <code class="inline-code-block">Char</code>
      與
      <code class="inline-code-block">[Char]</code>
      (
      <code class="inline-code-block">String</code>
      )
    </p>
    <p>
      我們也可以一直使用 <code class="inline-code-block">:</code>
       來組成一個 List
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">'f' : 'o' : 'o' : [] -- "foo"</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">0 : 1 : 2 : [] -- [0,1,2]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      其實 Haskell 在建立 List 時就是不斷遞迴用 <code class="inline-code-block">:</code>
      把左邊運算子不斷的塞入來建立出 List 的，所以
      <code class="inline-code-block">[0,1,2]</code>
      實際上就是
      <code class="inline-code-block">0 : 1 : 2 : []</code>
       的語法糖。
    </p>
    <p>
      如果我們要存取特定的元素的話我們能用 <code class="inline-code-block">!!</code>
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[1,2,3,4,5,6] !! 0 -- 1</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">"abc" !! 0 -- 'a'</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">"abc" !! 1 -- 'b'</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <h3 id="chang2-yong4-function"><a href="#chang2-yong4-function">常用 function</a></h3>
    <p>Haskell 有提供四個比較基礎的 function 來讓我們取得 List 的頭尾</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">x = [1,2,3,4,5,6]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">head x -- 1</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">tail x -- [2,3,4,5,6]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">last x -- 6</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">init x -- [1,2,3,4,5]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      <code class="inline-code-block">head</code>
       會回傳 List 中第一個元素
    </p>
    <p>
      <code class="inline-code-block">tail</code>
       會回傳扣除第一個元素後的List
    </p>
    <p>
      <code class="inline-code-block">last</code>
       會回傳 List 的最後一個元素
    </p>
    <p>
      <code class="inline-code-block">init</code>
       會回傳扣除最後一個元素後的List
    </p>
    <p>有這些我們就能夠來寫出一個簡單小 function 來操作 List</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">listSum :: [Int] -&gt; Int</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">listSum x = if null x then 0 else head x + listSum (tail x) </div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">main :: IO ()</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">main = do</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  let x = [1,2,3,4,5,6,7,8,9,10]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  putStrLn (show(listSum x))</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      這裡我們使用了 <code class="inline-code-block">head</code>
      及
      <code class="inline-code-block">tail</code>
      協助我們加總 List 中的所有元素，
      <code class="inline-code-block">listSum</code>
      解釋起來就是當
      <code class="inline-code-block">x</code>
      不為 null 時就會將
      <code class="inline-code-block">x</code>
      的第一個元素與
      <code class="inline-code-block">listSum &lpar;tail x&rpar;</code>
       相加。
    </p>
    <p>沒錯就是使用 recursive ，因為在 Haskell 中所有 variable 都是 immutable 的所以我們寫不出像 js 這樣的程式碼</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-javascript">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">// in js</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">a = 0</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">list = [1,2,3,4,5,6,7,8,9,10]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">list.forEach(x =&gt;{ a += x})</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>當然 Haskell 還是有提供一些基本的 List 操作</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">length [1,2,3,4,5] -- 5 </div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">reverse [1,2,3,4,5] -- [5,4,3,2,1]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">take 2 [1,2,3,4,5] -- [1,2]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">maximum [1,2,3,4,5] -- 5</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">minimum [1,2,3,4,5] -- 1</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">product [1,2,3,4,5] -- 120</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">sum [1,2,3,4,5] -- 15</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">elem 4 [1,2,3,4,5] -- True</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      <code class="inline-code-block">length</code>
       會回傳 List 長度
    </p>
    <p>
      <code class="inline-code-block">take</code>
       會根據根據傳入的長度及List 回傳一個新的 List
    </p>
    <p>
      <code class="inline-code-block">reverse</code>
       會回傳一個反轉的 List
    </p>
    <p>
      <code class="inline-code-block">maximum</code>
       回傳 List 中最大的數
    </p>
    <p>
      <code class="inline-code-block">minimum</code>
       回傳 List 中最小的數
    </p>
    <p>
      <code class="inline-code-block">sum</code>
       List所有元素的加總
    </p>
    <p>
      <code class="inline-code-block">product</code>
       List所有元素的乘積
    </p>
    <p>
      <code class="inline-code-block">elem</code>
       判斷該元素是否屬於該List
    </p>
    <h2 id="shao1-wei1-jin4-jie1-yi1-xia4"><a href="#shao1-wei1-jin4-jie1-yi1-xia4">稍微進階一下</a></h2>
    <p>當然我們要建立一個 List 不一定每次都要直接寫出所有的元素</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">x = [1,2,3,4]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      我們可使用 <code class="inline-code-block">..</code>
       來幫我快速建立一個 List
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[1..10] -- [1,2,3,4,5,6,7,8,9,10]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">['a'..'z']  -- "abcdefghijklmnopqrstuvwxyz"</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      這種方式稱為 <strong>range</strong>
       ，而能夠使用 range 來建立 List 那個值本身必須是可以被枚舉的，像是A到Z，1到10。
    </p>
    <p>那我們也能限制 range 所產生的元素之間的距離，只要多放一個元素且標註上限就好</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[2,4..20] -- [2,4,6,8,10,12,14,16,18,20]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[5,10..49] -- [5,10,15,20,25,30,35,40,45]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      那如果我們不限制 range 上限呢？那我們就可以產生出一個
      <strong>無限</strong>
      的 List 。
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[1..] -- 這會產生一個無限 List 如果要在 ghci 停止請使用 command+c 來停止</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      所以假設我們今天想產生前 10 個 3 的倍數，我們除了直接標註上限是 <code class="inline-code-block">3*10</code>
      以外，我們也可以利用
      <code class="inline-code-block">take</code>
       加上無限 List 來幫助我們達成這個需求
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[3,6..3*10]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">take 3 [3,6..] </div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">--[3,6,9,12,15,18,21,24,27,30]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      除了使用 range 我們也可以用 <code class="inline-code-block">cycle</code>
      以及
      <code class="inline-code-block">repeat</code>
       來產生無限 List
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">take 5 (cycle "abc") -- "abcab"</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">take 5 (repeat 'a') -- "aaaaa"</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- 上面的 repeat 的寫法可以使用 replicate 簡化</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">replicate 5 'a' -- "aaaaa"</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <h2 id="list-comprehension"><a href="#list-comprehension">List Comprehension</a></h2>
    <p>
      所謂的 List comprehension 就是我們可以用一些符號來描述一個
      List，類似在數學上的我們想要說明一個集合是偶數的話我們會說
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code>{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">{ x | x=2k , k∈N }</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>那如果我們要在 Haskell 描述一個偶數 List</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[ x*2 | x &lt;- [1..]]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      可以看出來我們一樣只要說明元素的如何產生以及範圍就好，這裡說明了每個元素都是 <code class="inline-code-block">
        x*2
      </code>
      且
      <code class="inline-code-block">x</code>
      的範圍是從1開始的無限 List
    </p>
    <p>所以如果我們想要產生前 10 個 3 的倍數的話</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[x*3 | x &lt;- [1..10]]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- [3,6,9,12,15,18,21,24,27,30]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <h3 id="xian4-zhi4-tiao2-jian4"><a href="#xian4-zhi4-tiao2-jian4">限制條件</a></h3>
    <p>當然 List comprehension 不只如此，假設我們今天條件更刁鑽了，例如：我想要前10個3的倍數但又不行是偶數呢？</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[x*3 | x &lt;- [1..10], x &#96;mod&#96; 2 /=0 ]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- [3,9,15,21,27]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      我們只要在後面加上限制條件，
      <code class="inline-code-block">x</code>
      mod
      <code class="inline-code-block">2 /= 0</code>
       就好了
    </p>
    <blockquote>
      <p>
        <code class="inline-code-block">/=</code>
        就是不等於，
        <code class="inline-code-block">`mod`</code>
        的
        <code class="inline-code-block">``</code>
        是把 function 變成 infix 的用法
      </p>
    </blockquote>
    <p>
      那假設我想要把一個 List 大於 10 的數字 <code class="inline-code-block">+1</code>
      小於10的
      <code class="inline-code-block">*2</code>
       且為 3 的倍數要丟掉呢？
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">foo  l = [if x&gt;10 then x+1 else x*2 | x &lt;- l , x &#96;mod&#96; 3 /= 0]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">foo [1..20]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- [2,4,8,10,14,16,20,12,14,15,17,18,20,21]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      除此之外 List comprehension 也支援多個變數跟多個條件，像是生成一個 List 它是由
      <code class="inline-code-block">x</code>
      及
      <code class="inline-code-block">y</code>
      的乘積，但
      <code class="inline-code-block">x</code>
      的範圍為1到5，
      <code class="inline-code-block">y</code>
      的範圍為6到10，且
      <code class="inline-code-block">x+y</code>
       還不能是5的倍數
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[x*y | x&lt;-[1..5],y&lt;-[6..10], (x+y) &#96;mod&#96; 5 /= 0]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <h3 id="zi4-chuan4-chu3-li3"><a href="#zi4-chuan4-chu3-li3">字串處理</a></h3>
    <p>還記得字串也是一種 List 嗎？ 所以 List Comprehension 理所當然的能夠用來生成字串或者處理字串。</p>
    <p>像是我想要將一個 List 全部轉為小寫或者濾出這個 List 的小寫字母</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[toLower x| x &lt;- "asdqwAsdcqAsdasd" ]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[x| x &lt;- "asdqwAsdcqAsdasd" , x &#96;elem&#96; ['a'..'z']]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>或者找出合法的 email</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">emailList = ["toddliao.dev@gmail.com","toddliao.dev","todd"]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">[email | email &lt;- emailList, '@' &#96;elem&#96; email &amp;&amp; '.' &#96;elem&#96;  email ] </div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">--  ["toddliao.dev@gmail.com"]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      這邊的限制條件就是說 <code class="inline-code-block">@</code>
      及
      <code class="inline-code-block">.</code>
      都要存在於
      <code class="inline-code-block">email</code>
       裡面。
    </p>
    <blockquote>
      <p>就只是簡單的驗證，當然光是這些條件不足以說明屬於email的格式</p>
    </blockquote>
  </article>
</Post>
