---
title: React Hook Form 踩坑紀錄-我沒使用過 forwardRef 欸
summary: ''
published: '2021-11-11T00:00:00.000+08:00'
cover: ./cover.webp
coverStyle: 'TOP'
coverCaption: Photo by <a href="https://www.pexels.com/zh-tw/@cottonbro?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">cottonbro</a> on <a href="https://www.pexels.com/zh-tw/photo/4709286/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">Pexels</a>
tags:
  - ['react','FE','react hook form']

---

這陣子陸續把現有的專案從 Ant Design 的Form （以下簡稱ADF）改為使用 React Hook Form （以下簡稱RHF）原因有：

先打個預防針「有些原因不是缺點，只是剛好不太符合現有專案需求」

ADF客製樣式會很麻煩，本身有太多內建的樣式。
ADF在綁定複雜的客製元件時較為麻煩。
RHF的type系統比ADF好很多。
詳細說明及遷移過程可能會再寫一篇文章，這篇文章主要是要記錄最近在實作RHF上遇到坑。

### 從useForm reset發現的坑

RHF的 reset 主要有兩種功用一個是回到預設值，一個是將 Form 重設為特定的值。

第一個功能比較不用說明，第二個通常是會用在當「這個 Form 的預設值是 asynchronous」，所以我們無法在Form初始化時將我們希望的預設值丟進去，就會是在useEffect裡將await到的值放入 reset 。

這次遇到的問題遇到某些component在正常的操作下都沒問題，像是基本的輸入、取值等等。但如果遇到reset就是無法正常地觸發re-render。

### 綁定元件

先稍微介紹一下RHF，通常是會使用 useForm 去建立Form的instance，也可以利用這個hook去設定預設值或者其他操作。而useForm有回傳兩個將元件與Form綁定的方式：register 以及control

基本上我們的 input 元件都會使用register 進行綁定。

```jsx
<input {...register('name')} />
```

而 `control` 就較為麻煩
```jsx
<Controller 
  name='name'
  control={control}
  render={({field})=> <input {...field} /> }
/>
```

基本上就是利用 render props 讓這個元件可以被 `Form` 操控。在RHF的文件裡有說到有些第三方的 controlled component需要使用 `Controller` 來進行包裝才能被使用。

### 回到這次的問題

我們使用了 chakra-ui 來當作我們的元件庫，一直以來使用都沒什麼問題
直到我們做了以下事情：
```jsx
const CustomizedInput = (props: InputProps) => {
return 
 <Input 
  marginBottom='0px' 
  backgroundColor={White} 
  border={`1px solid ${Gray500}`} 
  borderRadius='8px' 
  {...props}
 />
}
```

基本上就是我們將常用的樣式包裝成一個共用input，而在這個例子中的props就會將我們的register相關的行為注入進去。

一個簡單還原的Demo:

<iframe src="https://codesandbox.io/embed/react-hook-form-demo-p5hd5?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-hook-form-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


有四種input：

1. 使用 `register` 去綁定 `Input`
2. 使用 `register` 去綁定使用 `React.forwardRef` 的`CustomInput`
3. 使用 `control` 去綁定`CustomInput`
4. 使用 `register` 去綁定不經過 `React.forwardRef` 的`CustomInput`

會發現只有 4. 沒有被reset到初始值，所以我們可以合理懷疑這個問題應該跟`CustomInput`這種包裝方式有很大關聯。

但為什麼？其實console已經給了答案了

`Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()`

第一個疑問是為什麼會有`ref`？這邊就要回去看RHF的source ，這邊會看到register有回傳`ref`，簡單來看就是`register`時就會順便註冊這個`ref`到input。

所以在我們的例子中就將`ref`傳給了CustomInput，但因為Functional component本身是沒有`ref`的，導致這個傳入的ref並沒有作用。

### forwardRef

那我們就來看看為什麼使用了 `forwardRef` 的 `CustomInput` 可以達成我們的需求。

官方文件：傳送 Ref — React

首先我們要先知道 `ref` 是一個保留字詞，所以是不能被當作props的命名。這也是會發生這個問題的其中一個原因，所以ref被傳下來後沒被綁定在 `CustomInput` 上也無法在`{...props}` 中 並無法取出 `ref` 的。

其實有透過其他命名，像是將這個prop命名改為`customRef`之類的，然後藉此規避掉關鍵字問題，但這種方式跟 `forwardRef` 的比較並不在本篇文的討論範圍。

那我們就來看一下 `forwardRef` 如何使用。

```jsx
forwardRef(
 (props,ref)=> <Input {...props} ref={ref} /> 
)
```
在創建component時，我們透過wrap一層 `forwardRef` 讓 `ref` 可以被取出並傳遞到下層。

從我們能看到的簡單流程就是這樣：

我們在呼叫`register`時會將 `ref` 傳入到 `CustomInput`
React 會將 `ref` 當作 `forwardRef` 裡的function中的第二個變數
我們藉由把這個 `ref` 當作 JSX attribute 來傳遞到更下面的 `<Input ref={ref}>`
而也許會有人想問為什麼chakra的 `Input` 可以接收 `ref` ，它應該不是原生的html tag啊？而答案當然就是「他也用了`forwardRef`」
source code

到這其實這個坑也算解的差不多了。

那至於為什麼 `Controller` 為什麼可以解決這個問題呢？簡單的解釋是：`Controller` 在render props裡用了另外一個custom hook ：`useController` 內部有自己的context，所以就算 `ref` 沒有被傳遞到最下面的component也是能夠更改及讀取到狀態，那這樣的行為到底這算不算Bug我就沒深入研究了。

### 結語

但也因為這個坑我發現另外一件事，還記得我最一開始說這是因爲 `reset` 而發現的嗎？

我在codesandbox實作這個demo時發現，為什麼一般onChange也會失效了？後來才知道這是RHF的版本問題，codesandbox裡使用是最新版(寫文當下是：7.19.2)，而公司內的專案使用的是7.12.2，而7.12.2裡就算我不用forwardRef 狀態也是能正常被讀取跟更改。

但我也沒有深入比對這兩個版本中到底差了哪些東西就是了，總之這意外的讓我先往 `reset` 這個api實作去找問題。而發現到 `reset` 中是有操作到 `ref` 之後才再去看 `register` 的實作來找到這個問題。

其中一個原因也是我很少在操作 `ref` ，以至於在遇到這個坑之前我不知道`ref`是不能直接被使用`ref`這個名字在進行傳遞的，而且剛好之前在使用`ref`時都剛好有額外的命名而規避掉這個坑。直到 `register` 自動傳入`ref` 才讓我發現這件事情。

### 懶人包

1. RHF會自動的傳入 `ref`
2. 在包裝第三方套件時請注意到`ref` 的傳遞情況
3. `ref`不能被直接傳遞，如果要傳遞`ref`到下層component要就是用其他名字又或者使用 `forwardRef`
