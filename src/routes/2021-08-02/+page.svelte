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
    <h3 id="qian2-yan2"><a href="#qian2-yan2">前言</a></h3>
    <p>
      我很常在Flutter的各類「狀態管理」套件的相關文章看到 「依賴注入」
      等相關字眼，而這又跟上一篇文章中提到「依賴注入」有什麼不同？。
    </p>
    <p>
      如果從前一篇文章的脈絡下來，我們會想使用 DI 的原因最主要為了讓兩個類別解耦，然後我們利用 DI 實作 IoC
      來降低耦合度。
    </p>
    <p>這篇文會提到的：</p>
    <ul>
      <li>Flutter 的狀態管理所面臨的問題</li>
      <li>在 Flutter 的依賴注入想解決的問題</li>
    </ul>
    <p>本文所使用的程式碼沒有特別標注即是 Dart 2.13（null safety）</p>
    <h3 id="zhuang4-tai4-guan3-li3"><a href="#zhuang4-tai4-guan3-li3">狀態管理</a></h3>
    <p>
      所謂「狀態管理」通常都會討論到「跨組件狀態共享」這個重要的議題。我們先來看看如果在最原生的狀況進行跨組件的狀態共享該如何做，通常都會將一個
      <code class="inline-code-block">setState</code>
       包裝在 handler 裡後將 state 及handler 向下傳遞
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-dart">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">///showLineNumber</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">class Parent extends StatefulWidget {</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  Parent({Key? key}) : super(key: key);</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  @override</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  _ParentState createState() =&gt; _ParentState();</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">}</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">class _ParentState extends State&lt;Parent&gt; {</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  bool _active = false;</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  void _handler(bool newValue) {</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    setState(() {</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      _active = newValue;</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    });</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  }</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  @override</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  Widget build(BuildContext context) {</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    return Container(</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      child: Column(</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        children: [</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">          Child1(</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">            active: _active,</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">            handler: _handler,</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">          ),</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">          Child2(</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">            active: _active,</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">            handler: _handler,</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">          ),</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        ]</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      ),</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    );</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  }</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">}</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">class Child1 extends StatelessWidget {</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  const Children({Key? key}) : super(key: key);</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  @override</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  Widget build(BuildContext context) {</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    return Container(</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      child: null,</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    );</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  }</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">}</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">class Child2 extends StatelessWidget {</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  const Children({Key? key}) : super(key: key);</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  @override</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  Widget build(BuildContext context) {</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    return Container(</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      child: null,</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    );</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  }</div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">}</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      這樣就能讓 <code class="inline-code-block">Child1</code>
      及
      <code class="inline-code-block">Child2</code>
      這兩個 Widget 共享
      <code class="inline-code-block">_active</code>
      這個狀態，但相信大家在實際專案中並不會單純使用
      <code class="inline-code-block">setState</code>
      在管理狀態，畢竟當狀態及Widget 一多會變得十分麻煩，而且如果某個狀態不只需要傳一層 Widget 時你必須在期間每層的
      Widget 的參數都放入這個狀態，這將會讓我們更難管理狀態。
    </p>
    <h3 id="yi1-lai4-zhu4-ru4"><a href="#yi1-lai4-zhu4-ru4">依賴注入</a></h3>
    <p>
      那所以這跟「依賴注入」有什麼關係 ？在 Flutter 裡我們 Widget 結構通常都是非常巢狀的，意味著如果我們 Widget
      拆得愈細，我們就要在愈多Widget 的參數寫入要傳遞的狀態。那有沒有可能不管隔了多少層 Widget ，而且也不想要中間的
      Widget constructor 都要傳入狀態，我只想要在我需要用的時候再將狀態取出來就好？
    </p>
    <p>只在需要「依賴」的時候才「注入」到 Widget 裡</p>
    <p>
      而這也是大多數 Flutter 文章裡提到「依賴注入」最主要想解決的問題：「從深層widget 取出上層的依賴」，以 provider
      這個套件舉例，它取出依賴的方法大概長這樣：
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-dart">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">int data = Provider.of&lt;int&gt;(context);</div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      而在其他套件的實作中多半會有一個 <code class="inline-code-block">of&lpar;&rpar;</code>
      或者類似的方法來取得上層的依賴，至於
      <code class="inline-code-block">of&lpar;&rpar;</code>
      裡是不是
      <code class="inline-code-block">BuildContext</code>
      ，就是看各library的實作了。至於是不是依賴於
      <code class="inline-code-block">BuildContext</code>
      有什麼差，就要牽扯到
      <code class="inline-code-block">BuildContext</code>
       這個坑了以後有機會再來填。
    </p>
    <h3 id="jie2-lun4"><a href="#jie2-lun4">結論</a></h3>
    <p>
      其實跟我們上篇文章在講得這麼久的DI、IoC、DIP沒有太大關係，甚至有時會在reddit上看到有人在爭吵有些被稱為「依賴注入」的套件不是
      DI 而是另一種pattern 「service locator 」，至於「service locator」是什麼或者如何實現我就沒有特別研究了。
    </p>
  </article>
</Post>
