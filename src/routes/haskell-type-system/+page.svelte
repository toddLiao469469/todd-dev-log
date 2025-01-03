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
    <h2 id="ji1-ben3-de-xing2-bie2"><a href="#ji1-ben3-de-xing2-bie2">基本的型別</a></h2>
    <p>
      Haskell 的是一個靜態語言，也就是說每個 expression 在編譯期間就已經被確定型別了，又因為 Haskell
      不支援自動轉型所以基本上我們能相信 Haskell 在大部分情況不太會有 runtime 的型別問題。
    </p>
    <p>
      首先來看看 Haskell 裡的各種型別，可以在 <code class="inline-code-block">ghci</code>
      裡使用
      <code class="inline-code-block">:t</code>
       來輸出 expression 的型別
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- in ghci</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t True -- True :: Bool</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t 'a'  -- 'a' :: Char</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t  "abc" -- "abc" :: String</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t ["2"] -- ["2"] :: [String]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t  True || False --  True || False :: Bool</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t  5 == 3  -- 5 == 3 :: Bool</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      這邊可以看出輸出都是 <code class="inline-code-block">expression::Type</code>
      的形式，然後在 Haskell 中所有明確的 Type 都是以大寫字母為開頭，像是
      <code class="inline-code-block">Bool</code>
      、
      <code class="inline-code-block">Char</code>
       等等。
    </p>
    <p>順便說明一下 Haskell 中其他常見的型別</p>
    <ol>
      <li>
        <strong><code class="inline-code-block">Int</code></strong>
        : 代表整數，範圍取決於運行系統。
      </li>
      <li>
        <strong><code class="inline-code-block">Integer</code></strong>
        : 代表任意大的整數，不受範圍限制，但效率比
        <code class="inline-code-block">Int</code>
         慢。
      </li>
      <li>
        <strong><code class="inline-code-block">Float</code></strong>
        : 代表單精度浮點數，用於表示近似的實數。
      </li>
      <li>
        <strong><code class="inline-code-block">Double</code></strong>
        : 代表雙精度浮點數，提供更高的精度。
      </li>
    </ol>
    <h2 id="xing2-bie2-tui1-duan4"><a href="#xing2-bie2-tui1-duan4">型別推斷</a></h2>
    <p>
      也許有人會想說 Haskell 明明是靜態語言那為什麼不需要在宣告變數時就指定型別呢？這是因為 Haskell 是支援型別推斷 (type
      inference) 的。意思是 Haskell 能從前後文得知這個 expression 的型別。
    </p>
    <p>拿一個 List comprehension 的範例稍微改一下，這會生成一個從某個字串濾出小寫字母的新字串</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">foo l  = [x| x&lt;- l , x &#96;elem&#96; ['a'..'z']]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t foo  </div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- foo :: [Char] -&gt; [Char]</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      這邊可以看出 Haskell 幫我們推斷出 <code class="inline-code-block">foo</code>
      的型別是
      <code class="inline-code-block">[Char] -&gt; [Char]</code>
      ，這又代表什麼意思呢？翻譯成中文是
      <code class="inline-code-block">foo</code>
      這個 expression 接受一個參數
      <code class="inline-code-block">[Char]</code>
      並最後回傳
      <code class="inline-code-block">[Char]</code>
       型別。
    </p>
    <p>
      至於是要從哪裡看出來哪個是參數型別哪個是回傳型別呢？基本上在 Haskell 的型別簽名中，多個 <strong>
        <code class="inline-code-block">-&gt;</code>
      </strong>
      符號分隔了不同的參數型別，而最後一個
      <strong><code class="inline-code-block">-&gt;</code></strong>
      符號之後的型別是該函數的回傳型別。因此，最後一個
      <strong><code class="inline-code-block">-&gt;</code></strong>
       符號右邊的型別表示函數的結果型別。
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">add' x y z = x+y+z</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t add'</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- add' :: Num a =&gt; a -&gt; a -&gt; a -&gt; a</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      這裡會發現 Haskell 幫我們推斷出
      <code class="inline-code-block">add’ :: Num a ⇒ a → a → a → a</code>
      ，會發現這裡一樣有四個
      <code class="inline-code-block">a</code>
       ，也就代表這個 function 有三個參數。
    </p>
    <blockquote>
      <p>
        更精確點說是因為所有 function 都是 curried ，所以 <code class="inline-code-block">Num a ⇒ a → a → a → a</code>
        實際上是代表，
        <code class="inline-code-block">add’ x</code>
        的 type 會是
        <code class="inline-code-block">Num a ⇒ a → a → a</code>
        、
        <code class="inline-code-block">add’ x y</code>
        則是
        <code class="inline-code-block">Num a ⇒ a → a</code>
      </p>
    </blockquote>
    <h3 id="type-variables"><a href="#type-variables">Type variables</a></h3>
    <p>
      或許有人會感到好奇 <code class="inline-code-block">Num a ⇒ a → a → a → a</code>
      的
      <code class="inline-code-block">a</code>
       是什麼意思，這個就是所謂的 type variables。
    </p>
    <p>
      在沒有約束的情況下 <code class="inline-code-block">a</code>
      可以是任意型別，像是
      <code class="inline-code-block">head</code>
       這個 function，它就只是拿出 List 中的第一個元素，理論上他不需要管這個 List 是什麼型別。
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t head</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- head :: GHC.Stack.Types.HasCallStack =&gt; [a] -&gt; a</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <blockquote>
      <p>GHC.Stack.Types.HasCallStack 是 ghci 裡追蹤程式碼所用的，總之這裡可以忽略這個東西</p>
    </blockquote>
    <p>
      會看到 <code class="inline-code-block">[a] -&gt; a</code>
      其中不像
      <code class="inline-code-block">add’ :: Num a ⇒ a → a → a → a</code>
      一樣是
      <code class="inline-code-block">a</code>
       前面沒有任何看起來像是型別的東西。
    </p>
    <p>
      這時候就是代表這個 <code class="inline-code-block">a</code>
       可以任意的型別。
    </p>
    <h1 id="yi1-dian3-dian3-typeclass"><a href="#yi1-dian3-dian3-typeclass">一點點 Typeclass</a></h1>
    <p>
      那 <code class="inline-code-block">add’ :: Num a ⇒ a → a → a → a</code>
      的
      <code class="inline-code-block">Num a =&gt;</code>
      到底是什麼？簡單來說它就是一個型別約束的語法，意思是
      <code class="inline-code-block">a</code>
      必須屬於
      <code class="inline-code-block">Num</code>
      typeclass，像是前面所介紹的
      <code class="inline-code-block">Int</code>
      、
      <code class="inline-code-block">Integer</code>
      、
      <code class="inline-code-block">Float</code>
      等等就是屬於
      <code class="inline-code-block">Num</code>
       。
    </p>
    <p>
      那 typeclass 又是什麼呢？我自己認為它比較像是 type 的 interface，它提供了一個定義一群類別所需具備的行為跟特性。
    </p>
    <p>
      常見的 typeclass 像是 <code class="inline-code-block">Eq</code>
      、
      <code class="inline-code-block">Ord</code>
      、
      <code class="inline-code-block">Show</code>
      、
      <code class="inline-code-block">Num</code>
    </p>
    <ol>
      <li>
        <p>
          <code class="inline-code-block">Eq</code>
          主要就是提供了判斷是否相等的介面，所以如果一個型別可以被比較那它勢必屬於
          <code class="inline-code-block">Eq</code>
           typeclass
        </p>
        <div class="code-block">
          <CodeCopy>
            <pre><code
                class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t (==)</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- (==) :: Eq a =&gt; a -&gt; a -&gt; Bool</div></div>`}</code></pre>
          </CodeCopy>
        </div>
        <blockquote>
          <p>
            <code class="inline-code-block">&lpar;==&rpar;</code>
            是因為通常這種運算子都是 infix ，所以為了可以使用 :t 這邊需要使用
            <code class="inline-code-block">&lpar;&rpar;</code>
             包住他
          </p>
        </blockquote>
        <p>
          <code class="inline-code-block">Eq a =&gt; a -&gt; a -&gt; Bool</code>
          就表示了我必須傳入兩個屬於
          <code class="inline-code-block">Eq</code>
          typeclass 的值才能使用且最後會回傳
          <code class="inline-code-block">Bool</code>
          ，至於怎麼哪些 type 才是屬於
          <code class="inline-code-block">Eq</code>
          可以在 ghci 使用
          <code class="inline-code-block">:i Eq</code>
           查詢
        </p>
        <div class="code-block">
          <CodeCopy>
            <pre><code
                class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:i Eq</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">instance Eq Bool -- Defined in ‘GHC.Classes’</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">instance Eq Char -- Defined in ‘GHC.Classes’</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">instance Eq Double -- Defined in ‘GHC.Classes’</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">instance Eq Float -- Defined in ‘GHC.Classes’</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">instance Eq Int -- Defined in ‘GHC.Classes’</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">instance Eq Ordering -- Defined in ‘GHC.Classes’</div></div>`}</code></pre>
          </CodeCopy>
        </div>
      </li>
      <li>
        <p>
          <code class="inline-code-block">Ord</code>
           提供了比較大小的介面
        </p>
        <div class="code-block">
          <CodeCopy>
            <pre><code
                class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t (&gt;)</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- (&gt;) :: Ord a =&gt; a -&gt; a -&gt; Bool</div></div>`}</code></pre>
          </CodeCopy>
        </div>
        <p>
          <code class="inline-code-block">Ord a =&gt; a → a → Bool</code>
          說明了
          <code class="inline-code-block">&lpar;&gt;&rpar;</code>
          的型別是傳入兩個必須屬於
          <code class="inline-code-block">Ord</code>
          typeclass 的參數且最後會回傳
          <code class="inline-code-block">Bool</code>
        </p>
      </li>
      <li>
        <p>
          <code class="inline-code-block">Show</code>
           就是可變為字串表示的 type class，基本上應該是除了函數以外都是屬於這個type class。
        </p>
        <div class="code-block">
          <CodeCopy>
            <pre><code
                class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t show</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- show :: Show a =&gt; a -&gt; String</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t show 1.2</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- show 1.2 :: String</div></div>`}</code></pre>
          </CodeCopy>
        </div>
      </li>
      <li>
        <p>
          <code class="inline-code-block">Num</code>
           也就是數字的type class，
        </p>
        <div class="code-block">
          <CodeCopy>
            <pre><code
                class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t 1</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- 1 :: Num a =&gt; a</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">:t (*)</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">-- (*) :: Num a =&gt; a -&gt; a -&gt; a</div></div>`}</code></pre>
          </CodeCopy>
        </div>
        <p>
          這裡會發現 <code class="inline-code-block">*</code>
          也是約束了
          <code class="inline-code-block">a</code>
          的型別一定得是屬於
          <code class="inline-code-block">Num</code>
           才行。
        </p>
      </li>
    </ol>
    <p>
      那如果今天我想要讓兩個同時屬於 <code class="inline-code-block">Num</code>
       typeclass 但又不是同一個型別的參數相乘呢？
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-haskell">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">(5 :: Int) * (6 :: Integer)</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">&lt;interactive&gt;:99:15: error:</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    • Couldn't match expected type ‘Int’ with actual type ‘Integer’</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    • In the second argument of ‘(*)’, namely ‘(6 :: Integer)’</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      In the expression: (5 :: Int) * (6 :: Integer)</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      In an equation for ‘it’: it = (5 :: Int) * (6 :: Integer)</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      這個編譯器錯誤告訴了我們因為 <code class="inline-code-block">Int</code>
      和
      <code class="inline-code-block">Integer</code>
      是不同的型別所以發生錯誤，這邊雖然
      <code class="inline-code-block">Int</code>
      及
      <code class="inline-code-block">Integer</code>
      都是同屬於
      <code class="inline-code-block">Num</code>
      的
      <code class="inline-code-block">instance</code>
       ，但實際上還是不同的型別所以這邊才無法進行運算。
    </p>
    <p>
      可以想成這件事情相當等於從 <code class="inline-code-block">Int -&gt; Interger -&gt; ????</code>
      推導出這裡的
      <code class="inline-code-block">????</code>
      是什麼，但不管是
      <code class="inline-code-block">????</code>
      是
      <code class="inline-code-block">Int</code>
      還是
      <code class="inline-code-block">Interger</code>
      都無法符合
      <code class="inline-code-block">a -&gt; a -&gt; a</code>
       ，由此可見 Haskell 的型別系統到底有多嚴格了。
    </p>
  </article>
</Post>
